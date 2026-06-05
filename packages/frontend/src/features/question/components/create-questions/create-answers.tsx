import { RiDeleteBinLine } from "@remixicon/react";
import type { JSX } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { Button, Divider, Headline, IconButton } from "~/src/components";
import { DEFAULT_ANSWER } from "~/src/features/question/components/create-questions/create-questions";
import {
  AnswerInputIsCorrectAnswer,
  AnswerInputText,
  type CreateQuestionFormValues,
} from "~/src/features/question/components/create-questions/form-fields";

type CreateAnswersProps = {
  control: Control<CreateQuestionFormValues, any, CreateQuestionFormValues>;
  index: number;
};

export function CreateAnswers(
  props: Readonly<CreateAnswersProps>,
): JSX.Element {
  const { control, index } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  return (
    <div className="mt-2">
      <Headline as="h5" title={"Answers"} />

      <ul className="flex flex-col gap-4 mt-2">
        {fields.map((field, j) => (
          <li key={field.id} className="flex flex-row gap-4 items-stretch">
            <div className="flex flex-col gap-2 w-full">
              <AnswerInputText
                control={control}
                questionIndex={index}
                answerIndex={j}
              />

              <AnswerInputIsCorrectAnswer
                control={control}
                questionIndex={index}
                answerIndex={j}
              />
            </div>

            <div className="flex items-center border-l-2 pl-2 border-neutral">
              <IconButton
                type="button"
                onClick={() => remove(j)}
                disabled={fields.length <= 1}
                Icon={RiDeleteBinLine}
              />
            </div>

            <Divider />
          </li>
        ))}

        <Button
          size="full"
          type="button"
          onClick={() => append(DEFAULT_ANSWER)}
        >
          Add Answer
        </Button>
      </ul>
      <Divider />
    </div>
  );
}
