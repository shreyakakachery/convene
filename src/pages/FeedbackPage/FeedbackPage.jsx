import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm.jsx";
import "./FeedbackPage.scss";

function FeedbackPage() {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     localStorage.clear();
  //   }, []);

  return (
    <div className="feedback-page">
      <div className="feedback-page__map-container">
        <BaseMap />
      </div>
      <div className="feedback-page__info-container">
        <button
          className="feedback-page__start-btn"
          onClick={() => navigate("/")}
        >
          {" "}
          Back to Home Page
        </button>
        <FeedbackForm />
      </div>
    </div>
  );
}

export default FeedbackPage;
