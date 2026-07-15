import { RiDeleteBinLine } from "@remixicon/react";
import type { JSX } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
} from "~/src/components";
import {
  AnswerInputIsCorrectAnswer,
  AnswerInputText,
  DEFAULT_ANSWER,
  type CreateQuestionFormValues,
} from "~/src/features/question/components/create-questions/form-fields";
import { useTheme } from "~/src/styling";

type CreateAnswersProps = {
  control: Control<CreateQuestionFormValues, any, CreateQuestionFormValues>;
  index: number;
};

export function CreateAnswers(
  props: Readonly<CreateAnswersProps>,
): JSX.Element {
  const { control, index } = props;

  const { palette } = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  return (
    <Box>
      <Typography variant="h5">Answers</Typography>

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {fields.map((field, j) => (
          <List.Item
            key={field.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "stretch",
            }}
          >
            <Stack sx={{ flexDirection: "column", gap: 2, width: "100%" }}>
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
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                borderLeft: `1px solid ${palette.primary.main}`,
              }}
            >
              <IconButton
                type="button"
                onClick={() => remove(j)}
                disabled={fields.length <= 1}
                Icon={RiDeleteBinLine}
              />
            </Stack>

            <Divider />
          </List.Item>
        ))}

        <Button fullWidth type="button" onClick={() => append(DEFAULT_ANSWER)}>
          Add Answer
        </Button>
      </List>
      <Divider />
    </Box>
  );
}
