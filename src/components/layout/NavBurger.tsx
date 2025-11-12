// actual burger menu component
import type React from "react";
import styles from '../layout/navburger.module.css'

// props allw parent to control open state
interface NavBurgerProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

export const NavBurger: React.FC<NavBurgerProps> = ({ isOpen, toggleMenu }) => {
    return (
        <div
        // check if its open to apply styles
      className={`${styles.burger} ${isOpen ? styles.open : ""}`}
      // toggle state on click
      onClick={toggleMenu}
    >
      <div />
      <div />
      <div />
    </div>
    );
};