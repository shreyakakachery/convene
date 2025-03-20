import { useNavigate } from "react-router-dom";
import "./PlacesList.scss";

function PlacesList({ places }) {
  const navigate = useNavigate();
  return (
    <div className="places">
      <button className="places__back-btn" onClick={() => navigate(-1)}>
        Change Intersection
      </button>
      <h2 className="places__title">Nearby Places</h2>
      <ul className="places__list">
        {places && places.length > 0 ? (
          places.map((place, index) => (
            <li className="places__item" key={index}>
              <h2 className="places__name">{place.name}</h2>
              <p className="places__type">Type: {place.amenity}</p>
              <p className="places__address">
                Address: {place.number} {place.street}
              </p>
            </li>
          ))
        ) : (
          <p className="places__null-message">
            No places found. Please select a different Intersection
          </p>
        )}
      </ul>
    </div>
  );
}

export default PlacesList;
