import styles from "./CountryItem.module.css";

function CountryItem({ item, children }) {
  const { country, emoji } = item;
  return (
    <li className={styles.countryItem}>
      {children}
      <p>{country}</p>
    </li>
  );
}

export default CountryItem;
