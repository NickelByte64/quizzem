export const AnswerModeEnum = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'SINGLE_CHOICE',
  TRUE_FALSE: 'SINGLE_CHOICE',
  FREE_TEXT: 'SINGLE_CHOICE',
  NUMERIC: 'SINGLE_CHOICE',
  ORDERING: 'SINGLE_CHOICE',
};

export type AnswerMode = (typeof AnswerModeEnum)[keyof typeof AnswerModeEnum];
