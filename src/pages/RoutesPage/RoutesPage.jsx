import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../scripts/config.js";
import RoutesList from "../../components/RoutesList/RoutesList.jsx";

function RoutesPage() {
  const location = useLocation();
  const navigate = useNavigate();


  const [routeA, setRouteA] = useState(null);
  const [routeB, setRouteB] = useState(null);
  const [stopA, setStopA] = useState(null);
  const [stopB, setStopB] = useState(null);

  const addressA = location.state.addressA;
  const addressB = location.state.addressB;

  const [routes, setRoutes] = useState(null);

  const handleSelection = (
    selectedRouteA,
    selectedRouteB,
    selectedStopA,
    selectedStopB
  ) => {
    setRouteA(selectedRouteA);
    setRouteB(selectedRouteB);
    setStopA(selectedStopA);
    setStopB(selectedStopB);
  };

  const fetchRoutes = async () => {
    try {
      const encodedAddressA = encodeURIComponent(addressA);
      const encodedAddressB = encodeURIComponent(addressB);

      const response = await axios.get(
        `${BACKEND_URL}/routes?locA=${encodedAddressA}&locB=${encodedAddressB}`
      );

      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("savedStopPairIndex");
    if (addressA && addressB) {
      fetchRoutes();
    }
  }, [addressA, addressB]);

  return (
    <div>
      {/* <button onClick={() => navigate(-1)}> Change Starting Locations</button> */}

      {!routes ? (
        <p>Loading routes...</p>
      ) : (
        <RoutesList routes={routes} onSubmitSelection={handleSelection} />
      )}
    </div>
  );
}

export default RoutesPage;
