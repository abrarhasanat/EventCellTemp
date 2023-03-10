import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './PlaceIndexItem.scss';

function PlaceIndexItem({ place,tripId, day, index, dateRange }) {

    const [selectedDate, setSelectedDate] = useState('');

    const handleDelete = (e) => {
        e.preventDefault();
        // trip.locations.splice(index, 1);
        // dispatch(updateTrip(trip));
    };

    const handleDateSelect = (e) => {
        // trip.locations[index].date = e.target.value;
        // dispatch(updateTrip(trip));
        // console.log("date selected", e.target.value);
        // console.log(trip.startDate);
        // console.log(trip.endDate);
    };

    return (
        <div className="place-container">
            <div className="marker-number">
                {index + 1}
            </div>
            <h1>{place.name}</h1>
            <div className="picture-wrapper">
                <img className="place-photo" src={place.url} />
            </div>
            <div className="info-wrapper">
                {place.url && <a className="website-link" href={place.url} target="_blank">
                    <div>{place.title && place.title}</div>
                </a>}
                {place.rating && <div className="place-rating">Rating: {place.rating} stars</div>}
                {place.hours && <div>Hours:  {place.hours[4]}</div>}
                <select
                    value={place.date}
                    onChange={handleDateSelect}
                >
                    {dateRange.map((day) => {
                        // debugger
                        return <option key={day} value={day}>{day}</option>
                    })}
                    {/* <option value="Orange">Orange</option>
            <option value="Radish">Radish</option>
            <option value="Cherry">Cherry</option> */}
                </select>

                {/* <div>{startDateTime}</div>
      <div>{endDateTime}</div> */}
                {/* <div>
        <div>{voteCount}</div>
        <button onClick={handleAdd}>+</button>
        <button onClick={handleSubtract}>-</button>
      </div> */}
                <img onClick={handleDelete} className="delete-button" src={require('../../assets/CloseModal.png')} />
            </div>
        </div>
    );
}

export default PlaceIndexItem;
