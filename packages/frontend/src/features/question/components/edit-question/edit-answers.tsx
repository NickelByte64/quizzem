import { RiDeleteBinLine } from "@remixicon/react";
import type { JSX } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { Button, Divider, Headline, IconButton } from "~/src/components";
import {
  AnswerInputIsCorrectAnswer,
  AnswerInputText,
  DEFAULT_ANSWER,
  type UpdateQuestionFormValues,
} from "~/src/features/question/components/edit-question/form-fields";

type CreateAnswersProps = {
  control: Control<UpdateQuestionFormValues, any, UpdateQuestionFormValues>;
};

export function EditAnswers(props: Readonly<CreateAnswersProps>): JSX.Element {
  const { control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `answers`,
  });

  return (
    <div className="mt-2">
      <Headline as="h5" title={"Answers"} />
      <ul className="flex flex-col gap-4 mt-2">
        {fields.map((field, index) => (
          <li key={field.id} className="flex flex-row gap-4 items-stretch">
            <div className="flex flex-col gap-2 w-full">
              <AnswerInputText control={control} index={index} />
              <AnswerInputIsCorrectAnswer control={control} index={index} />
            </div>
            <div className="flex items-center border-l pl-2 border-primary">
              <IconButton
                type="button"
                onClick={() => remove(index)}
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
    </div>
  );
}
