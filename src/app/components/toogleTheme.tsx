"use client";
import React from "react";
import styles from "../styles/ThemeToggle.module.scss";
import { MoonStar, Sun } from "lucide-react";

interface Props {
  toogleTheme: "dark mode" | "light mode";
  setToogleTheme: (theme: "dark mode" | "light mode") => void;
}

const ToogleTheme: React.FC<Props> = ({ toogleTheme, setToogleTheme }) => {
  const toogleThemeButton = () => {
    setToogleTheme(toogleTheme === "dark mode" ? "light mode" : "dark mode");
  };
  return (
    <div className={styles.button} onClick={toogleThemeButton}>
      {toogleTheme === "dark mode" ? <MoonStar /> : <Sun />}
    </div>
  );
};

export default ToogleTheme;
