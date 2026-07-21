import { useId, useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { Button, CreateButton, Dialog, Form, Stack } from "~/src/components";
import { GameApi, ROOT_GAMES_TARGET } from "~/src/features/game/api/game.api";
import type { CreateGameDto } from "~/src/features/game/api/game.types";
import {
  DEFAULT_GAME,
  DescriptionInputText,
  TitleInputText,
  type CreateGameFormValues,
} from "~/src/features/game/components/form-fields";
import { FormService } from "~/src/utils/form.service";

export function CreateGame(): JSX.Element {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const formId = useId();

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm<CreateGameFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_GAME,
  });

  const { useCreateGame } = GameApi;
  const { mutate } = useCreateGame();

  const onSubmit: SubmitHandler<CreateGameFormValues> = (formValues) => {
    const diff = FormService.getDirtyValues(dirtyFields, formValues);

    // the title of the game is required
    if (!diff.title) return;

    const formattedData: CreateGameDto = {
      title: diff.title,
      description: diff.description,
      questions: diff.questions ?? [],
    };

    mutate(formattedData, {
      onSuccess: () => {
        QUERY_CLIENT.invalidateQueries({ queryKey: [ROOT_GAMES_TARGET] });
        setOpenDialog(false);
      },
    });
  };

  return (
    <>
      <CreateButton onClick={() => setOpenDialog(true)}>
        Create Game
      </CreateButton>

      <Dialog.Root
        onClose={() => {
          setOpenDialog(false);
          reset();
        }}
        open={openDialog}
        label="Create a Game"
        width="md"
      >
        <Dialog>
          <Dialog.Title />
          <Dialog.Content>
            <Form onSubmit={handleSubmit(onSubmit)} id={formId}>
              <Stack sx={{ flexDirection: "column", gap: 2 }}>
                <TitleInputText control={control} />
                <DescriptionInputText control={control} />
              </Stack>
            </Form>
          </Dialog.Content>
          <Dialog.Actions>
            <Button type="submit" form={formId}>
              Create Game
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Root>
      {/* 
          <ul className="flex flex-col">
            {FORM_FIELDS.map(({ Component, identifier }) => (
              <li key={identifier}>
                <Component control={control} />
              </li>
            ))}
          </ul>
        </form>
      </ModalDialog> */}
    </>
  );
}
