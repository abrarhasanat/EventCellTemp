import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PlaceIndex } from "../Places/PlaceIndex";
import "./PackageShowPage.scss";
import { userTrips } from "../../Constant";

let trip = {
    "id": "1",
    "tour_name": "Cox's_Bazaar",
    "start_date": "2023-04-04",
    "end_date": "2023-04-10",
    "overview": "this a demo Cox'sBazar Tour"

};

const PackageShowPage = (id) => {
    const history = useHistory();
    const packageId = useParams();
    console.log(packageId);
    console.log(packageId.packageId);
    console.log("mile?");
    userTrips.map((trip_) => {
        console.log(trip_.id,packageId.packageId);
        if (trip_.id === packageId.packageId ){
            trip = trip_;
            console.log("peye gesi mama");
        }
        
    }
    

    );
    console.log(trip);
    console.log("here : PackageShowPage");
    const [showEditModal, setShowEditModal] = useState(false);
    const [updateTrip, setUpdateTrip] = useState(false);

    console.log(packageId)

    // debugger

    const modalFunctions = {
        packageId: packageId,
        setUpdateTrip: (shown) => setUpdateTrip(shown),
    };

    // const toEditPage = () => {
    //   history.replace(`/trips/${tripId}/edit`);
    // };

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

   

    return (
        <>
            <div className="showpage-container">
                <div className="left-info">
                    <div className="top-row-info">
                        <h1 className="trip-name-header">{trip.tour_name}</h1>
                        <button
                            className="edit-button"
                            onClick={() => setShowEditModal(true)}
                        >
                            <img src={require("../../assets/edit.png")} />
                        </button>
                    </div>
                    <div className="top-row-info">
                        <h4>total capacity {trip.capacity}</h4>
                    </div>
                    <div className="date-container">
                        <div className="start-date date-field">
                            {formatDate(trip.start_date)}
                        </div>
                        <span className="date-seperator">-</span>
                        <div className="end-date date-field">
                            {formatDate(trip.end_date)}
                        </div>
                    </div>


                    <PlaceIndex trip={trip} />
                </div>

            </div>

        </>
    );
};

export default PackageShowPage;
