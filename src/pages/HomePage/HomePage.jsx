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
      <div className="home-page__info-container">
        <h1 className="home-page__slogan">Meeting in the middle, made easy.</h1>

        <h2 className="home-page__instructions-title">HOW TO USE:</h2>
        <div className="home-page__instructions-box">
          <div>
            <h3 className="home-page__step">1 Enter Starting Locations</h3>
            <h4 className="home-page__step-info">
              🔎 Your address & your friends address.
            </h4>
          </div>
          <div>
            <h3 className="home-page__step">2 Select Routes</h3>
            <h4 className="home-page__step-info">
              🚌 Pick a nearby route from each location.
            </h4>
            {/* <h4 className="home-page__step-info">
              🗺 visualize nearby routes on the map
            </h4> */}
          </div>
          <div>
            <h3 className="home-page__step">3 Select Intersection</h3>
            <h4 className="home-page__step-info">
              🚏 This shows where each of you will get off.
            </h4>
          </div>
          <div>
            <h3 className="home-page__step">4 Browse Places</h3>
            <h4 className="home-page__step-info">
              ☕ Explore cafes & restaurants around your intersection.
            </h4>
          </div>
          <div>
            <h3 className="home-page__step">5 Give Feedback</h3>
            <h4 className="home-page__step-info">
              💖 What did you like about this website?
            </h4>
            <h4 className="home-page__step-info">⚒ What can be improved?</h4>
            <h4 className="home-page__step-info">
              💭 Let me know what you think!
            </h4>
          </div>
        </div>

        <button
          className="home-page__start-btn"
          onClick={() => navigate("/address")}
        >
          {" "}
          Let's Go!
        </button>
      </div>
    </div>
  );
}

export default HomePage;
