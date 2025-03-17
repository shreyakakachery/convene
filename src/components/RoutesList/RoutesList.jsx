function RoutesList({routes}) {
  return (
    <div>
      <p>RoutesList.jsx</p>
      <h1>NEARBY ROUTES</h1>
      {routes.length > 0 ? (
        routes.map((route, routeIndex) => (
          <div key={routeIndex}>
            <h2>Address: {route.address}</h2>

            <h3>Stops:</h3>
            {route.filteredStops.map((stop, stopIndex) => (
              <div
                key={stopIndex}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid gray",
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
                  <strong>Stop ID:</strong> {stop.stop_id}
                </p>
                <p>
                  <strong>Distance:</strong>{" "}
                  {stop.distance ? `${stop.distance.toFixed(2)} km` : "N/A"}
                </p>
                <p>
                  <strong>Coordinates:</strong> {stop.stop_lat}, {stop.stop_lon}
                </p>
              </div>
            ))}
            <hr />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RoutesList;
