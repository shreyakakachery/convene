import { clearLocalStorageExcept } from "../../scripts/helpers.js";
import { useState } from "react";
import AddressForm from "../../components/AddressForm/AddressForm.jsx";
import BaseMap from "../../components/BaseMap/BaseMap.jsx";
import "./AddressPage.scss";

function AddressPage() {
  const [_addressA, setAddressA] = useState("");
  const [_addressB, setAddressB] = useState("");

  clearLocalStorageExcept(["addressA", "addressB"]);

  return (
    <div className="address-page">
      <div className="address-page__map-container">
        <BaseMap />
      </div>
      <div className="address-page__form-container">
        <AddressForm setAddressA={setAddressA} setAddressB={setAddressB} />
        <p>AddressPage.jsx</p>
      </div>
    </div>
  );
}

export default AddressPage;
