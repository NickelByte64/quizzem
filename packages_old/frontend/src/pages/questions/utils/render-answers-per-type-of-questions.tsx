import { EQuestionType } from "@quizzem/common";
import { JSX } from "react";
import { AnswerFileQuestion } from "~/pages/questions/components/create/answer-file-question";
import { AnswerMultipleChoice } from "~/pages/questions/components/create/answer-multiple-choice";
import { AnswerNumeric } from "~/pages/questions/components/create/answer-numeric";
import { AnswerOrdering } from "~/pages/questions/components/create/answer-ordering";
import { AnswerTrueFalse } from "~/pages/questions/components/create/answer-true-false";

const answerPerTypeOfQuestionMap: Record<EQuestionType, JSX.Element> = {
  [EQuestionType.MULTIPLE_CHOICE]: <AnswerMultipleChoice />,
  [EQuestionType.TRUE_FALSE]: <AnswerTrueFalse />,
  [EQuestionType.FILL_IN_THE_BLANK]: <AnswerOrdering />,
  [EQuestionType.ORDERING]: <AnswerOrdering />,
  [EQuestionType.ESTIMATE]: <AnswerNumeric label="Estimate" />,
  [EQuestionType.NUMERIC]: <AnswerNumeric label="Numeric" />,
  [EQuestionType.IMAGE_QUESTION]: <AnswerFileQuestion />,
  [EQuestionType.MUSIC_QUESTION]: <AnswerFileQuestion />,
  [EQuestionType.VIDEO_QUESTION]: <AnswerFileQuestion />,
};

type RenderAnswersPerTypeOfQuestionsProps = {
  typeOfQuestion: EQuestionType;
};

export function RenderAnswersPerTypeOfQuestions(
  props: Readonly<RenderAnswersPerTypeOfQuestionsProps>
): JSX.Element {
  const { typeOfQuestion } = props;

  return answerPerTypeOfQuestionMap[typeOfQuestion];
}
