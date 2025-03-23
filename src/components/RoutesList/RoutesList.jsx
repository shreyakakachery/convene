import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RoutesList.scss";

function RoutesList({ routes, onSubmitSelection }) {
  const [selectedRouteA, setSelectedRouteA] = useState(null);
  const [selectedRouteB, setSelectedRouteB] = useState(null);
  const [selectedStopA, setSelectedStopA] = useState(null);
  const [selectedStopB, setSelectedStopB] = useState(null);

  const [savedRouteA, setSavedRouteA] = useState(null);
  const [savedRouteB, setSavedRouteB] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedRouteA = localStorage.getItem("savedRouteA");
    const savedRouteB = localStorage.getItem("savedRouteB");

    if (savedRouteA && savedRouteB) {
      setSavedRouteA(savedRouteA);
      setSavedRouteB(savedRouteB);
    }
  }, []);

  const handleRouteSelection = (routeType, route, stop) => {
    if (routeType === "routeA") {
      setSelectedRouteA(route);
      setSelectedStopA(stop);
      localStorage.setItem("savedRouteA", route);
    } else if (routeType === "routeB") {
      setSelectedRouteB(route);
      setSelectedStopB(stop);
      localStorage.setItem("savedRouteB", route);
    }
  };

  const handleGetStops = () => {
    if (selectedRouteA && selectedRouteB && selectedStopA && selectedStopB) {
      onSubmitSelection(
        selectedRouteA,
        selectedRouteB,
        selectedStopA,
        selectedStopB
      );
      navigate("/stops", {
        state: { selectedRouteA, selectedRouteB, selectedStopA, selectedStopB },
      });
    }
  };

  const renderRoutes = (route, selectedRoute, selectedStop, routeType) => {
    return route.filteredStops.map((stop, stopIndex) => {
      const isSelected =
        selectedRoute === stop.route && selectedStop === stop.stop_id;

      const routeItemModifier =
        routeType === "routeB" ? "routes-list__item--b" : "";
      return (
        <li
          key={stopIndex}
          onClick={() =>
            handleRouteSelection(routeType, stop.route, stop.stop_id)
          }
          className={`routes-list__item  ${routeItemModifier}  ${
            isSelected ? "routes-list__item--selected" : ""
          }`}
        >
          <p className="routes-list__route-name">{stop.route || "N/A"}</p>
          <p className="routes-list__stop-name">{stop.stop_name}</p>
          <p className="routes-list__distance">{stop.distance.toFixed(2)} km</p>
        </li>
      );
    });
  };

  const allRoutesA = routes[0];
  const allRoutesB = routes[1];

  const routesA = {
    ...allRoutesA,
    filteredStops: allRoutesA.filteredStops.filter((stop) =>
      stop.zone_id.startsWith("B")
    ),
  };

  const routesB = {
    ...allRoutesB,
    filteredStops: allRoutesB.filteredStops.filter((stop) =>
      stop.zone_id.startsWith("B")
    ),
  };

  return (
    <div className="routes">
      <button className="routes__back-btn" onClick={() => navigate(-1)}>
        {" "}
        Change Address
      </button>

      <h2 className="routes__title">Routes</h2>
      <p className="routes__instruction">Select a route from each list</p>

      {savedRouteA && savedRouteB && (
        <ul className="routes__prev-selection">
          {" "}
          Previously Selected:
          <li>{savedRouteA}</li>
          <li>{savedRouteB}</li>
        </ul>
      )}

      <div className="routes__lists">
        <ul className="routes-list routes-list--a">
          <p className="routes-list__title">{routesA.address}</p>
          {renderRoutes(routesA, selectedRouteA, selectedStopA, "routeA")}
        </ul>

        <ul className="routes-list routes-list--b">
          <p className="routes-list__title routes-list__title--b">
            {routesB.address}
          </p>

          {renderRoutes(routesB, selectedRouteB, selectedStopB, "routeB")}
        </ul>
      </div>

      {selectedRouteA && selectedRouteB && (
        <button className="stop-pairs__button" onClick={handleGetStops}>
          Get Stops
        </button>
      )}
    </div>
  );
}

export default RoutesList;
