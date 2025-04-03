import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../scripts/config.js";
import RoutesList from "../../components/RoutesList/RoutesList.jsx";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import "./RoutesPage.scss";

function RoutesPage() {
  const location = useLocation();

  const [selectedRouteA, setSelectedRouteA] = useState(null);
  const [selectedRouteB, setSelectedRouteB] = useState(null);
  const [selectedStopA, setSelectedStopA] = useState(null);
  const [selectedStopB, setSelectedStopB] = useState(null);

  // const [routeA, setRouteA] = useState(null);
  // const [routeB, setRouteB] = useState(null);
  // const [stopA, setStopA] = useState(null);
  // const [stopB, setStopB] = useState(null);

  const addressA = location.state.addressA;
  const addressB = location.state.addressB;

  const [routes, setRoutes] = useState(null);

  // Create state variables and initialize them from localStorage
  // const [savedRouteA, setSavedRouteA] = useState(
  //   localStorage.getItem("savedRouteA")
  // );
  // const [savedRouteB, setSavedRouteB] = useState(
  //   localStorage.getItem("savedRouteB")
  // );
  // const [savedStopA, setSavedStopA] = useState(
  //   localStorage.getItem("savedStopA")
  // );
  // const [savedStopB, setSavedStopB] = useState(
  //   localStorage.getItem("savedStopB")
  // );

  const [stopsA, setStopsA] = useState([]);
  const [stopsB, setStopsB] = useState([]);

  // const handleRoutesSelection = (
  //   selectedRouteA,
  //   selectedRouteB,
  //   selectedStopA,
  //   selectedStopB
  // ) => {
  //   setRouteA(selectedRouteA);
  //   setRouteB(selectedRouteB);
  //   setStopA(selectedStopA);
  //   setStopB(selectedStopB);
  // };

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
  //   if (routeA && stopA) {
  //     setSavedRouteA(routeA);
  //     setSavedStopA(stopA);
  //   }
  //   if (routeB && stopB) {
  //     setSavedRouteB(routeB);
  //     setSavedStopB(stopB);
  //   }
  // }, [routeA, stopA, routeB, stopB]);

  useEffect(() => {
    if (selectedRouteA && selectedStopA) {
      fetchStops(selectedRouteA, selectedStopA, setStopsA);
    }
    if (selectedRouteB && selectedStopB) {
      fetchStops(selectedRouteB, selectedStopB, setStopsB);
    }
  }, [selectedRouteA, selectedRouteB, selectedStopA, selectedStopB]);


  useEffect(() => {
    if (coordsA) {
      localStorage.setItem("coordsA", JSON.stringify(coordsA));
    }
    if (coordsB) {
      localStorage.setItem("coordsB", JSON.stringify(coordsB));
    }
  }, [coordsA, coordsB]);
  
  useEffect(() => {
    if (stopsA.length > 0) {
      localStorage.setItem("stopsA", JSON.stringify(stopsA));
    }
    if (stopsB.length > 0) {
      localStorage.setItem("stopsB", JSON.stringify(stopsB));
    }
  }, [stopsA, stopsB]);
  

  return (
    <div className="routes-page">
      <div className="routes-page__info-container">
        {/* <p>TESTING</p>
        <p>{selectedRouteA}</p>

        {stopsB && stopsB.length > 0 ? (
          <p>{stopsB[0].stop_name}</p>
        ) : (
          <p>None</p>
        )} */}
        {!routes ? (
          <p className="routes-page__loading-message">Loading routes...</p>
        ) : (
          <RoutesList
            routes={routes}
            selectedRouteA={selectedRouteA}
            setSelectedRouteA={setSelectedRouteA}
            selectedRouteB={selectedRouteB}
            setSelectedRouteB={setSelectedRouteB}
            selectedStopA={selectedStopA}
            setSelectedStopA={setSelectedStopA}
            selectedStopB={selectedStopB}
            setSelectedStopB={setSelectedStopB}
          />
        )}
      </div>
      <div className="routes-page__map-container">
        <BaseMap
          coordsA={coordsA}
          coordsB={coordsB}
          stopsA={stopsA}
          stopsB={stopsB}
        />
      </div>
    </div>
  );
}

export default RoutesPage;
