"use client";
import React from "react";
import { Zodiac, PredictionInfo } from "../../types";
import ZodiacSelector from "./components/ZodiacSelector";
import ToogleTheme from "./components/toogleTheme";
import ShareButton from "./components/ShareButton";
import DaysToggle from "./components/DaysToggle";
import Prediction from "./components/Prediction";
import CatFact from "./components/CatFact";
import styles from "./page.module.scss";
import { ZODIAC_INFO } from "./utils/zodiacData";
import axios from "axios";

type Theme = "light" | "dark";

export default function Home() {
  const [zodiac, setZodiac] = React.useState<Zodiac>("aries");
  const [days, setDays] = React.useState<3 | 7>(3);
  const [predictions, setPredictions] = React.useState<PredictionInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [catFact, setCatFact] = React.useState("");
  const [catFactLoading, setCatFactLoading] = React.useState(true);
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const url = new URL(window.location.href);
    const zodiacParam = url.searchParams.get("zodiac");
    const daysParam = url.searchParams.get("days");

    if (zodiacParam && Object.keys(ZODIAC_INFO).includes(zodiacParam)) {
      setZodiac(zodiacParam as Zodiac);
    }

    if (daysParam && (daysParam === "3" || daysParam === "7")) {
      setDays(parseInt(daysParam) as 3 | 7);
    }

    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    fetchPredictions();
  }, [zodiac, days]);

  React.useEffect(() => {
    if (predictions.length > 0) {
      fetchCatFact();
    }
  }, [predictions]);

  const fetchPredictions = async () => {
    setIsLoading(true);

    try {
      const newPredictions: PredictionInfo[] = [];
      const today = new Date();

      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const health = Math.floor(Math.random() * 10) + 1;
        const relationships = Math.floor(Math.random() * 10) + 1;
        const career = Math.floor(Math.random() * 10) + 1;

        const scores = [health, relationships, career];
        const aspects = ["health", "relationships", "career"];
        const maxScore = Math.max(...scores);
        const bestAspect =
          scores.indexOf(maxScore) === scores.lastIndexOf(maxScore)
            ? aspects[scores.indexOf(maxScore)]
            : null;

        newPredictions.push({
          date,
          zodiac,
          health,
          relationships,
          career,
          bestAspect: bestAspect as "health" | "relationships" | "career",
        });
      }

      setPredictions(newPredictions);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCatFact = async () => {
    setCatFactLoading(true);

    try {
      const res = await axios.get(`https://catfact.ninja/fact`);
      setCatFact(res.data.fact);
      setCatFactLoading(false);
    } catch (error) {
      console.error("Failed to fetch cat fact:", error);
      setCatFactLoading(false);
    }
  };

  const handleZodiacChange = (newZodiac: Zodiac) => {
    setZodiac(newZodiac);
  };

  const toggleDays = () => {
    setDays(days === 3 ? 7 : 3);
  };

  const calculateAverageScore = () => {
    if (predictions.length === 0) return 5;

    let totalScore = 0;
    let count = 0;

    predictions.forEach((prediction) => {
      totalScore +=
        prediction.health + prediction.relationships + prediction.career;
      count += 3;
    });

    return Math.round(totalScore / count);
  };

  const handleThemeToggle = (newTheme: "dark mode" | "light mode") => {
    setTheme(newTheme === "dark mode" ? "dark" : "light");
  };

  const averageScore = calculateAverageScore();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Гороскоп</h1>

        <div className={styles.controls}>
          <ZodiacSelector
            currentZodiac={zodiac}
            onZodiacChange={handleZodiacChange}
          />
          <DaysToggle days={days} onToggle={toggleDays} />
          <ToogleTheme
            toogleTheme={theme === "dark" ? "dark mode" : "light mode"}
            setToogleTheme={handleThemeToggle}
          />
        </div>

        <div className={styles.predictionsContainer}>
          {isLoading ? (
            <div className={styles.loading}>Завантаження прогнозів...</div>
          ) : (
            <>
              {predictions.map((prediction, index) => (
                <Prediction key={index} prediction={prediction} />
              ))}
            </>
          )}
        </div>

        <ShareButton zodiac={zodiac} days={days} />

        <div className={styles.catFactContainer}>
          <CatFact
            fact={catFact}
            isLoading={catFactLoading}
            score={averageScore}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Гороскоп</p>
      </footer>
    </div>
  );
}
