
import { useDispatch, useSelector } from "react-redux"; 
import { useHistory } from "react-router-dom";
import './Profile.scss';

import moment from "moment";

import React, { useState, useCallback, useEffect, useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { url, port } from "../../Constant";
import Users from "../../user/pages/Users"; 
import PackageItem from "../Trips/PackageItem";
import { userTrips } from "../../Constant";
const now = new moment();



const myVendor = {
    "id": "v1",
    "name": "Depressed Travels",
    "email": "test@test.com",
    "address": "banani",
    "phone_no": "0123456789",
};


function Profile() {
    const history = useHistory();
    console.log(" i am in profile");
    console.log(userTrips);
    const current = new Date();
    const date = `${current.getMonth() + 1
        }/${current.getDate()}/${current.getFullYear()}`;

   
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [vendor, setVendor] = useState();
    const [trips, setTrips] = useState();
    const auth = useContext(AuthContext);   
    const [createMode, setCreateMode] = useState(false);

    
    // if (userTrips.length === 0) {
    //   return (
    //     <>
    //         <div>You have no upcoming trips, start planning?</div>
    //         <button>Create New Trip</button>
    //     </>
    //      )
    // } else {
    const handleClik = () => { 
        history.push(`/createPackage`);
    }
    return (
        <>
            <div className="trips-page-container">
                {/* {userTrips.map((trip) => (
        <>
          <TripsItem key={trip._id} trip={trip} />
        </>
      ))} */}
                <div className="trips-container">
                    <h1>Current Trips</h1>
                    {userTrips &&
                        userTrips
                            .filter((trip) => now.isBefore(trip.end_date))
                            .sort((tripa, tripb) => {
                                return new Date(tripa.start_date) - new Date(tripb.start_date)
                            })
                            .map((filteredTrip) => (
                                <>
                                   
                                    <PackageItem key={filteredTrip.id} trip={filteredTrip} /> 
                                </>
                            ))}
                    {userTrips && userTrips.length === 0 && <h1>You have no upcoming trips, start planning?</h1>}
                    <button onClick={handleClik} className="create-trip-button">
                        <img className="map-icon" src={require('../../assets/mapicon.png')}></img>
                        <span className="create-trip-text">Create New Trip</span>
                    </button>
                    <h1>Past Trips</h1>
                    {userTrips &&
                        userTrips
                            .filter((trip) => now.isAfter(trip.end_date))
                            .sort((tripa, tripb) => {
                                return new Date(tripa.end_date) - new Date(tripb.end_date)
                            })
                            .map((filteredTrips) => (
                                 <PackageItem key={filteredTrips.id} trip={filteredTrips} />
                            ))}
                     
                </div>
               
            </div>
           
        </>

    );
}

export default Profile;
