import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// const selectedIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconSize: [30, 50],
//   iconAnchor: [15, 50],
// });

// const selectedIcon = new L.divIcon({
//   className: "star-icon",
//   html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
//            <polygon points="16,0 20,12 32,12 22,20 26,32 16,24 6,32 10,20 0,12 12,12" fill="#06402b"/>
//          </svg>`,
//   iconSize: [50, 50], // Size of the marker
//   iconAnchor: [16, 32],
// });

const selectedIcon = new L.divIcon({
  className: "custom-icon",
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="#d87093">
      <path d="M12 17.27l5.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03z"/>
    </svg>`,
  iconSize: [30, 30], // You can adjust the size as needed
  iconAnchor: [15, 30], // Adjust the anchor position
});

const BaseMap = ({ places = [], midLat, midLon, selectedPlace }) => {
  const defaultPosition = [49.23205052720926, -123.08916193141513]; // Vancouver

  const mapCenter = midLat && midLon ? [midLat, midLon] : defaultPosition;

  const zoomLevel = places?.length >= 1 ? 16 : 11; // map tile 16 for 500m radius

  const UpdateMapView = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(center, zoom);
    }, [mapCenter, zoomLevel, map]);

    return null;
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors'
      />

      <UpdateMapView center={mapCenter} zoom={zoomLevel} />

      {places?.length >= 1 &&
        places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={
              selectedPlace &&
              selectedPlace.lat === place.lat &&
              selectedPlace.lon === place.lon
                ? selectedIcon
                : defaultIcon
            }
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.address}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default BaseMap;
