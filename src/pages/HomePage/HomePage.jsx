import { BACKEND_URL } from "../../scripts/config.js";
import { useState, useEffect } from "react";
import axios from "axios";

import AddressForm from "../../components/AddressForm/AddressForm.jsx";
import RoutesList from "../../components/RoutesList/RoutesList.jsx";
import StopPairsList from "../../components/StopPairsList/StopPairsList.jsx";
import PlacesList from "../../components/PlacesList/PlacesList.jsx";

function HomePage() {
  const [addressA, setAddressA] = useState("");
  const [addressB, setAddressB] = useState("");
  const [routes, setRoutes] = useState(null);
  const [stopPairs, setStopPairs] = useState(null);
  const [places, setPlaces] = useState(null);

  //   get nearby routes
  const fetchRoutes = async () => {
    try {
      const encodedAddressA = encodeURIComponent(addressA);
      const encodedAddressB = encodeURIComponent(addressB);

      const response = await axios.get(
        `${BACKEND_URL}/routes?locA=${encodedAddressA}&locB=${encodedAddressB}`
      );

      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  //   get stop pairs
  const fetchStopPairs = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/stops?routeA=R4%2041ST%20Avenue/To%20Joyce%20Station&originStopA=1896&routeB=Expo%20Line%20To%20Waterfront&originStopB=8069`
      );
      // setStopPairs(response.data);

      //

      // if only one stop pair
      const dynamicKey = Object.keys(response.data)[0]; // Get the first key dynamically
      // console.log("Dynamic Key:", dynamicKey); // Debugging: Check what key is returned
      setStopPairs(response.data[dynamicKey]);

      // for more than one stop pair
      const allStopPairs = Object.keys(response.data).flatMap(
        (key) => response.data[key]
      ); // Combine all arrays into one

      // console.log("All Stop Pairs:", allStopPairs); // Debugging: Check the structure

      setStopPairs(allStopPairs); // Store all stop pairs in state
    } catch (error) {
      console.error("Error fetching stop pairs:", error);
    }
  };

  //   get places
  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/places?lat=49.2344841&lon=-123.1543581`
      );
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    if (addressA && addressB) {
      fetchRoutes();
    }
  }, [addressA, addressB]);

  useEffect(() => {
    fetchStopPairs();
    fetchPlaces();
  }, []);

  return (
    <div>
      <p>HomePage.jsx</p>

      <h1>Address Form</h1>
      <AddressForm setAddressA={setAddressA} setAddressB={setAddressB} />

      <h2>Submitted Addresses:</h2>
      <p>Address A: {addressA}</p>
      <p>Address B: {addressB}</p>

      {!routes ? <p>Loading routes...</p> : <RoutesList routes={routes} />}
      {/* {!stopPairs ? (
        <p>Loading stop pairs...</p>
      ) : (
        <StopPairsList stopPairs={stopPairs} />
      )} */}
      {/* {!places ? <p>Loading places...</p> : <PlacesList places={places} />} */}
    </div>
  );
}

export default HomePage;
