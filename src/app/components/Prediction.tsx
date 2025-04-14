import { Heart, Briefcase, Activity } from "lucide-react";
import { PredictionInfo as PredictionType } from "../../../types";
import styles from "../styles/Prediction.module.scss";

interface PredictionProps {
  prediction: PredictionType;
}

const Prediction: React.FC<PredictionProps> = ({ prediction }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("uk-UA", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  };

  const getScoreClass = (score: number) => {
    if (score >= 8) return styles.excellent;
    if (score >= 6) return styles.good;
    if (score >= 4) return styles.average;
    return styles.poor;
  };

  return (
    <div className={styles.prediction}>
      <div className={styles.date}>{formatDate(prediction.date)}</div>

      <div className={styles.scores}>
        <div className={`${styles.score} ${getScoreClass(prediction.health)}`}>
          <Activity className={styles.icon} />
          <div className={styles.label}>{"Здоров'я"}</div>
          <div className={styles.value}>{prediction.health}</div>
        </div>

        <div
          className={`${styles.score} ${getScoreClass(
            prediction.relationships
          )}`}
        >
          <Heart className={styles.icon} />
          <div className={styles.label}>Стосунки</div>
          <div className={styles.value}>{prediction.relationships}</div>
        </div>

        <div className={`${styles.score} ${getScoreClass(prediction.career)}`}>
          <Briefcase className={styles.icon} />
          <div className={styles.label}>{"Кар'єра"}</div>
          <div className={styles.value}>{prediction.career}</div>
        </div>
      </div>

      {prediction.bestAspect && (
        <div className={styles.bestAspect}>
          <div className={styles.badge}>
            {prediction.bestAspect === "health" && <Activity size={16} />}
            {prediction.bestAspect === "relationships" && <Heart size={16} />}
            {prediction.bestAspect === "career" && <Briefcase size={16} />}
            <span>
              {prediction.bestAspect === "health" && "Найкраще: Здоров'я"}
              {prediction.bestAspect === "relationships" &&
                "Найкраще: Стосунки"}
              {prediction.bestAspect === "career" && "Найкраще: Кар'єра"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prediction;
