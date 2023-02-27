import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import './PackageItem.scss';

function PackageItem({ trip }) {
    console.log(trip)
    console.log(trip.start_date);
    console.log(trip.end_date);


    // const current = new Date();
    // const date = `${
    //   current.getMonth() + 1
    // }/${current.getDate()}/${current.getFullYear()}`;
    // const now = moment();

    // console.log(date, trip.endDate, now.isAfter(trip.endDate));

   
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
        <div className="trip-item">
            <div className="trip-info-wrapper">
                <Link to={`/package/${trip.id}`} className="Trip-Index-Item"><h2>{trip.tour_name}</h2></Link>
                <div className="profile-date-wrapper">
                    <div className="start-date"> {formatDate(trip.start_date)}</div>
                    <span>-</span>
                    <div className="end-date">{formatDate(trip.end_date)}</div>
                </div>
                <div className="profile-date-wrapper">
                    <h4>Current capacity {trip.capacity}</h4>
                   
                </div>
                <div className="profile-date-wrapper">
                    <h4>{trip.tour_length} days tour package </h4>                   
                </div>
        
                {/* <button className="delete-trip-button" onClick={handleDelete}>Delete</button> */}
            </div>
        </div>
    );
}

export default PackageItem; 
