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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  console.log(midLat);

  useEffect(() => {
    if (midLat && midLon) {
      fetchPlaces();
    }
  }, [midLat, midLon]);

  console.log(places);

  return (
    <div>
      <p>PlacesPage.jsx</p>
      <p>{location.state.midLat}</p>
      <p>{location.state.midLon}</p>
      {!places ? <p>Loading places...</p> : <PlacesList places={places} />}
    </div>
  );
}

export default PlacesPage;
