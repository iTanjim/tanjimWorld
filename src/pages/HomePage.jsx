import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import World from "../components/World";
import TextCard from "../components/TextCard";
import { useState } from "react";

export default function Homepage() {
  const [inFront, setInFront] = useState(false);
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <div className={styles.dih}>
          <h1 className={styles.mainHead}>You travel the world.</h1>
          <br />
          <h1>
            <span className={styles.logoText}>WorldWise</span> keeps track of
            your adventures.
          </h1>
        </div>
        <div>
          <World />
        </div>
        <Link to="/login" className="cta">
          Start tarcking now
        </Link>
        <div
          className={`${styles.textContA} ${
            inFront ? styles.front : styles.behind
          }`}
          onClick={() => setInFront((state) => !state)}
        >
          <TextCard>
            A world map that captures every city you’ve stepped into. Keep your
            memories alive, relive your adventures, and share your journey with
            friends as you leave your footprints across the globe
          </TextCard>
        </div>
        <div
          className={`${styles.textContB} ${
            !inFront ? styles.front : styles.behind
          }`}
          onClick={() => setInFront((state) => !state)}
        >
          <TextCard>
            A world map that captures every city you’ve stepped into. Keep your
            memories alive, relive your adventures, and share your journey with
            friends as you leave your footprints across the globe
          </TextCard>
        </div>
      </section>
    </main>
  );
}
