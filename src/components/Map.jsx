import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
function Map() {
  const navigate = useNavigate();
  const { cities, mapPosition } = useCities();
  console.log(cities);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city, i) => {
          const { position, notes } = city;
          return (
            <Marker position={[position.lat, position.lng]} key={city.id}>
              <Popup>{notes}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
