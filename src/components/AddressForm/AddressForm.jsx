import React, { useState } from "react";

// to do list:
// add form validation
// add reusable button component

const AddressForm = ({ setAddressA, setAddressB }) => {
  const [addressA, setAddressAInput] = useState("");
  const [addressB, setAddressBInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // send addresses to HomePage
    setAddressA(addressA);
    setAddressB(addressB);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Address A:</label>
        <input
          type="text"
          value={addressA}
          onChange={(e) => setAddressAInput(e.target.value)}
          placeholder="Enter Address A"
        />
      </div>
      <div>
        <label>Address B:</label>
        <input
          type="text"
          value={addressB}
          onChange={(e) => setAddressBInput(e.target.value)}
          placeholder="Enter Address B"
        />
      </div>
      {/* add reusable button component here */}
      <button type="submit">Get Routes</button>
    </form>
  );
};

export default AddressForm;
