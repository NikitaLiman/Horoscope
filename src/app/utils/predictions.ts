import { PredictionInfo, Zodiac } from "../../../types";

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateScore(seed: number): number {
  return Math.floor(seededRandom(seed) * 10) + 1;
}

function generatePredictionForDate(zodiac: Zodiac, date: Date): PredictionInfo {
  const zodiacValue =
    zodiac.charCodeAt(0) + zodiac.charCodeAt(zodiac.length - 1);
  const seed1 =
    zodiacValue + date.getDate() + date.getMonth() * 100 + date.getFullYear();
  const seed2 = seed1 * 1.5;
  const seed3 = seed1 * 2.5;

  const health = generateScore(seed1);
  const relationships = generateScore(seed2);
  const career = generateScore(seed3);

  let bestAspect: "health" | "relationships" | "career" = "health";
  if (relationships > health && relationships >= career) {
    bestAspect = "relationships";
  } else if (career > health && career > relationships) {
    bestAspect = "career";
  }

  return {
    date,
    zodiac,
    health,
    relationships,
    career,
    bestAspect,
  };
}

export function generatePredictions(
  zodiac: Zodiac,
  days: number
): PredictionInfo[] {
  const predictions: PredictionInfo[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const predictionDate = new Date(today);
    predictionDate.setDate(today.getDate() + i);
    predictions.push(generatePredictionForDate(zodiac, predictionDate));
  }

  return predictions;
}
