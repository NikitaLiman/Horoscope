import { Cat } from "lucide-react";
import styles from "../styles/CatFact.module.scss";

interface CatFactProps {
  fact: string;
  isLoading: boolean;
  score: number;
}

const CatFact: React.FC<CatFactProps> = ({ fact, isLoading, score }) => {
  const getMessage = () => {
    if (score >= 8) return "Чудовий день! Ось факт про котів на щастя:";
    if (score >= 6) return "Гарний день! Ось факт про котів для натхнення:";
    if (score >= 4) return "Звичайний день. Ось факт про котів для настрою:";
    return "День може бути складним. Ось факт про котів для підтримки:";
  };

  return (
    <div className={styles.catFact}>
      <div className={styles.header}>
        <Cat size={20} />
        <h3>{getMessage()}</h3>
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>Завантаження факту...</div>
        ) : (
          <p>{fact}</p>
        )}
      </div>
    </div>
  );
};

export default CatFact;
