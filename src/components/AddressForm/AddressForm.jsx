import React, { useState } from 'react';

const AddressForm = ({ setAddressA, setAddressB }) => {
  const [addressA, setAddressAInput] = useState('');
  const [addressB, setAddressBInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddressA(addressA);  // Pass addressA to parent
    setAddressB(addressB);  // Pass addressB to parent
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddressForm;
