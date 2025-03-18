import { useState } from "react";
import "./StopPairsList.scss";

function StopPairsList({ stopPairs, onSelectMidpoint }) {
  const [selectedMidLat, setSelectedMidLat] = useState(null);
  const [selectedMidLon, setSelectedMidLon] = useState(null);

  const handleSelectStopPair = (midLat, midLon) => {
    setSelectedMidLat(midLat);
    setSelectedMidLon(midLon);
  };

  const handleSubmit = () => {
    if (selectedMidLat !== null && selectedMidLon !== null) {
      onSelectMidpoint(selectedMidLat, selectedMidLon); // Send data to HomePage
    }
  };

  return (
    <div>
      <p>StopPairsList.jsx</p>
      <h1>STOP PAIRS</h1>
      {stopPairs.length > 0 ? (
        stopPairs.map((stopPair, index) => (
          <div
            key={index}
            onClick={() =>
              handleSelectStopPair(stopPair.mid_lat, stopPair.mid_lon)
            }
            style={{
              cursor: "pointer",
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h2>Stop Pair {index + 1}</h2>
            <p>
              <strong>Distance:</strong> {stopPair.distance} km
            </p>

            <div>
              <h3>Route A Stop for {stopPair.routeA_stop.route_name}:</h3>
              <p>
                <strong>Stop Name:</strong> {stopPair.routeA_stop.stop_name}
              </p>
              <p>
                <strong>Stop Sequence:</strong>{" "}
                {stopPair.routeA_stop.stop_sequence}
              </p>
            </div>

            <div>
              <h3>Route B Stop for {stopPair.routeB_stop.route_name}:</h3>

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
        <p>Loading stops...</p>
      )}

      {selectedMidLat !== null && selectedMidLon !== null && (
        <button onClick={handleSubmit}>Get Places</button>
      )}
    </div>
  );
}

export default StopPairsList;
