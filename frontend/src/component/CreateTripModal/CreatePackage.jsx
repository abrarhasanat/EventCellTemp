import './CreatePackage.scss';
import React, { useState, useContext,useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { url, port } from "../../Constant";
import SuccesModal from "../../shared/components/UIElements/SuccessModal";
import trip_list from "../../Constant"
const CreatePackage = ({ close, modalFunctions }) => {
    const history = useHistory();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [item, setItem] = useState(trip_list);
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            tour_name: {
                value: "",
                isValid: false,
            },
            start_date: {
                value: "",
                isValid: false,
            },
            end_date: {
                value: "",
                isValid: false,
            },
            overview: {
                value: "",
                isValid: true,
            },
        },
        false
    );

    const SubmitHandler = async (event) => {
        event.preventDefault();
        try {
            console.log(formState.inputs.tour_name.value);
            let tourInfo = JSON.stringify({
                tour_name: formState.inputs.tour_name.value,
                start_date: formState.inputs.start_date.value,
                end_date: formState.inputs.end_date.value,
                overview: formState.inputs.overview.value,
            });
            console.log(tourInfo);
           
            trip_list.push(tourInfo); 
            console.log(trip_list);

            // const responseData = await sendRequest(
            //     `http://${url}:${port}/api/vendor/create_package`,
            //     "POST",
            //     JSON.stringify({
            //         tour_name: formState.inputs.tour_name.value,
            //         start_date: formState.inputs.start_date.value,
            //         end_date: formState.inputs.end_date.value,
            //         overview: formState.inputs.overview.value,
            //     }),
            //     {
            //         "Content-Type": "application/json",
            //     }
            // );
            
            setIsSubmitted(true);
        } catch (err) { }
    };

    const clear_error = async (event) => {
        event.preventDefault();
        setIsSubmitted(false);
        history.push("/edit_trips");
    };
  

    return (
        <React.Fragment>
            {isSubmitted && (
                <SuccesModal info={"Package Added Successfully"} onClear={clear_error} />
            )}
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <Card className = "name-input-wrapper">
            <form className="create-trip-form" onSubmit={SubmitHandler}>
                <h1>Plan a new trip</h1>
               
                    <Input
                        element="input"
                        id="tour_name"
                        type="text"
                        label="Tour Name"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        errorText="Please enter a valid Tour Name."
                        onInput={inputHandler}
                    />
               



                
                        <Input
                            element="input"
                            id="start_date"
                            type="date"
                            label="Start Date"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText="Please enter a valid date."
                            onInput={inputHandler}
                        />
                    
                    
                        <Input
                            element="input"
                            id="end_date"
                            type="date"
                            label="End Date"
                            validators={[VALIDATOR_MINLENGTH(1)]}
                            errorText="Please enter a valid date."
                            onInput={inputHandler}
                        />
              
               
                    <Input
                        element="input"
                        id="overview"
                        type="text"
                        label="OverView"
                        validators={[VALIDATOR_MINLENGTH(0)]}
                        errorText=""
                        onInput={inputHandler}
                    />
                

                <button type="submit"
                    className="create-trip-button"
                >
                    <img className="map-icon" src={require('../../assets/mapicon.png')}></img>
                    <span className="create-trip-text">Create New Trip</span>
                </button>

                </form>
            </Card>
        
                
        
        </React.Fragment>

    )
}

export default CreatePackage


//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const dispatch = useDispatch();
//   //   const newTrip = useSelector((state) => state.trips.new);
//   const errors = useSelector((state) => state.errors.trips);
//   const currentUser = useSelector((state) => state.session.user);

//   useEffect(() => {
//     return () => dispatch(clearTripErrors());
//   }, [dispatch]);

//   const update = (field) => {
//     let setState;

//     switch (field) {
//       case "name":
//         setState = setName;
//         break;
//       case "description":
//         setState = setDescription;
//         break;
//       case "startDate":
//         setState = setStartDate;
//         break;
//       case "endDate":
//         setState = setEndDate;
//         break;
//       default:
//         throw Error("Unknown field in Create Trip Form");
//     }
//     return (e) => setState(e.currentTarget.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const trip = {
//       name,
//       description,
//       startDate,
//       endDate,
//     };

//     dispatch(createTrip({ trip }));
//   };
//   return (
//     <>
//       <form className="NewTripForm" onSubmit={handleSubmit}>
//         <label>
//           New Trip Name
//           <input
//             type="text"
//             onChange={update("name")}
//             value={name}
//             placeholder="New Trip Name"
//           ></input>
//         </label>

//         <label>
//           Description
//           <input
//             type="textarea"
//             onChange={update("description")}
//             value={description}
//             placeholder="Describe your Trip!"
//           ></input>
//         </label>

//         <label>
//           Start Date:
//           <input
//             type="date"
//             onChange={update("startDate")}
//             value={startDate}
//           ></input>
//         </label>

//         <label>
//           End Date:
//           <input
//             type="date"
//             onChange={update("endDate")}
//             value={endDate}
//           ></input>
//         </label>
//         <div className="errors">{errors && errors.name}</div>
//         <input
//           type="submit"
//           value="Create New Trip"
//           disabled={!name || !startDate || !endDate}
//         />
//       </form>
//     </>
//   );
// }

