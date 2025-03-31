import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = new L.divIcon({
  className: "custom-icon",
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="#d87093">
      <path d="M12 17.27l5.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03z"/>
    </svg>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const BaseMap = ({
  coordsA,
  coordsB,
  places = [],
  midLat,
  midLon,
  selectedPlace,
}) => {
  const defaultPosition = [49.23205052720926, -123.08916193141513]; // Vancouver

  // const mapCenter = midLat && midLon ? [midLat, midLon] : defaultPosition;

  const zoomLevel = places?.length >= 1 ? 16 : 11; // map tile 16 for 500m radius

  const mapCenter =
    coordsA && coordsB
      ? [(coordsA.lat + coordsB.lat) / 2, (coordsA.lon + coordsB.lon) / 2]
      : midLat && midLon
      ? [midLat, midLon]
      : defaultPosition;

  // const zoomLevel = coordsA && coordsB ? 10 : places?.length >= 1 ? 16 : 11;

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

      {/* Circle Markers for coordsA and coordsB */}
      {coordsA && (
        <CircleMarker
          center={[coordsA.lat, coordsA.lon]}
          color="blue"
          radius={10}
        >
          <Popup>{coordsA.address}</Popup>
        </CircleMarker>
      )}
      {coordsB && (
        <CircleMarker
          center={[coordsB.lat, coordsB.lon]}
          color="green"
          radius={10}
        >
          <Popup>{coordsB.address}</Popup>

        </CircleMarker>
      )}

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
