"use client";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { Zodiac } from "../../../types";
import styles from "../styles/ShareButton.module.scss";

interface ShareButtonProps {
  zodiac: Zodiac;
  days: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ zodiac, days }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("zodiac", zodiac);
    url.searchParams.set("days", days.toString());

    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button className={styles.shareButton} onClick={handleShare}>
      <Share2 size={16} />
      <span>{copied ? "Скопійовано!" : "Поділитися прогнозом"}</span>
    </button>
  );
};

export default ShareButton;
