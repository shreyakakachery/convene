import "./PlacesList.scss";

function PlacesList({ places }) {
  return (
    <div className="places">
      <h2 className="places__title">Places Nearby</h2>
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
          <p className="places__null-message">No places found.</p>
        )}
      </ul>
    </div>
  );
}

export default PlacesList;
