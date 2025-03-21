import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressForm.scss";
import axios from "axios";

function AddressForm({ setAddressA, setAddressB }) {
  const [addressA, setAddressAInput] = useState(
    localStorage.getItem("addressA") || ""
  );
  const [addressB, setAddressBInput] = useState(
    localStorage.getItem("addressB") || ""
  );
  const [addressSuggestionsA, setAddressSuggestionsA] = useState([]);
  const [addressSuggestionsB, setAddressSuggestionsB] = useState([]);
  const [errors, setErrors] = useState({ addressA: "", addressB: "" });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("addressA", addressA);
  }, [addressA]);

  useEffect(() => {
    localStorage.setItem("addressB", addressB);
  }, [addressB]);

  const fetchAddressSuggestions = async (input, field) => {
    if (!input.trim()) {
      return;
    }

    try {
      const response = await axios.get(
        `https://photon.komoot.io/api/?q=${input}&lang=en&bbox=-123.5,49.0,-122.3,49.4`
      );
      // console.log("API Response:", response.data); // Log the API response
      // Ensure the 'features' array exists and extract address information from properties
      const suggestions = response.data.features
        ? response.data.features.map((feature) => {
            const { name, housenumber, street, city, state, postcode } =
              feature.properties;

            // Build a full address string that includes name, housenumber, and street (if available)
            let address = name ? `${name}` : ""; // Add name if it's available
            if (housenumber && street) {
              address += ` - ${housenumber} ${street}`; // Add street and house number
            }

            // Ensure a space between street address and city, and then add city, state, and postcode
            const locationDetails = [city, state, postcode]
              .filter(Boolean)
              .join(", ");
            if (locationDetails) {
              address += ` ${locationDetails}`;
            }

            return address;
          })
        : [];

      if (field === "addressA") {
        setAddressSuggestionsA(suggestions);
      } else if (field === "addressB") {
        setAddressSuggestionsB(suggestions);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  const fetchTimeoutRef = useRef(null);

  const handleAddressChange = (e, field) => {
    const value = e.target.value;

    if (field === "addressA") {
      setAddressAInput(value);
    } else if (field === "addressB") {
      setAddressBInput(value);
    }

    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(() => {
      fetchAddressSuggestions(value, field);
    }, 500);

    if (value.trim() === "") {
      if (field === "addressA") {
        setAddressSuggestionsA([]);
      } else if (field === "addressB") {
        setAddressSuggestionsB([]);
      }
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { addressA: "", addressB: "" };

    if (!addressA.trim()) {
      newErrors.addressA = "Address required";
    }

    if (!addressB.trim()) {
      newErrors.addressB = "Address required";
    }

    setErrors(newErrors);

    if (newErrors.addressA || newErrors.addressB) {
      return;
    }

    setAddressA(addressA);
    setAddressB(addressB);
    navigate("/routes", { state: { addressA, addressB } });
  };

  const handleSuggestionSelect = (suggestion, field) => {
    if (field === "addressA") {
      setAddressAInput(suggestion);
      setAddressSuggestionsA([]);
    } else if (field === "addressB") {
      setAddressBInput(suggestion);
      setAddressSuggestionsB([]);
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h2 className="address-form__title">Starting Locations</h2>
      <div className="address-form__inputs-box">
        <div className="address-form__box">
          <label className="address-form__label">Starting Address A:</label>
          <input
            className={`address-form__input ${
              errors.addressA ? "address-form__input--error" : ""
            }`}
            type="text"
            value={addressA}
            onChange={(e) => handleAddressChange(e, "addressA")}
            placeholder="Enter Address"
          />
          {errors.addressA && (
            <p className="address-form__error">{errors.addressA}</p>
          )}

          {addressSuggestionsA.length > 0 && (
            <ul className="address-form__suggestions">
              {addressSuggestionsA.map((suggestion, index) => (
                <li
                  key={index}
                  className="address-form__suggestion"
                  onClick={() => handleSuggestionSelect(suggestion, "addressA")}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="address-form__box">
          <label className="address-form__label address-form__label--user-b">
            Starting Address B:
          </label>
          <input
            className={`address-form__input address-form__input--user-b ${
              errors.addressB ? "address-form__input--error" : ""
            }`}
            type="text"
            value={addressB}
            onChange={(e) => handleAddressChange(e, "addressB")}
            placeholder="Enter Address"
          />
          {errors.addressB && (
            <p className="address-form__error">{errors.addressB}</p>
          )}

          {addressSuggestionsB.length > 0 && (
            <ul className="address-form__suggestions">
              {addressSuggestionsB.map((suggestion, index) => (
                <li
                  key={index}
                  className="address-form__suggestion"
                  onClick={() => handleSuggestionSelect(suggestion, "addressB")}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className="address-form__button" type="submit">
        Get Routes
      </button>
    </form>
  );
}

export default AddressForm;
