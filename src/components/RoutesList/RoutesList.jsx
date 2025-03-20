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
    // localStorage.clear(); // clear local storage on mount

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
    } else {
      alert("Please select both routes and stops"); // remove alert and replace with inline error message
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
          {/* <p className="routes-list__stop-code">
            <strong>Stop Code:</strong> {stop.stop_code}
          </p> */}
          <p className="routes-list__distance">
            {/* <strong>Distance:</strong>{" "} 
            {stop.distance ? `${stop.distance.toFixed(2)} km` : "N/A"} */}
            {stop.distance.toFixed(2)} km
          </p>
        </li>
      );
    });
  };

  const routesA = routes[0];
  const routesB = routes[1];

  //
  // TO FILTER OUT TRAIN ROUTES
  //
  // add zone_id in the backend
  // then use that to filter/remove train routes

  // const allRoutesA = routes[0];
  // const allRoutesB = routes[1];

  // const RoutesA = allRoutesA.filter(route => !route.filteredStops.some(stop => stop.zone_id.startsWith("Z")));
  // const RoutesB = allRoutesB.filter(route => !route.filteredStops.some(stop => stop.zone_id.startsWith("Z")));

  return (
    <div className="routes">
      {savedRouteA && savedRouteB && (
        <p className="routes__saved-routes">
          Previously Selected: {savedRouteA} & {savedRouteB}
        </p>
      )}

      <h2 className="routes__title">Routes</h2>

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

      <button className="routes-list__button" onClick={handleGetStops}>
        Get Stops
      </button>
    </div>
  );
}

export default RoutesList;
