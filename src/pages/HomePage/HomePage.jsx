import { clearLocalStorageExcept } from "../../scripts/helpers.js";
import { useState } from "react";

import AddressForm from "../../components/AddressForm/AddressForm.jsx";

function HomePage() {
  const [addressA, setAddressA] = useState("");
  const [addressB, setAddressB] = useState("");

  clearLocalStorageExcept(["addressA", "addressB"]);

  return (
    <div>
      <AddressForm setAddressA={setAddressA} setAddressB={setAddressB} />
    </div>
  );
}

export default HomePage;
