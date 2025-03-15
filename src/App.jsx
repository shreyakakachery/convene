import { BACKEND_URL } from "./scripts/config.js";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.scss'

function App() {

  console.log("hi")

  const [places, setPlaces] = useState(null);

  console.log(places)


  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/places?lat=49.2344841&lon=-123.1543581`);
      // const response = await axios.get(`${BACKEND_URL}/places`);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  console.log(places)

  if (!places) {
    return <div>Loading places...</div>;
  }



  return (
    <div>
      <p>App.jsx</p>
      <p>{BACKEND_URL}</p>
      <h3>Places Nearby</h3>
      <ul>
        {places && places.length > 0 ? (
          places.map((place, index) => (
            <li key={index}>
              <h2>{place.name}</h2>
              <p>Type: {place.amenity}</p>
              <p>Address: {place.number} {place.street}</p>
              {/* <p>Location: Latitude {place.lat}, Longitude {place.lon}</p> */}
              {/* <p>Indoor Seating: {place.indoor_seating}</p>
              <p>Outdoor Seating: {place.outdoor_seating}</p> */}
            </li>
          ))
        ) : (
          <p>No places found.</p>
        )}
      </ul>
    </div>

  )
}

export default App
