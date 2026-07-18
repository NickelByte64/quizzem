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
  type UpdateQuestionFormValues,
} from "~/src/features/question/components/edit-question/form-fields";
import { useTheme } from "~/src/styling";

type CreateAnswersProps = {
  control: Control<UpdateQuestionFormValues, any, UpdateQuestionFormValues>;
};

export function EditAnswers(props: Readonly<CreateAnswersProps>): JSX.Element {
  const { control } = props;

  const { palette } = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `answers`,
  });

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Answers</Typography>

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {fields.map((field, index) => (
          <List.Item
            key={field.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "stretch",
            }}
          >
            <Stack sx={{ flexDirection: "column", gap: 1, width: "100%" }}>
              <AnswerInputText control={control} index={index} />
              <AnswerInputIsCorrectAnswer control={control} index={index} />
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
                onClick={() => remove(index)}
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
    </Box>
  );
}
