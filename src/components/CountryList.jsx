import ReactCountryFlag from "react-country-flag";
import { useCities } from "../contexts/CitiesProvider";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message={"Add your first country by clicking on the map"} />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((item) => item.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((city) => {
        return (
          <CountryItem item={city} key={city.country}>
            <ReactCountryFlag
              countryCode={city.emoji}
              svg
              style={{
                width: "5rem",
                height: "5rem",
              }}
            />
          </CountryItem>
        );
      })}
    </ul>
  );
}

export default CountryList;
