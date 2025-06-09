import { EGameRoundType } from "@quizzem/common";
import {
  GameRound,
  GameRoundFormValues,
} from "~/pages/game-create/utils/game-create.types";

export const defaultRound: GameRound = {
  type: EGameRoundType.STANDARD_QUIZ_ROUND,
  name: "",
  timeLimit: 30,
  count: 1,
};

export const defaultGame: GameRoundFormValues = {
  name: "",
  rounds: [defaultRound],
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
