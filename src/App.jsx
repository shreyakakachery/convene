

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.scss";

function App() {
  // const [routes, setRoutes] = useState(null);
  // const [stopPairs, setStopPairs] = useState(null);
  // const [places, setPlaces] = useState(null);

  //
  //
  // get places
  //
  //

  //console.log("before:", places);

  // const fetchPlaces = async () => {
  //   try {
  //     const response = await axios.get(`${BACKEND_URL}/places?lat=49.2344841&lon=-123.1543581`);
  //     // const response = await axios.get(`${BACKEND_URL}/places`);
  //     setPlaces(response.data);
  //   } catch (error) {
  //     console.error("Error fetching places:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPlaces();
  // }, []);

  // if (!places) {
  //   return <div>Loading places...</div>;
  // }

  //console.log("after:", places);

  //
  //
  // get stop pairs
  //
  //

  // console.log("before:", stopPairs);

  // const fetchStopPairs = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BACKEND_URL}/stops?routeA=R4%2041ST%20Avenue/To%20Joyce%20Station&originStopA=1896&routeB=Expo%20Line%20To%20Waterfront&originStopB=8069`
  //     );
  //     // const response = await axios.get(`${BACKEND_URL}/stops`);
  //     // setStopPairs(response.data);

  //     //
  //     //

  //     // if only one stop pair
  //     const dynamicKey = Object.keys(response.data)[0]; // Get the first key dynamically
  //     console.log("Dynamic Key:", dynamicKey); // Debugging: Check what key is returned
  //     setStopPairs(response.data[dynamicKey]);

  //     //
  //     //

  //     // for more than one stop pair
  //     const allStopPairs = Object.keys(response.data).flatMap((key) => response.data[key]); // Combine all arrays into one

  //     console.log("All Stop Pairs:", allStopPairs); // Debugging: Check the structure

  //     setStopPairs(allStopPairs); // Store all stop pairs in state

  //   } catch (error) {
  //     console.error("Error fetching places:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchStopPairs();
  // }, []);

  // if (!stopPairs) {
  //   return <div>Loading stop pairs...</div>;
  // }

  // console.log("after:", stopPairs);

  //
  //
  // get nearby routes
  //
  //

  // console.log("before:", routes);

  // const fetchRoutes = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BACKEND_URL}/routes?locA=2329%20West%20Mall&locB=3551%20Foster%20Avenue`
  //     );

  //     setRoutes(response.data);
  //   } catch (error) {
  //     console.error("Error fetching places:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchRoutes();
  // }, []);

  // if (!routes) {
  //   return <div>Loading nearby routes...</div>;
  // }

  // console.log("after:", stopPairs);

  return (
    <div>
      <BrowserRouter>
        <p>App.jsx</p>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      {/* <p>App.jsx</p>
      <p>{BACKEND_URL}</p>
      <h1>NEARBY ROUTES</h1>
      {routes.length > 0 ? (
        routes.map((route, routeIndex) => (
          <div key={routeIndex}>
            <h2>Address: {route.address}</h2>

            <h3>Stops:</h3>
            {route.filteredStops.map((stop, stopIndex) => (
              <div
                key={stopIndex}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid gray",
                }}
              >
                <p>
                  <strong>Route:</strong> {stop.route || "N/A"}
                </p>
                <p>
                  <strong>Stop Name:</strong> {stop.stop_name}
                </p>
                <p>
                  <strong>Stop Code:</strong> {stop.stop_code}
                </p>
                <p>
                  <strong>Stop ID:</strong> {stop.stop_id}
                </p>
                <p>
                  <strong>Distance:</strong>{" "}
                  {stop.distance ? `${stop.distance.toFixed(2)} km` : "N/A"}
                </p>
                <p>
                  <strong>Coordinates:</strong> {stop.stop_lat}, {stop.stop_lon}
                </p>
              </div>
            ))}
            <hr />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      <h1>STOP PAIRS</h1> */}
      {/* {stopPairs.length > 0 ? (
        stopPairs.map((stopPair, index) => (
          <div key={index}>
            <h2>Stop Pair {index + 1}</h2>
            <p>
              <strong>Distance:</strong> {stopPair.distance} km
            </p>

            <div>
              <h3>Route A Stop:</h3>
              <p>
                <strong>Route Name:</strong> {stopPair.routeA_stop.route_name}
              </p>
              <p>
                <strong>Stop Name:</strong> {stopPair.routeA_stop.stop_name}
              </p>
              <p>
                <strong>Stop Sequence:</strong>{" "}
                {stopPair.routeA_stop.stop_sequence}
              </p>
            </div>

            <div>
              <h3>Route B Stop:</h3>
              <p>
                <strong>Route Name:</strong> {stopPair.routeB_stop.route_name}
              </p>
              <p>
                <strong>Stop Name:</strong> {stopPair.routeB_stop.stop_name}
              </p>
              <p>
                <strong>Stop Sequence:</strong>{" "}
                {stopPair.routeB_stop.stop_sequence}
              </p>
            </div>

            <hr />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )} */}
      {/* <h1>PLACES</h1>
      <h3>Places Nearby</h3>
      <ul>
        {places && places.length > 0 ? (
          places.map((place, index) => (
            <li key={index}>
              <h2>{place.name}</h2>
              <p>Type: {place.amenity}</p>
              <p>
                Address: {place.number} {place.street}
              </p>
              <p>Location: Latitude {place.lat}, Longitude {place.lon}</p>
              <p>Indoor Seating: {place.indoor_seating}</p>
              <p>Outdoor Seating: {place.outdoor_seating}</p>
            </li>
          ))
        ) : (
          <p>No places found.</p>
        )}
      </ul> */}
    </div>
  );
}

export default App;
