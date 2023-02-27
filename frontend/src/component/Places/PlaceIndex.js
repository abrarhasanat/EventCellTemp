import { useSelector } from "react-redux";
import PlaceIndexItem from "./PlaceIndexItem";
import './PlaceIndex.scss';

const locations = [
    {
        "id": "1",
        "name": "inani_beach",
        "url": "https://picsum.photos/200",
        "date": "2023-04-05",
        "rating": "5"
    },

    {
        "id": "1",
        "name": "himchori_beach",
        "url": "https://picsum.photos/200",
        "date": "2023-04-06"

    },
    {
        "id": "1",
        "name": "kolatoli beachj",
        "url": "https://picsum.photos/200",
        "date": "2023-04-07"
    }
]
const PlaceIndex = (trips) => {
    console.log("here  : Place Index")
    console.log(trips.trip);

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

    const daySection = (dateRangeArray) => dateRangeArray.map((day) => {
        console.log("I am here under placeIndex");
        // let filterDay = dateRangeArray.includes(day) ? day : "Places to Go"; 
        console.log(locations.length);
        return (
            <div key={day}>
                <h1 className="section-header">{day === "none" ? "Places to Go" : day}</h1>
                <h1 className="section-header">{day === "none" && locations.length === 0 ? "No places added yet. Add your next destination using the map on the right!" : ""}</h1>
                <div className="place-index-container">
                    {locations &&
                        locations.map((place, index) => { 
                            console.log("abrar ", place, index);
                            console.log(formatDate(place.date));
                            console.log(day);
                            if (!place.date) {
                                place.date = "none";
                            }
                            if (formatDate(place.date) === day) {
                                return (
                                    <>
                                        <PlaceIndexItem key={place.id} place={place} index={index} dateRange={createDateRange(trips.trip.startDate, trips.trip.endDate)} />
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
        <div>
            <div className="top-border"></div>
            {daySection(createDateRange(trips.trip.start_date, trips.trip.end_date))}
        </div>
    );
}

export default PlaceIndex;