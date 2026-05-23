/**
 * Enum representing different types of questions.
 * This is enum is only used in the API and not stored in the database.
 */
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
  ORDERING = 'ORDERING',
  ESTIMATE = 'ESTIMATE',
  NUMERIC = 'NUMERIC',
  IMAGE_QUESTION = 'IMAGE_QUESTION',
  MUSIC_QUESTION = 'MUSIC_QUESTION',
  VIDEO_QUESTION = 'VIDEO_QUESTION',
}
