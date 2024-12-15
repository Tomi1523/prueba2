import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PropertyMapProps } from "../interfaces/types";

const UpdateMapView: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const PropertyMap: React.FC<PropertyMapProps> = ({ center, zoom, address }) => {
  return (
    <div className="mt-5">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <UpdateMapView center={center} zoom={zoom} />
        <Marker position={center}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
