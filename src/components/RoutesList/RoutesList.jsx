import { useState } from "react";

function RoutesList({ routes, onSubmitSelection }) {
  const [selectedRouteA, setSelectedRouteA] = useState(null);
  const [selectedRouteB, setSelectedRouteB] = useState(null);
  const [selectedStopA, setSelectedStopA] = useState(null);
  const [selectedStopB, setSelectedStopB] = useState(null);

  const handleRouteSelection = (routeType, route, stop) => {
    if (routeType === "routeA") {
      setSelectedRouteA(route);
      setSelectedStopA(stop);
    } else if (routeType === "routeB") {
      setSelectedRouteB(route);
      setSelectedStopB(stop);
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
    } else {
      alert("Please select both routes and stops"); // remove alert and replace with inline error message
    }
  };

  const renderRoutes = (route, selectedRoute, selectedStop, routeType) => {
    return route.filteredStops.map((stop, stopIndex) => {
      const isSelected =
        selectedRoute === stop.route && selectedStop === stop.stop_id;
      return (
        <li
          key={stopIndex}
          onClick={() =>
            handleRouteSelection(routeType, stop.route, stop.stop_id)
          }
          className={`route-list__item ${
            isSelected ? "route-list__item--selected" : ""
          }`}
        >
          <p className="routes-list__route-name">
            <strong>Route Name:</strong> {stop.route || "N/A"}
          </p>
          <p className="routes-list__stop-name">
            <strong>Stop Name:</strong> {stop.stop_name}
          </p>
          <p className="routes-list__stop-code">
            <strong>Stop Code:</strong> {stop.stop_code}
          </p>
          <p className="routes-list__distance">
            <strong>Distance:</strong>{" "}
            {stop.distance ? `${stop.distance.toFixed(2)} km` : "N/A"}
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
    <div>
      <p>RoutesList.jsx</p>

      <p>{routesA.address}</p>
      <ul className="routes-list routes-list--a">
        {renderRoutes(routesA, selectedRouteA, selectedStopA, "routeA")}
      </ul>

      <p>{routesB.address}</p>
      <ul className="routes-list routes-list--b">
        {renderRoutes(routesB, selectedRouteB, selectedStopB, "routeB")}
      </ul>

      <button onClick={handleGetStops}>Get Stops</button>
    </div>
  );
}

export default RoutesList;
