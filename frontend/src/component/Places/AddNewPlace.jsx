import '../CreateTripModal/CreatePackage.scss';
import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
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
import { url, port, userTrips, locations } from "../../Constant";
import SuccesModal from "../../shared/components/UIElements/SuccessModal";
const AddNewPlace = ({ close, modalFunctions }) => {
    const history = useHistory();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [item, setItem] = useState(userTrips);
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const { packageId, day } = useParams();
    console.log(packageId, day);
    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            url: {
                value: "",
                isValid: false,
            },
            cost: {
                value: "",
                isValid: true,
            },
            overview: {
                value: "",
                isValid: true,
            },
        },
        false
    );

    const SubmitHandler = async (event) => {
        console.log("input Submitted");
        event.preventDefault();

        console.log(formState.inputs.name.value);
        let tourInfo = {
            name: formState.inputs.name.value,
            url: formState.inputs.url.value,
            cost: formState.inputs.cost.value,
            overview: formState.inputs.overview.value,

        };
        tourInfo.day = day;
        tourInfo.id = packageId;
        console.log("new tour place created");

        console.log(tourInfo);

        locations.push(tourInfo);

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

    };

    const clear_error = async (event) => {
        await new Promise(r => setTimeout(r, 2000));
        event.preventDefault();
        setIsSubmitted(false);
        history.push("/packages");
    };


    return (
        <React.Fragment>
            {isSubmitted && (
                <SuccesModal info={"Package Added Successfully"} onClear={clear_error} />
            )}
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <Card className="name-input-wrapper">
                <form className="create-trip-form" onSubmit={SubmitHandler}>
                    <h1>Add a new Place</h1>

                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label=" Name"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        errorText="Please enter a valid Tour Name."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="url"
                        type="text"
                        label="Image"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        errorText="Please enter a valid url."
                        onInput={inputHandler}
                    />

                    <Input
                        element="input"
                        id="cost"
                        type="text"
                        label="Cost"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        errorText="Please enter a valid amount"
                        onInput={inputHandler}
                    />


                    <Input
                        element="input"
                        id="overview"
                        type="text"
                        label="Overview"
                        validators={[VALIDATOR_MINLENGTH(0)]}
                        errorText="Please enter a valid date."
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

export default AddNewPlace;


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

