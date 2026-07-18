export const AnswerModeEnum = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  FREE_TEXT: 'FREE_TEXT',
  NUMERIC: 'NUMERIC',
  ORDERING: 'ORDERING',
} as const;

export type AnswerMode = (typeof AnswerModeEnum)[keyof typeof AnswerModeEnum];
