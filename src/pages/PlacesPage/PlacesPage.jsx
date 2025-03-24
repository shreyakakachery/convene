import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../scripts/config.js";
import PlacesList from "../../components/PlacesList/PlacesList.jsx";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import "./PlacesPage.scss";

function PlacesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const midLat = location.state.midLat;
  const midLon = location.state.midLon;

  const [places, setPlaces] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("cafe");
  const [selectedPlace, setSelectedPlace] = useState(null)

  const fetchPlaces = async (category) => {
    try {
      const encodedMidLat = encodeURIComponent(midLat);
      const encodedMidLon = encodeURIComponent(midLon);

      const response = await axios.get(
        `${BACKEND_URL}/places?lat=${encodedMidLat}&lon=${encodedMidLon}&category=${category}`
      );

      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    if (midLat && midLon) {
      fetchPlaces(selectedCategory);
    }
  }, [midLat, midLon, selectedCategory]);

    // NEW HANDLER FUNCTION TO UPDATE SELECTED PLACE
    const handlePlaceClick = (place) => {
      setSelectedPlace(place);
    };

  return (
    <div className="places-page">
      <div className="places-page__info-container">
        <button className="places__back-btn" onClick={() => navigate(-1)}>
          Change Intersection
        </button>
        <div className="category">
          <h3 className="category__title">Categories:</h3>
          <div className="category__buttons">
            <button
              className={`category__btn ${
                selectedCategory === "cafe" ? "category__btn--selected" : ""
              }`}
              onClick={() => setSelectedCategory("cafe")}
            >
              Cafes
            </button>
            <button
              className={`category__btn ${
                selectedCategory === "restaurant"
                  ? "category__btn--selected"
                  : ""
              }`}
              onClick={() => setSelectedCategory("restaurant")}
            >
              Restaurants
            </button>
          </div>
        </div>

        {!places ? (
          <p>Loading places...</p>
        ) : (
          <PlacesList
            className="places-page__list"
            places={places}
            category={selectedCategory}
            onPlaceClick={handlePlaceClick}
          />
        )}
      </div>

      <div className="places-page__map-container">
        <BaseMap places={places} midLat={midLat} midLon={midLon} selectedPlace={selectedPlace} />
      </div>
    </div>
  );
}

export default PlacesPage;
