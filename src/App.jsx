import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.scss";

function App() {
  return (
    <div>
      <BrowserRouter>
        <p>App.jsx</p>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
