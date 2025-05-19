import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import styles from "./World.module.css";
import { useCities } from "../contexts/CitiesProvider";

const World = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { cities } = useCities();
  const globeRef = useRef();

  // Responsive screen width tracking
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load country data
  useEffect(() => {
    const getCountryData = async () => {
      const result = await fetch("/datasets/ne_110m_admin_0_countries.geojson");
      const data = await result.json();
      setCountries(data);
    };
    getCountryData();
  }, []);

  // Globe setup
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().enableZoom = false;
      globeRef.current.camera().position.z = 280;
    }
  }, []);

  const globeSize = windowWidth <= 425 ? 350 : 500;

  return (
    <div className={styles.globeBg}>
      <Globe
        ref={globeRef}
        height={globeSize}
        width={globeSize}
        globeImageUrl=" //cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        hexPolygonsData={countries.features}
        backgroundColor="rgba(0,0,0,0)"
        hexPolygonResolution={3}
        hexPolygonMargin={0.05}
        hexPolygonUseDots={true}
        hexPolygonColor={() =>
          [
            "#480ca8",
            "#6930c3",
            "#5e60ce",
            "#5390d9",
            "#4895ef",
            "#64dfdf",
            "teal",
          ][5]
        }
      />
    </div>
  );
};

export default World;
