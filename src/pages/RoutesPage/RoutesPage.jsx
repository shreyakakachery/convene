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

  const addressA = location.state.addressA;
  const addressB = location.state.addressB;

  const [routes, setRoutes] = useState(null);

  const [stopsA, setStopsA] = useState([]);
  const [stopsB, setStopsB] = useState([]);

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
    if (!route || !stop) return;
    try {
      const response = await axios.get(`${BACKEND_URL}/route`, {
        params: { routeName: route, stopId: stop },
      });
      setStops(response.data);
    } catch (error) {
      console.error(`Error fetching stops for ${route}:`, error);
    }
  };

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
