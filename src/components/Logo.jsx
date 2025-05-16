import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/" className={styles.link}>
        <div className={styles.logo}>
          <img
            src="/iconpb.png"
            alt="WorldWise logo"
            className={styles.logoIcon}
          />
          <h1>VISTORIES</h1>
        </div>
      </Link>
    </>
  );
}

export default Logo;
