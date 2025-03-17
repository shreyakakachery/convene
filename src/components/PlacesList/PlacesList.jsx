function PlacesList({ places }) {
  return (
    <div>
      <p>PlacesList.jsx</p>
      <h1>PLACES</h1>
      <h3>Places Nearby</h3>
      <ul>
        {places && places.length > 0 ? (
          places.map((place, index) => (
            <li key={index}>
              <h2>{place.name}</h2>
              <p>Type: {place.amenity}</p>
              <p>
                Address: {place.number} {place.street}
              </p>
              <p>
                Location: Latitude {place.lat}, Longitude {place.lon}
              </p>
              <p>Indoor Seating: {place.indoor_seating}</p>
              <p>Outdoor Seating: {place.outdoor_seating}</p>
            </li>
          ))
        ) : (
          <p>No places found.</p>
        )}
      </ul>
    </div>
  );
}

export default PlacesList;
