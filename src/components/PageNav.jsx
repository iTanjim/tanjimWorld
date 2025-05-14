import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useEffect, useRef } from "react";

function PageNav() {
  const underlineRef = useRef(null);

  useEffect(() => {
    const activeItem = document.querySelector(".active");
    const activeOffsetLeft = activeItem.offsetLeft;
    const activeOffsetWidth = activeItem.offsetWidth;

    underlineRef.current.style.left = `${activeOffsetLeft}px`;
    underlineRef.current.style.width = `${activeOffsetWidth}px`;
  }, []);

  const handleHover = (e) => {
    const { offsetLeft, offsetWidth } = e.target;
    underlineRef.current.style.left = `${offsetLeft}px`;
    underlineRef.current.style.width = `${offsetWidth}px`;
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
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
    </nav>
  );
}

export default PageNav;
