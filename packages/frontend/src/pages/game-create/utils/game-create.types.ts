export enum EGameRoundType {
  STANDARD_QUIZ_ROUND = "STANDARD_QUIZ_ROUND",
  SPEED_QUIZ_ROUND = "SPEED_QUIZ_ROUND",
  ACTION_ROUND = "ACTION_ROUND",
  MEDIA_ROUND = "MEDIA_ROUND",
  BONUS_ROUND = "BONUS_ROUND",
  BUZZ_ROUND = "BUZZ_ROUND",
  // CUSTOM_ROUND = "CUSTOM_ROUND",
}

export type GameRound = {
  type: EGameRoundType;
  name: string;
  timeLimit: number;
  count: number;
};

export type GameRoundFormValues = {
  name: string;
  rounds: GameRound[];
};
