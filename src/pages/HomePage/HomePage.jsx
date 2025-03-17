import { BACKEND_URL } from "../../scripts/config.js";
import { useState, useEffect } from "react";
import axios from "axios";

import RoutesList from "../../components/RoutesList/RoutesList.jsx";
import StopPairsList from "../../components/StopPairsList/StopPairsList.jsx";
import PlacesList from "../../components/PlacesList/PlacesList.jsx";

function HomePage() {
  const [routes, setRoutes] = useState(null);
  const [stopPairs, setStopPairs] = useState(null);
  const [places, setPlaces] = useState(null);

  //   get nearby routes

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/routes?locA=2329%20West%20Mall&locB=3551%20Foster%20Avenue`
      );

      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  //   useEffect(() => {
  //     fetchRoutes();
  //   }, []);

//   if (!routes) {
//     return <div>Loading nearby routes...</div>;
//   }

  //   get stop pairs

  const fetchStopPairs = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/stops?routeA=R4%2041ST%20Avenue/To%20Joyce%20Station&originStopA=1896&routeB=Expo%20Line%20To%20Waterfront&originStopB=8069`
      );
      // const response = await axios.get(`${BACKEND_URL}/stops`);
      // setStopPairs(response.data);

      //
      //

      // if only one stop pair
      const dynamicKey = Object.keys(response.data)[0]; // Get the first key dynamically
      // console.log("Dynamic Key:", dynamicKey); // Debugging: Check what key is returned
      setStopPairs(response.data[dynamicKey]);

      //
      //

      // for more than one stop pair
      const allStopPairs = Object.keys(response.data).flatMap(
        (key) => response.data[key]
      ); // Combine all arrays into one

      // console.log("All Stop Pairs:", allStopPairs); // Debugging: Check the structure

      setStopPairs(allStopPairs); // Store all stop pairs in state
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchStopPairs();
    fetchPlaces();
  }, []);

//   if (!stopPairs) {
//     return <div>Loading stop pairs...</div>;
//   }

  //   get places

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/places?lat=49.2344841&lon=-123.1543581`);
        // const response = await axios.get(`${BACKEND_URL}/places`);
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

  //   useEffect(() => {
  //     fetchPlaces();
  //   }, []);

  //   if (!places) {
  //     return <div>Loading places...</div>;
  //   }

  return (
    <div>
      <p>HomePage.jsx</p>
      {!routes ? <p>Loading routes...</p> : <RoutesList routes={routes} />}
      {!stopPairs ? <p>Loading stop pairs...</p> : <StopPairsList stopPairs={stopPairs} />}
      {!places ? <p>Loading places...</p> : <PlacesList places={places} />}
    </div>
  );
}

export default HomePage;
