import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import World from "../components/World";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <div className={styles.dih}>
          <h1 className={styles.mainHead}>You travel the world.</h1>
          <br />
          <h1 className={styles.secondHead}>
            <span className={styles.logoText}>VISTORIES</span> keeps track of
            your adventures.
          </h1>
        </div>
        <div>
          <World />
        </div>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
