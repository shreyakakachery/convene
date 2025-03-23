import { clearLocalStorageExcept } from "../../scripts/helpers.js";
import { useState } from "react";
import AddressForm from "../../components/AddressForm/AddressForm.jsx";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import "./HomePage.scss";

function HomePage() {
  const [_addressA, setAddressA] = useState("");
  const [_addressB, setAddressB] = useState("");

  clearLocalStorageExcept(["addressA", "addressB"]);

  return (
    <div className="home-page">
      <div className="home-page__map-container">
        <BaseMap />
      </div>
      <div className="home-page__form-container">
        <AddressForm setAddressA={setAddressA} setAddressB={setAddressB} />
      </div>
    </div>
  );
}

export default HomePage;
