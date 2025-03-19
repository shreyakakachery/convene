import { useState } from "react";
import "./StopPairsList.scss";

function StopPairsList({ stopPairs, onSelectMidpoint }) {
  const [selectedStopPair, setSelectedStopPair] = useState(null);

  const handleSelectStopPair = (midLat, midLon) => {
    setSelectedStopPair({ midLat, midLon });
  };

  const handleSubmit = () => {
    if (selectedStopPair) {
      onSelectMidpoint(selectedStopPair);
    }
  };

  return (
    <div className="stop-pairs">
      <h1 className="stop-pairs__title">Nearby Stops</h1>

      {stopPairs.length > 0 ? (
        <ul className="stop-pairs__list">
          {stopPairs.map((stopPair, index) => (
            <li
              className={`stop-pairs__item ${
                selectedStopPair &&
                selectedStopPair.midLat === stopPair.mid_lat &&
                selectedStopPair.midLon === stopPair.mid_lon
                  ? "stop-pairs__item--selected"
                  : ""
              }`}
              key={index}
              onClick={() =>
                handleSelectStopPair(stopPair.mid_lat, stopPair.mid_lon)
              }
            >
              <h2 className="stop-pairs__item-title">
                Intersection {index + 1}
              </h2>

              <div className="stop-pairs__info-box">
                <p className="stop-pairs__route-name">
                  {stopPair.routeA_stop.route_name}
                </p>
                <h4 className="stop-pairs__stop-name">
                  {stopPair.routeA_stop.stop_name}
                </h4>
              </div>

              <div className="stop-pairs__info-box stop-pairs__info-box--b">
                <p className="stop-pairs__route-name stop-pairs__route-name--b">
                  {stopPair.routeB_stop.route_name}
                </p>
                <h4 className="stop-pairs__stop-name stop-pairs__stop-name--b">
                  {stopPair.routeB_stop.stop_name}
                </h4>
              </div>

              <p className="stop-pairs__distance">
                Distance between stops:{" "}
                {Math.round(stopPair.distance * 100) * 10} meters
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="stop-pairs__null-message">
          No intersecting stops found. Please select a different route.
        </p>
      )}

      {selectedStopPair && (
        <button className="stop-pairs__button" onClick={handleSubmit}>
          Get Places
        </button>
      )}
    </div>
  );
}

export default StopPairsList;
