import type { UUID } from "node:crypto";
import { useId, useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { Box, Button, Dialog, Form, Stack, Typography } from "~/src/components";
import { GameApi, ROOT_GAMES_TARGET } from "~/src/features/game/api/game.api";
import type { UpdateGameDto } from "~/src/features/game/api/game.types";
import {
  GameInputDescription,
  GameInputQuestions,
  GameInputTitle,
  type UpdateGameFormValues,
} from "~/src/features/game/components/edit-game/form-fields";
import { QuestionApi } from "~/src/features/question/api/question.api";
import { FormService } from "~/src/utils/form.service";

type EditGameProps = {
  id: UUID;
};

export function EditGame(props: Readonly<EditGameProps>): JSX.Element {
  const { id } = props;

  const [openDialog, setOpenDialog] = useState<boolean>(!!id);
  const formId = useId();
  const navigate = useNavigate();

  const { useUpdateGame, useGetGameById } = GameApi;
  const { useGetQuestionList } = QuestionApi;
  const { data: gameData } = useGetGameById(id);
  const { mutate } = useUpdateGame(id);
  const { data: questionData } = useGetQuestionList({ page: 0 });

  const {
    handleSubmit,
    control,
    reset,
    formState: { dirtyFields },
  } = useForm<UpdateGameFormValues>({
    mode: "onChange",
    values: {
      title: gameData?.data.title ?? "",
      description: gameData?.data.description ?? "",
      questions: gameData?.data.questions.map((question) => question.id) ?? [],
    },
  });

  const onSubmit: SubmitHandler<UpdateGameFormValues> = (formValues) => {
    const diff = FormService.getDirtyValues(dirtyFields, formValues);

    const formattedData: UpdateGameDto = {
      title: diff.title,
      description: diff.description,
      questions: diff.questions,
    };

    mutate(formattedData, {
      onSuccess: () => {
        reset();
        QUERY_CLIENT.invalidateQueries({ queryKey: [ROOT_GAMES_TARGET] });
        QUERY_CLIENT.invalidateQueries({
          queryKey: [`${ROOT_GAMES_TARGET}/${id}`],
        });
        navigate("/games");
      },
    });
  };

  return (
    <Dialog.Root
      onClose={() => {
        setOpenDialog(false);
        reset();
        navigate("/games");
      }}
      open={openDialog}
      label="Edit Game"
      width="md"
    >
      <Dialog>
        <Dialog.Title />
        <Dialog.Content>
          <Form onSubmit={handleSubmit(onSubmit)} id={formId}>
            <Stack sx={{ flexDirection: "column", gap: 2 }}>
              <GameInputTitle control={control} />
              <GameInputDescription control={control} />

              <Box sx={{ mt: 3 }}>
                <Typography variant="h5">Questions</Typography>
                <GameInputQuestions
                  control={control}
                  questionData={questionData}
                />
              </Box>
            </Stack>
          </Form>
        </Dialog.Content>
        <Dialog.Actions>
          <Button type="submit" form={formId}>
            Edit Question
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Root>
  );
}
