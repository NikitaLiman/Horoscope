export type Zodiac =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface ZodiacInfo {
  name: string;
  ukrName: string;
  element: "fire" | "earth" | "air" | "water";
  dates: string;
  icon: string;
}

export interface PredictionInfo {
  date: Date;
  zodiac: Zodiac;
  health: number;
  relationships: number;
  career: number;
  bestAspect: "health" | "relationships" | "career";
}
