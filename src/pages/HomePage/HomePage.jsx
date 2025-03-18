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

  const [routeA, setRouteA] = useState(null);
  const [routeB, setRouteB] = useState(null);
  const [stopA, setStopA] = useState(null);
  const [stopB, setStopB] = useState(null);

  const [midLat, setMidLat] = useState(null);
  const [midLon, setMidLon] = useState(null);

  // Handle the route selection submission from RoutesList
  const handleSelection = (
    selectedRouteA,
    selectedRouteB,
    selectedStopA,
    selectedStopB
  ) => {
    setRouteA(selectedRouteA);
    setRouteB(selectedRouteB);
    setStopA(selectedStopA);
    setStopB(selectedStopB);
  };

  const handleMidpointSelection = (lat, lon) => {
    setMidLat(lat);
    setMidLon(lon);
  };

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
    if (!routeA || !routeB || !stopA || !stopB) {
      console.warn("fetchStopPairs skipped: missing route or stop values");
      return;
    }

    try {
      const encodedRouteA = encodeURIComponent(routeA);
      const encodedRouteB = encodeURIComponent(routeB);

      const response = await axios.get(
        `${BACKEND_URL}/stops?routeA=${encodedRouteA}&originStopA=${stopA}&routeB=${encodedRouteB}&originStopB=${stopB}`
      );

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
      const encodedMidLat = encodeURIComponent(midLat);
      const encodedMidLon = encodeURIComponent(midLon);

      const response = await axios.get(
        `${BACKEND_URL}/places?lat=${encodedMidLat}&lon=${encodedMidLon}`
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
    if (routeA && routeB && stopA && stopB) {
      fetchStopPairs();
    }
  }, [routeA, routeB, stopA, stopB]);

  useEffect(() => {
    if (midLat && midLon) {
      fetchPlaces();
    }
  }, [midLat, midLon]);

  return (
    <div>
      <p>HomePage.jsx</p>

      <h1>Address Form</h1>
      <AddressForm setAddressA={setAddressA} setAddressB={setAddressB} />

      {/* for testing */}
      <h2>Submitted Addresses:</h2>
      <p>Address A: {addressA}</p>
      <p>Address B: {addressB}</p>

      {!routes ? (
        <p>Loading routes...</p>
      ) : (
        <RoutesList routes={routes} onSubmitSelection={handleSelection} />
      )}
      {!stopPairs ? (
        <p>Loading stop pairs...</p>
      ) : (
        <StopPairsList
          stopPairs={stopPairs}
          onSelectMidpoint={handleMidpointSelection}
        />
      )}
      <p>
        <strong>Selected Midpoint:</strong>{" "}
        {midLat && midLon ? `(${midLat}, ${midLon})` : "None selected"}
      </p>
      {!places ? <p>Loading places...</p> : <PlacesList places={places} />}
    </div>
  );
}

export default HomePage;
