import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [mapZoom, setMapZoom] = useState(10);
  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation(mapPosition);

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
      } else console.log("Hello");
    },
    [mapLat, mapLng]
  );

  useEffect(() => {
    if (geolocationPosition) setMapPosition(geolocationPosition);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use my location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={mapZoom}
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
        <ChangeMap
          position={mapPosition}
          zoom={mapZoom}
          setMapZoom={setMapZoom}
        />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeMap({ position, zoom }) {
  const map = useMap();
  map.setView(position, zoom);
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
