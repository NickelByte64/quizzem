import { EGameRoundType } from "~/pages/game-create/utils/game-create.types";

export const defaultAction = {
  id: "",
};

export type GameRound = {
  type: EGameRoundType;
  name: string;
  timeLimit: number;
  questionCount: number;
  actions: { id: string }[];
};

export const defaultRound = {
  type: EGameRoundType.STANDARD_QUIZ_ROUND,
  name: "",
  timeLimit: 30,
  questionCount: 1,
  actions: [defaultAction],
};

export const selectTypeOfRoundOptions: {
  type: EGameRoundType;
  label: string;
}[] = [
  {
    type: EGameRoundType.STANDARD_QUIZ_ROUND,
    label: "Standardrunde",
  },
  {
    type: EGameRoundType.SPEED_QUIZ_ROUND,
    label: "Schnellraterunde",
  },
  {
    type: EGameRoundType.BUZZ_ROUND,
    label: "Buzzerrunde",
  },
  {
    type: EGameRoundType.ACTION_ROUND,
    label: "Aktionsrunde",
  },
  {
    type: EGameRoundType.MEDIA_ROUND,
    label: "Medienrunde",
  },
  {
    type: EGameRoundType.BONUS_ROUND,
    label: "Bonusrunde",
  },
];
