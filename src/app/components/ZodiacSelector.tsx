"use client";
import { useState } from "react";
import { Zodiac } from "../../../types";
import styles from "../styles/ZodiacSelector.module.scss";
import { ZODIAC_INFO } from "../utils/zodiacData";

interface ZodiacSelectorProps {
  currentZodiac: Zodiac;
  onZodiacChange: (zodiac: Zodiac) => void;
}

const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({
  currentZodiac,
  onZodiacChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (zodiac: Zodiac) => {
    onZodiacChange(zodiac);
    setIsOpen(false);
  };

  return (
    <div className={styles.zodiacSelector}>
      <div className={styles.selectedZodiac} onClick={() => setIsOpen(!isOpen)}>
        <i>{ZODIAC_INFO[currentZodiac].icon}</i>
        <span>{ZODIAC_INFO[currentZodiac].ukrName}</span>
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {Object.entries(ZODIAC_INFO).map(([key, info]) => {
            console.log(currentZodiac, key);
            return (
              <div
                key={key}
                className={`${styles.zodiacOption} ${
                  currentZodiac === key ? styles.active : ""
                }`}
                onClick={() => handleSelect(key as Zodiac)}
              >
                <i>{info.icon}</i>
                <span>{info.ukrName}</span>
                <small>{info.dates}</small>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ZodiacSelector;
