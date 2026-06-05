import type { UUID } from "node:crypto";
import { useId, useState, type JSX } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Button, ModalDialog } from "~/src/components";

export function EditQuestion(): JSX.Element | null {
  const { id } = useParams<{ id: UUID }>();

  const [openModal, setOpenModal] = useState<boolean>(true);
  const formId = useId();

  const navigate = useNavigate();

  if (!id) return null;

  const onSubmit: SubmitHandler<CreateQuestionFormValues> = (data) => {
    const formattedData: CreateQuestionDto[] = data.questions.map(
      (question) => ({
        text: question.text,
        answerMode: question.answerMode,
        mediaType: question.mediaType,
        answers: [], // TODO: Add answer creation functionality
      }),
    );

    mutateBulk(formattedData, {
      onSuccess: () => {
        navigate("/questions");
        reset();
        QUERY_CLIENT.invalidateQueries({ queryKey: ["/questions"] });
        setOpenModal(false);
      },
    });
  };

  return (
    <ModalDialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      title="Create Questions"
      additionalButtons={
        <Button key="submit" type="submit" form={formId}>
          Create Questions
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id={formId}></form>
    </ModalDialog>
  );
}
