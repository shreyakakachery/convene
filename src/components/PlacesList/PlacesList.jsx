import "./PlacesList.scss";

function PlacesList({ places, category, onPlaceClick, selectedPlace }) {
  return (
    <div className="places">
      <h2 className="places__title">Nearby {category}s</h2>
      <ul className="places__list">
        {places && places.length > 0 ? (
          places.map((place, index) => {
            const isSelected = selectedPlace && selectedPlace.id === place.id;

            const placeUrl =
              place.number === "Unknown"
                ? `https://www.google.com/search?q=${place.name}+${category}`
                : `https://www.google.com/maps/search/${place.name}+${place.number}+${place.street}`;

            const linkText =
              place.number === "Unknown" ? "Google" : "Google Maps";

            return (
              <li
                className={`places__item ${
                  isSelected ? "places__item--selected" : ""
                }`}
                key={index}
                onClick={() => onPlaceClick(place)}
              >
                <h2 className="places__name">{place.name}</h2>
                <p className="places__type">Type: {place.amenity}</p>
                <p className="places__address">
                  Address: {place.number} {place.street}
                </p>
                <a
                  className="places__link"
                  href={placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkText}
                </a>
              </li>
            );
          })
        ) : (
          <p className="places__null-message">
            No places found. Please select a different intersection.
          </p>
        )}
      </ul>
    </div>
  );
}

export default PlacesList;
