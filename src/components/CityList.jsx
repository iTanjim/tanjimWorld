import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesProvider";
import ReactCountryFlag from "react-country-flag";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map"} />;
  // console.log(cities);
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return (
          <CityItem city={city} key={city.id}>
            <ReactCountryFlag
              countryCode={city.emoji}
              svg
              style={{
                width: "3rem",
                height: "3rem",
              }}
            />
          </CityItem>
        );
      })}
    </ul>
  );
}

export default CityList;
