import React from 'react'
import Globe from 'react-globe.gl';
import { useState, useEffect, useRef } from 'react';
import styles from "./World.module.css";
import { useCities } from '../contexts/CitiesProvider';

const World = () => {
  const [countries, setCountries] = useState({ features: []});
  const {cities} = useCities();
  console.log(cities);
  const citiesPos = cities.map(city => {
    return {lat: parseFloat(city.position.lat), lng: parseFloat(city.position.lng), color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 4)], size: 7 + Math.random() * 30, }
  })
  console.log(citiesPos)
  const globeRef = useRef();
  useEffect(() => {
    // load data
  
    const getCountryData = async() => {
      const result = await fetch('/datasets/ne_110m_admin_0_countries.geojson');
      const data = await result.json();
      setCountries(data);
    }
    getCountryData();
  }, []);

  useEffect(() => {
 
    globeRef.current.controls().enableZoom = false;
    globeRef.current.camera().position.z = 280;
   
  }, []);

  const randomColorBetween = (color1, color2) => {
    const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
    const rgbToHex = rgb => '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
  
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
  
    const mix = c1.map((c, i) => Math.round(c + Math.random() * (c2[i] - c)));
  
    return rgbToHex(mix);
  };



  return (
    <div className={styles.globeBg}>
      <Globe
        height={500}
        width={500}
        ref={globeRef}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
        hexPolygonsData={countries.features}
        backgroundColor="rgba(0,0,0,0)"
        hexPolygonResolution={3}
        hexPolygonMargin={0.1}
        hexPolygonUseDots={true}
        // hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
        hexPolygonColor={() =>
          ["#480ca8", "#6930c3", "#5e60ce", "#5390d9", "#4895ef", "#64dfdf"][
            Math.floor(Math.random() * 6)
          ]
        }
        // hexPolygonLabel={({ properties: d }) => <div>
        //   <div><b>{d.ADMIN} ({d.ISO_A2})</b></div>
        //   <div>Population: <i>{d.POP_EST}</i></div>
        // </div>}
      />
    </div>
  );
};

export default World;