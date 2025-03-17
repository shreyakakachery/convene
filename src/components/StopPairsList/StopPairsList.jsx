

function StopPairsList({stopPairs}) {
  return (
    <div>
      <p>StopPairsList.jsx</p>
      <h1>STOP PAIRS</h1>
      {stopPairs.length > 0 ? (
        stopPairs.map((stopPair, index) => (
          <div key={index}>
            <h2>Stop Pair {index + 1}</h2>
            <p>
              <strong>Distance:</strong> {stopPair.distance} km
            </p>
            <p>
              <strong>Mid lat:</strong> {stopPair.mid_lat}
            </p>
            <p>
              <strong>Mid lon:</strong> {stopPair.mid_lon}
            </p>

            <div>
              <h3>Route A Stop:</h3>
              <p>
                <strong>Route Name:</strong> {stopPair.routeA_stop.route_name}
              </p>
              <p>
                <strong>Stop Name:</strong> {stopPair.routeA_stop.stop_name}
              </p>
              <p>
                <strong>Stop Sequence:</strong>{" "}
                {stopPair.routeA_stop.stop_sequence}
              </p>
            </div>

            <div>
              <h3>Route B Stop:</h3>
              <p>
                <strong>Route Name:</strong> {stopPair.routeB_stop.route_name}
              </p>
              <p>
                <strong>Stop Name:</strong> {stopPair.routeB_stop.stop_name}
              </p>
              <p>
                <strong>Stop Sequence:</strong>{" "}
                {stopPair.routeB_stop.stop_sequence}
              </p>
            </div>

            <hr />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StopPairsList;
