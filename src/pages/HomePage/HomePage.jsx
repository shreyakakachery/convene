import { clearLocalStorageExcept } from "../../scripts/helpers.js";
import { useState } from "react";

import AddressForm from "../../components/AddressForm/AddressForm.jsx";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import "./HomePage.scss";

function HomePage() {
  const [addressA, setAddressA] = useState("");
  const [addressB, setAddressB] = useState("");

  clearLocalStorageExcept(["addressA", "addressB"]);

  return (
    // <div>
    //   <AddressForm setAddressA={setAddressA} setAddressB={setAddressB} />
    //   <BaseMap />
    // </div>

    <div className="home-container">
      <div className="map-container">
        <BaseMap />
      </div>
      <div className="form-container">
        <AddressForm setAddressA={setAddressA} setAddressB={setAddressB} />
      </div>
    </div>
  );
}

export default HomePage;
