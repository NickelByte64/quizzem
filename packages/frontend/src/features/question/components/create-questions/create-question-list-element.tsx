import {
  useWatch,
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayReturn,
} from "react-hook-form";
import { Accordion, Button, Divider, List, Stack } from "~/src/components";
import { CreateAnswers } from "~/src/features/question/components/create-questions/create-answers";
import {
  AnswerModeSelect,
  MediaTypeSelect,
  QuestionInputText,
  type CreateQuestionFormValues,
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
    <List.Item key={field.id}>
      <Accordion defaultExpanded>
        <Accordion.Summary>
          {index + 1}. {questionText || "Question Text"}
        </Accordion.Summary>
        <Accordion.Details>
          <Stack sx={{ gap: 2 }}>
            <QuestionInputText control={control} index={index} />
            <AnswerModeSelect control={control} index={index} />
            <MediaTypeSelect control={control} index={index} />
          </Stack>

          <CreateAnswers control={control} index={index} />
        </Accordion.Details>

        <Divider />

        <Button
          fullWidth
          onClick={() => remove(index)}
          disabled={fields.length <= 1}
        >
          Delete Question #{index + 1}
        </Button>
      </Accordion>
    </List.Item>
  );
}
