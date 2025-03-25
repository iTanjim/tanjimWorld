// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import ReactCountryFlag from "react-country-flag";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();

  const formateDate = (date) =>
    new Intl.DateTimeFormat("en", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    }).format(new Date(date));
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState("");

  //flagStyle
  const flagStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    objectFit: "cover",
    left: 0,
    top: 0,
    opacity: 0.1,
    zIndex: -1,
    borderRadius: "7px",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingGeocoding(true);
        const result = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await result.json();
        setCityName(data.city || data.locality || "Not Found");
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (err) {
        throw new Error(err);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchData();
  }, [lat, lng]);

  return (
    <form className={styles.form}>
      <ReactCountryFlag countryCode={emoji} svg style={flagStyle} />
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />

        <span className={styles.flag}>
          <ReactCountryFlag countryCode={emoji} svg />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={formateDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
