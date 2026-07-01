export const GameStateEnum = {
  DRAFT: 'DRAFT',
  LOBBY: 'LOBBY',
  COUNTDOWN: 'COUNTDOWN',
  QUESTION: 'QUESTION',
  ANSWER_REVEAL: 'ANSWER_REVEAL',
  SCOREBOARD: 'SCOREBOARD',
  NEXT_QUESTION: 'NEXT_QUESTION',
  FINAL_RESULTS: 'FINAL_RESULTS',
  ENDED: 'ENDED',
};

export type GameState = (typeof GameStateEnum)[keyof typeof GameStateEnum];
