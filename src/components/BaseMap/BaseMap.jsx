import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BaseMap = () => {
  const position = [49.23205052720926, -123.08916193141513]; // Vancouver coordinates

  return (
    <MapContainer
      center={position}
      zoom={11}
      style={{ height: "100vh", width: "100vw" }}
    >
      {/* Streets Tile Layer */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors'
      />

      {/* Bus Routes Tile Layer */}
      {/* <TileLayer
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; OpenStreetMap contributors'
      /> */}

      {/* Transit Routes Tile Layer */}
      {/* <TileLayer
        url="https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> & contributors'
      /> */}

      {/* Marker */}
      {/* <Marker position={position}>
        <Popup>Vancouver, BC</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default BaseMap;
