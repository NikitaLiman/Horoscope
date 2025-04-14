import React from "react";
import styles from "../styles/DayToogle.module.scss";

interface DaysToggleProps {
  days: 3 | 7;
  onToggle: () => void;
}

const DaysToggle: React.FC<DaysToggleProps> = ({ days, onToggle }) => {
  return (
    <div className={styles.daysToggle}>
      <button
        className={`${styles.toggleButton} ${days === 3 ? styles.active : ""}`}
        onClick={onToggle}
      >
        3 дні
      </button>
      <button
        className={`${styles.toggleButton} ${days === 7 ? styles.active : ""}`}
        onClick={onToggle}
      >
        7 днів
      </button>
    </div>
  );
};

export default DaysToggle;
