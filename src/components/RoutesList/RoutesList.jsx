import { useState } from "react";

function RoutesList({ routes, onSubmitSelection }) {
  const [selectedRouteA, setSelectedRouteA] = useState(null);
  const [selectedRouteB, setSelectedRouteB] = useState(null);
  const [selectedStopA, setSelectedStopA] = useState(null);
  const [selectedStopB, setSelectedStopB] = useState(null);

  // Handle route selection
  const handleRouteSelection = (routeType, route, stop) => {
    if (routeType === "routeA") {
      setSelectedRouteA(route);
      setSelectedStopA(stop);
    } else if (routeType === "routeB") {
      setSelectedRouteB(route);
      setSelectedStopB(stop);
    }
  };

  // Handle form submission
  const handleGetStops = () => {
    if (selectedRouteA && selectedRouteB && selectedStopA && selectedStopB) {
      onSubmitSelection(
        selectedRouteA,
        selectedRouteB,
        selectedStopA,
        selectedStopB
      );
    } else {
      alert("Please select both routes and stops");
    }
  };

  return (
    <div>
      <p>RoutesList.jsx</p>

      <h1>NEARBY ROUTES with selection</h1>
      {routes.length > 0 ? (
        routes.map((route, routeIndex) => (
          <div key={routeIndex}>
            <h2>Address: {route.address}</h2>

            <h3>Stops:</h3>
            {route.filteredStops.map((stop, stopIndex) => {
              const isRouteASelected =
                selectedRouteA === stop.route && routeIndex % 2 === 0;
              const isRouteBSelected =
                selectedRouteB === stop.route && routeIndex % 2 !== 0;

              return (
                <div
                  key={stopIndex}
                  onClick={() =>
                    handleRouteSelection(
                      routeIndex % 2 === 0 ? "routeA" : "routeB",
                      stop.route,
                      stop.stop_id
                    )
                  }
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid gray",
                    cursor: "pointer",
                    backgroundColor:
                      isRouteASelected || isRouteBSelected
                        ? "#d3f9d8"
                        : "transparent", // Highlight selected route
                    borderColor:
                      isRouteASelected || isRouteBSelected ? "green" : "gray", // Change border color for selected routes
                  }}
                >
                  <p>
                    <strong>Route:</strong> {stop.route || "N/A"}
                  </p>
                  <p>
                    <strong>Stop Name:</strong> {stop.stop_name}
                  </p>
                  <p>
                    <strong>Stop Code:</strong> {stop.stop_code}
                  </p>
                  <p>
                    <strong>Distance:</strong>{" "}
                    {stop.distance ? `${stop.distance.toFixed(2)} km` : "N/A"}
                  </p>
                </div>
              );
            })}
            <hr />
          </div>
        ))
      ) : (
        <p>No routes found.</p>
      )}

      {/* Button to submit selected routes and stops */}
      <button onClick={handleGetStops}>Get Stops</button>
    </div>
  );
}

export default RoutesList;
