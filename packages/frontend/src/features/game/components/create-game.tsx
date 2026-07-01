import { useId, useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button, ModalDialog } from "~/src/components";
import { GameApi } from "~/src/features/game/api/game.api";
import type { CreateGameDto } from "~/src/features/game/api/game.types";
import {
  DEFAULT_GAME,
  FORM_FIELDS,
  type CreateGameFormValues,
} from "~/src/features/game/components/form-fields";
import { FormService } from "~/src/utils/form.service";

export function CreateGame(): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const formId = useId();

  const { control, handleSubmit, reset, formState } =
    useForm<CreateGameFormValues>({
      mode: "onBlur",
      defaultValues: DEFAULT_GAME,
    });
  const navigate = useNavigate();

  const { useCreateGame } = GameApi;
  const { mutate } = useCreateGame();

  const onSubmit: SubmitHandler<CreateGameFormValues> = (formValues) => {
    const diff = FormService.getDirtyValues(formState.dirtyFields, formValues);

    // the title of the game is required
    if (!diff.title) return;

    const formattedData: CreateGameDto = {
      title: diff.title,
      description: diff.description,
      questions: diff.questions ?? [],
    };

    mutate(formattedData, {
      onSuccess: (res) => {
        navigate(`/games/${res.data.id}`);
      },
    });
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create Game</Button>

      <ModalDialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          reset();
        }}
        title="Create a Game"
        additionalButtons={
          <Button key="submit" type="submit" form={formId}>
            Create Game
          </Button>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} id={formId}>
          <ul className="flex flex-col">
            {FORM_FIELDS.map(({ Component, identifier }) => (
              <li key={identifier}>
                <Component control={control} />
              </li>
            ))}
          </ul>
        </form>
      </ModalDialog>
    </>
  );
}
