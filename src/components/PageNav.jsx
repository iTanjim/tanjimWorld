import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";

function PageNav() {
  const underlineRef = useRef(null);
  const navRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const activeItem = document.querySelector(".active");
    const activeOffsetLeft = activeItem.offsetLeft;
    const activeOffsetWidth = activeItem.offsetWidth;

    underlineRef.current.style.left = `${activeOffsetLeft}px`;
    underlineRef.current.style.width = `${activeOffsetWidth}px`;
    console.log("render");
  }, [windowWidth]);

  const handleHover = (e) => {
    const { offsetLeft, offsetWidth } = e.target;
    underlineRef.current.style.left = `${offsetLeft}px`;
    underlineRef.current.style.width = `${offsetWidth}px`;
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul ref={navRef}>
        <li onMouseEnter={handleHover}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li onMouseEnter={handleHover}>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li onMouseEnter={handleHover}>
          <NavLink to="/login" className={`ctaLink ${styles.login}`}>
            Login
          </NavLink>
        </li>
        <div className={styles.movingLine} ref={underlineRef}></div>
      </ul>
      <div
        className={`${styles.burger} ${clicked ? styles.clicked : ""}`}
        onClick={() => {
          const currDisplay = navRef.current.style.display;
          navRef.current.style.display =
            currDisplay === "flex" ? "none" : "flex";
          setClicked((prev) => !prev);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default PageNav;
