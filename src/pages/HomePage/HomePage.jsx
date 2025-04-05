import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import "./HomePage.scss";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__map-container">
        <BaseMap />
      </div>
      <div className="home-page__form-container">
        <h2>Instructions</h2>
        <ol>
          <li>Enter Address</li>
          <li>Select a route from each list</li>
          <li>Select an intersection</li>
          <li>Browse places!</li>
        </ol>
        <button
          className="home-page__start-btn"
          onClick={() => navigate("/address")}
        >
          {" "}
          Start
        </button>
      </div>
    </div>
  );
}

export default HomePage;
