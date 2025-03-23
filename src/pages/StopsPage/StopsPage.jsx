import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../scripts/config.js";
import StopPairsList from "../../components/StopPairsList/StopPairsList.jsx";

function StopsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const routeA = location.state.selectedRouteA;
  const routeB = location.state.selectedRouteB;
  const stopA = location.state.selectedStopA;
  const stopB = location.state.selectedStopB;

  const [_midLat, setMidLat] = useState(null);
  const [_midLon, setMidLon] = useState(null);

  const [stopPairs, setStopPairs] = useState(null);

  const handleMidpointSelection = (selectedMidpoint) => {
    setMidLat(selectedMidpoint.midLat);
    setMidLon(selectedMidpoint.midLon);

    navigate("/places", {
      state: {
        midLat: selectedMidpoint.midLat,
        midLon: selectedMidpoint.midLon,
      },
    });
  };

  const fetchStopPairs = async () => {
    if (!routeA || !routeB || !stopA || !stopB) {
      console.warn("fetchStopPairs skipped: missing route or stop values");
      return;
    }

    try {
      const encodedRouteA = encodeURIComponent(routeA);
      const encodedRouteB = encodeURIComponent(routeB);

      const response = await axios.get(
        `${BACKEND_URL}/stops?routeA=${encodedRouteA}&originStopA=${stopA}&routeB=${encodedRouteB}&originStopB=${stopB}`
      );

      const allStopPairs = Object.keys(response.data).flatMap(
        (key) => response.data[key]
      );

      setStopPairs(allStopPairs);
    } catch (error) {
      console.error("Error fetching stop pairs:", error);
    }
  };

  useEffect(() => {
    if (routeA && routeB && stopA && stopB) {
      fetchStopPairs();
    }
  }, [routeA, routeB, stopA, stopB]);

  return (
    <div>
      {!stopPairs ? (
        <p>Loading stop pairs...</p>
      ) : (
        <StopPairsList
          stopPairs={stopPairs}
          onSelectMidpoint={handleMidpointSelection}
        />
      )}
    </div>
  );
}

export default StopsPage;
