import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

const BaseMap = ({ places = [], midLat, midLon }) => {
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
          <Marker key={place.id} position={[place.lat, place.lon]}>
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
