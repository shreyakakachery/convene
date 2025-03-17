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

      {selectedMidLat !== null && selectedMidLon !== null && (
        <button onClick={handleSubmit}>Get Places</button>
      )}

      {/* <h1 className="stop-pairs__title">STOP PAIRS</h1>
      {stopPairs.length > 0 ? (
        stopPairs.map((stopPair, index) => {
          const isSelected =
            stopPair.mid_lat === selectedMidLat &&
            stopPair.mid_lon === selectedMidLon;

          return (
            <div
              key={index}
              onClick={() =>
                handleSelectStopPair(stopPair.mid_lat, stopPair.mid_lon)
              }
              className={`stop-pairs__item ${
                isSelected ? "stop-pairs__item--selected" : ""
              }`}
            >
              <h2 className="stop-pairs__item-title">Stop Pair {index + 1}</h2>
              <p className="stop-pairs__item-info">
                <strong>Distance:</strong> {stopPair.distance} km
              </p>
              <p className="stop-pairs__item-info">
                <strong>Mid lat:</strong> {stopPair.mid_lat}
              </p>
              <p className="stop-pairs__item-info">
                <strong>Mid lon:</strong> {stopPair.mid_lon}
              </p>

              <div className="stop-pairs__route">
                <h3 className="stop-pairs__route-title">Route A Stop:</h3>
                <p className="stop-pairs__route-info">
                  <strong>Route Name:</strong> {stopPair.routeA_stop.route_name}
                </p>
                <p className="stop-pairs__route-info">
                  <strong>Stop Name:</strong> {stopPair.routeA_stop.stop_name}
                </p>
                <p className="stop-pairs__route-info">
                  <strong>Stop Sequence:</strong>{" "}
                  {stopPair.routeA_stop.stop_sequence}
                </p>
              </div>

              <div className="stop-pairs__route">
                <h3 className="stop-pairs__route-title">Route B Stop:</h3>
                <p className="stop-pairs__route-info">
                  <strong>Route Name:</strong> {stopPair.routeB_stop.route_name}
                </p>
                <p className="stop-pairs__route-info">
                  <strong>Stop Name:</strong> {stopPair.routeB_stop.stop_name}
                </p>
                <p className="stop-pairs__route-info">
                  <strong>Stop Sequence:</strong>{" "}
                  {stopPair.routeB_stop.stop_sequence}
                </p>
              </div>

              <hr />
            </div>
          );
        })
      ) : (
        <p className="stop-pairs__loading">Loading...</p>
      )}

      {selectedMidLat !== null && selectedMidLon !== null && (
        <button className="stop-pairs__button" onClick={handleSubmit}>
          Get Places
        </button>
      )} */}
    </div>
  );
}

export default StopPairsList;
