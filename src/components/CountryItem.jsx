import styles from "./CountryItem.module.css";

function CountryItem({ item }) {
  const { country, emoji } = item;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <p>{country}</p>
    </li>
  );
}

export default CountryItem;
