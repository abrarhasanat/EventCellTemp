import { useSelector } from "react-redux";
import PlaceIndexItem from "./PlaceIndexItem";
import './PlaceIndex.scss';
import { locations } from "../../Constant";
import Button from "../../shared/components/FormElements/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
const PlaceIndex = (trips) => {
    console.log("here  : Place Index")
    console.log(trips.trip.id);
    const history = useHistory();
    const [showAddLocation, setShowAddLocation] = useState(false);
    const [places, setPlaces] = useState([]);
    const formatDate = (dateString) => {
        let setDate = new Date(dateString);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const timeDiff = setDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(setDate.valueOf() + timeDiff);
        return adjustedDate.toLocaleDateString("default", options);
    };

    const createDateRange = (startDate, end) => {
        console.log(locations);
        let dateRangeArray = ["none"];
        let currentDate = new Date(startDate);
        // debugger
        let endDate = new Date(end);
        console.log(currentDate);
        while (currentDate <= endDate) {
            dateRangeArray.push(formatDate(new Date(currentDate)));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        console.log(endDate);
        console.log(dateRangeArray.length);

        return dateRangeArray;
    }

    const createDays = (totalDays) => {
        console.log("I am creating some days");
        let days = [];
        let curr = 1;
        while (curr <= parseInt(totalDays)) {
            days.push(curr.toString());
            curr = curr + 1;
            console.log(curr);
        }
        console.log(days);
        return days;
    }
    const addNewLocation = (day) => {
        history.push(`/edit/${trips.trip.id}/${day}/addNewPlace`);
    }


    let placeList = [];

    useEffect(() => {
        const fetchPlace = async () => {
            let days = createDays(trips.trip.tour_length);
            console.log("days loaded");
            days.map((day) => {

                let placesUnderThisDay = [];
                locations.map((place) => {
                    if (place.day === day) {
                        placesUnderThisDay.push(place);
                    }
                });
                placeList.push({ day_no: day, places: placesUnderThisDay });

            });
            console.log(placeList);
            setPlaces(placeList);
            console.log("place List loaded");
            console.log(places);

        };
        fetchPlace();
    }, [locations]);

    const test = () => {
        return (
            <>
                <h1>ki je obsta</h1>
            </>
        )
    }
    const DescriveTour = () => {
        
        places.map((tuple) => {
            console.log("keno");
            console.log(tuple);
            return (
                <h1>haha</h1>
                // <div key={tuple.day_no}>

                //     {/* <br></br>
                //     <h1>Bangladesh Bangladesh</h1>
                //     <Button className="section-header"> Trip Day {tuple.day_no === "none" ? "Places to Go" : tuple.day_no}</Button>

                //     <Button onclick={handleAddNew} >Add New Place </Button>
                //     <div className="place-index-container">
                //         {places &&
                //             tuple.places.map((place, index) => {
                //                 console.log("the place is");
                //                 console.log(place);
                //                 return (
                //                     <> 
                //                         {console.log("kenoooooooo")}
                //                         <PlaceIndexItem key={place.id} tripId={trips.trip.id} day={place.day} place={place} index={index} dateRange={createDateRange(trips.trip.startDate, trips.trip.endDate)} />
                //                     </>
                //                 )

                //             }

                //             )}
                //     </div> */}
                // </div>
            )
        })
    }

    const handleAddNew = () => {
        
    }

    const daySection = (dateRangeArray) => dateRangeArray.map((day) => {
        console.log("I am here under placeIndex");
        // let filterDay = dateRangeArray.includes(day) ? day : "Places to Go"; 

        return (
            <div key={day}>
                <br></br>
                <Button className="section-header"> Trip Day {day === "none" ? "Places to Go" : day}</Button>
                <h1 className="section-header">{day === "none" && locations.length === 0 ? "No places added yet. Add your next destination using the map on the right!" : ""}</h1>

                <NavLink to={`/edit/${trips.trip.id}/${day}`}>add a place</NavLink>
                <div className="place-index-container">
                    {locations &&
                        locations.map((place, index) => {
                            console.log("abrar ", place, index);
                            console.log(formatDate(place.date));
                            console.log(day);
                            if (!place.date) {
                                place.date = "none";
                            }
                            if (place.day === day) {
                                return (
                                    <>
                                        <PlaceIndexItem key={place.id} tripId={trips.trip.id} day={place.day} place={place} index={index} dateRange={createDateRange(trips.trip.startDate, trips.trip.endDate)} />
                                    </>
                                )
                            }
                        }

                        )}
                </div>
                
            </div>
        )
    })

    return (
        <>



            <div>
                <div className="top-border"></div>
                {daySection(createDays(trips.trip.tour_length))}
            </div>   
            




        </>
    );
}

export { PlaceIndex, locations };




// {
//     divisions && (
//         <select
//             className="form-control"
//             onChange={getDistricts}
//             value={division}
//         >
//             <option key={"u1"} value={"Division"}>
//                 Division
//             </option>
//             <label> Division </label>
//             {divisions.map((c) => {
//                 return (
//                     <option
//                         key={c.DIVISION}
//                         value={c.DIVISION}
//                     //onClick={setDivision(c.DIVISION) && getDistricts}
//                     >
//                         {c.DIVISION}
//                     </option>
//                 );
//             })}
//         </select>
//     )
// }
