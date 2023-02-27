let url = "localhost";
let port = "5000";

let trip_list = [];
let userTrips = [

    {
        "id": "1",
        "tour_name": "Cox's_Bazaar",
        "tour_length": "5",
        "capacity" : "10" , 
        "start_date": "2023-04-04",
        "end_date": "2023-05-05",
        "overview": "this a demo Cox'sBazar Tour"
    },

    {
        "id": "2",
        "tour_name": "Bandarban",
        "tour_length": "3",
        "capacity": "50" ,
        "start_date": "2023-04-04",
        "end_date": "2023-05-05",
        "overview": "This is a demo Bandarban Tour"
    },
];

let locations = [
    {
        "id": "1",
        "name": "inani_beach",
        "url": "https://picsum.photos/200",
        "date": "2023-04-05",
        "rating": "5",
        "coordinates": {
            "lat": 21.4272,
            "long": 92.0058
        },
        "day" : "1" 
    },

    {
        "id": "1",
        "name": "himchori_beach",
        "url": "https://picsum.photos/200",
        "date": "2023-04-06",
        "coordinates": {
            "lat": 21.4272,
            "long": 92.0058
        },
        "day" : "2",

    },
    {
        "id": "1",
        "name": "kolatoli beachj",
        "url": "https://picsum.photos/200",
        "date": "2023-04-07",
        "coordinates": {
            "lat": 21.4272,
            "long": 92.0058
        },
        "day" : "3"
    }
]
export { url, port, userTrips , locations };