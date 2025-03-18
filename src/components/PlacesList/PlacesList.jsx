function PlacesList({ places }) {
  return (
    <div className="places">
      <h3 className="places__title">Places Nearby</h3>
      <ul className="places__list">
        {places && places.length > 0 ? (
          places.map((place, index) => (
            <li className="places__item" key={index}>
              <h2 className="places__item-name">{place.name}</h2>
              <p className="places__item-type">Type: {place.amenity}</p>
              <p className="places__item-address">
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
