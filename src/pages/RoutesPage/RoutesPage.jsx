import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../scripts/config.js";
import RoutesList from "../../components/RoutesList/RoutesList.jsx";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import "./RoutesPage.scss";

function RoutesPage() {
  const location = useLocation();

  const [_routeA, setRouteA] = useState(null);
  const [_routeB, setRouteB] = useState(null);
  const [_stopA, setStopA] = useState(null);
  const [_stopB, setStopB] = useState(null);

  const addressA = location.state.addressA;
  const addressB = location.state.addressB;

  const [routes, setRoutes] = useState(null);

  // const savedRouteA = localStorage.getItem("savedRouteA");
  // const savedRouteB = localStorage.getItem("savedRouteB");
  // const savedStopA = localStorage.getItem("savedStopA");
  // const savedStopB = localStorage.getItem("savedStopB");


    // Create state variables and initialize them from localStorage
    const [savedRouteA, setSavedRouteA] = useState(localStorage.getItem("savedRouteA"));
    const [savedRouteB, setSavedRouteB] = useState(localStorage.getItem("savedRouteB"));
    const [savedStopA, setSavedStopA] = useState(localStorage.getItem("savedStopA"));
    const [savedStopB, setSavedStopB] = useState(localStorage.getItem("savedStopB"));

  const [stopsA, setStopsA] = useState([]);
  const [stopsB, setStopsB] = useState([]);

  const handleRoutesSelection = (
    selectedRouteA,
    selectedRouteB,
    selectedStopA,
    selectedStopB
  ) => {
    setRouteA(selectedRouteA);
    setRouteB(selectedRouteB);
    setStopA(selectedStopA);
    setStopB(selectedStopB);

        // Save the selected values to localStorage
        localStorage.setItem("savedRouteA", selectedRouteA);
        localStorage.setItem("savedRouteB", selectedRouteB);
        localStorage.setItem("savedStopA", selectedStopA);
        localStorage.setItem("savedStopB", selectedStopB);
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

  const coordsA = routes?.[0]
    ? { address: routes[0].address, lat: routes[0].lat, lon: routes[0].lon }
    : null;
  const coordsB = routes?.[1]
    ? { address: routes[1].address, lat: routes[1].lat, lon: routes[1].lon }
    : null;

  const fetchStops = async (route, stop, setStops) => {
    if (!route || !stop) return; // Prevent unnecessary API calls
    try {
      const response = await axios.get(`${BACKEND_URL}/route`, {
        params: { routeName: route, stopId: stop },
      });
      setStops(response.data);
    } catch (error) {
      console.error(`Error fetching stops for ${route}:`, error);
    }
  };

  // useEffect(() => {
  //   fetchStops(savedRouteA, savedStopA, setStopsA);
  //   fetchStops(savedRouteB, savedStopB, setStopsB);
  // }, [savedRouteA, savedStopA, savedRouteB, savedStopB]); // Runs when any of these change

  // useEffect(() => {
  //   if (stopsA.length > 0 || stopsB.length > 0) {
  //     // Here you could do additional things like setting zoom or centering the map
  //   }
  // }, [stopsA, stopsB]); // Trigger map update when stops are updated


  useEffect(() => {
    if (savedRouteA && savedStopA) {
      fetchStops(savedRouteA, savedStopA, setStopsA);
    }
    if (savedRouteB && savedStopB) {
      fetchStops(savedRouteB, savedStopB, setStopsB);
    }
  }, [savedRouteA, savedStopA, savedRouteB, savedStopB]);

  // useEffect(() => {
  //   if (stopsA.length > 0 || stopsB.length > 0) {
  //     // Here you could do additional things like setting zoom or centering the map
  //   }
  // }, [stopsA, stopsB]); // Trigger map update when stops are updated


  console.log(stopsB)




  return (
    <div className="routes-page">
      <div className="routes-page__info-container">
        {!routes ? (
          <p className="routes-page__loading-message">Loading routes...</p>
        ) : (
          <RoutesList
            routes={routes}
            onSubmitSelection={handleRoutesSelection}
          />
        )}
      </div>
      <div className="routes-page__map-container">
        <BaseMap coordsA={coordsA} coordsB={coordsB} stopsA={stopsA} stopsB={stopsB} />
      </div>
    </div>
  );
}

export default RoutesPage;
