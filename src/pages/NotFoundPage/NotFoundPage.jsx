import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss"

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <p className="not-found-page__message">404 Error: Page Not Found</p>
      <button
        className="not-found-page__back-btn"
        onClick={() => navigate("/")}
      >
        {" "}
        Go To Home Page
      </button>
    </div>
  );
}

export default NotFoundPage;
