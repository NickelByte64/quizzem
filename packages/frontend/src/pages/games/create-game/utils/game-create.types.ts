import { EGameRoundType } from "@quizzem/common";

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
