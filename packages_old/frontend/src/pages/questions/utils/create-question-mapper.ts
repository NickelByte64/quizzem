import { CreateQuestionDto, EQuestionType } from "@quizzem/common";

export function createQuestionMapper(
  data: CreateQuestionDto
): CreateQuestionDto {
  let dataToSend;

  switch (data.type) {
    case EQuestionType.FILL_IN_THE_BLANK:
    case EQuestionType.ORDERING:
      dataToSend = {
        ...data,
        answer: {
          correctOrder: (data.answer.correctOrder as { value: string }[]).map(
            (item) => item.value
          ),
        },
      };
      break;
    default:
      dataToSend = data;
      break;
  }

  return dataToSend;
}
