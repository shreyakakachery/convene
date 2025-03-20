import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../scripts/config.js";
import PlacesList from "../../components/PlacesList/PlacesList.jsx";

function PlacesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const midLat = location.state.midLat;
  const midLon = location.state.midLon;

  const [places, setPlaces] = useState(null);

  const fetchPlaces = async () => {
    try {
      const encodedMidLat = encodeURIComponent(midLat);
      const encodedMidLon = encodeURIComponent(midLon);

      const response = await axios.get(
        `${BACKEND_URL}/places?lat=${encodedMidLat}&lon=${encodedMidLon}`
      );
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };


  useEffect(() => {
    if (midLat && midLon) {
      fetchPlaces();
    }
  }, [midLat, midLon]);


  return (
    <div>
      <button onClick={() => navigate(-1)}>Change Intersection</button>
      {!places ? <p>Loading places...</p> : <PlacesList places={places} />}
    </div>
  );
}

export default PlacesPage;
