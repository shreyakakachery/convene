import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import RoutesPage from "./pages/RoutesPage/RoutesPage.jsx";
import StopsPage from "./pages/StopsPage/StopsPage.jsx";
import PlacesPage from "./pages/PlacesPage/PlacesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__pages">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/stops" element={<StopsPage />} />
            <Route path="/places" element={<PlacesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
