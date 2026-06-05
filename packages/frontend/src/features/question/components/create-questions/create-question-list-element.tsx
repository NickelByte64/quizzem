import {
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayReturn,
  useWatch,
} from "react-hook-form";
import { Accordion, Button, Divider } from "~/src/components";
import { CreateAnswers } from "~/src/features/question/components/create-questions/create-answers";
import {
  AnswerModeSelect,
  type CreateQuestionFormValues,
  MediaTypeSelect,
  QuestionInputText,
} from "~/src/features/question/components/create-questions/form-fields";

type CreateQuestionListElementProps = {
  fields: FieldArrayWithId<CreateQuestionFormValues, "questions", "id">[];
  field: FieldArrayWithId<CreateQuestionFormValues, "questions", "id">;
  control: Control<CreateQuestionFormValues, any, CreateQuestionFormValues>;
  index: number;
  remove: UseFieldArrayReturn["remove"];
};

export function CreateQuestionListElement(
  props: Readonly<CreateQuestionListElementProps>,
) {
  const { field, control, index, remove, fields } = props;

  const questionText = useWatch({ control, name: `questions.${index}.text` });

  return (
    <li key={field.id}>
      <Accordion title={`${index + 1}. ${questionText}`}>
        <QuestionInputText control={control} index={index} />
        <AnswerModeSelect control={control} index={index} />
        <MediaTypeSelect control={control} index={index} />

        <CreateAnswers control={control} index={index} />

        <Button
          size="full"
          onClick={() => remove(index)}
          disabled={fields.length <= 1}
        >
          Delete Question #{index + 1}
        </Button>
      </Accordion>

      <Divider />
    </li>
  );
}
