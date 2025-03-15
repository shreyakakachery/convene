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
      // const response = await axios.get(`${BACKEND_URL}/places?lat=49.2827&lon=-123.1207`);
      const response = await axios.get(`${BACKEND_URL}/places`);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  console.log(places)



  return (
    <div>
      <p>App.jsx</p>
      <p>{BACKEND_URL}</p>
    </div>

  )
}

export default App
