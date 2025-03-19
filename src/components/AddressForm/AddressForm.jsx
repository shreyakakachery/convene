import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressForm.scss";

// to do list:
// add form validation

const AddressForm = ({ setAddressA, setAddressB }) => {
  const [addressA, setAddressAInput] = useState("");
  const [addressB, setAddressBInput] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddressA(addressA);
    setAddressB(addressB);
    // navigate("/test", {state: {addressA, addressB}}) // to send to next page upon click, plus pass props
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <div className="address-form__box">
        <label className="address-form__label">Address A:</label>
        <input
          className="address-form__input address-form__input--user-a"
          type="text"
          value={addressA}
          onChange={(e) => setAddressAInput(e.target.value)}
          placeholder="Enter Address A"
        />
      </div>
      <div className="address-form__box">
        <label className="address-form__label">Address B:</label>
        <input
          className="address-form__input address-form__input--user-b"
          type="text"
          value={addressB}
          onChange={(e) => setAddressBInput(e.target.value)}
          placeholder="Enter Address B"
        />
      </div>
      <button className="address-form__button" type="submit">
        Get Routes
      </button>
    </form>
  );
};

export default AddressForm;
