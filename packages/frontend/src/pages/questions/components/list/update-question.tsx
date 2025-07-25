import { QuestionDto } from "@quizzem/common";
import { UUID } from "crypto";
import { Dispatch, JSX, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Modal } from "~/components";
import { useGetRemote } from "~/utils";

type UpdateQuestionProps = {
  selectedQuestionId: UUID | null;
  setSelectedQuestionId: Dispatch<SetStateAction<UUID | null>>;
};

export function UpdateQuestion(
  props: Readonly<UpdateQuestionProps>
): JSX.Element {
  const { selectedQuestionId, setSelectedQuestionId } = props;

  const { data: questionData, isLoading } = useGetRemote<QuestionDto>(
    `/questions/${selectedQuestionId}`,
    { enabled: !!selectedQuestionId }
  );

  const { register } = useForm({
    values: questionData,
  });

  return (
    <Modal open={!!selectedQuestionId} size="lg">
      <Modal.Headline>Frage bearbeiten</Modal.Headline>

      <Modal.Body>
        {isLoading ? (
          <>
            <div className="mb-8">
              <div className="skeleton h-6 w-2/3" />
            </div>
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Input.Skeleton key={i} />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mb-8">
              Hier kannst du deine Quizfrage anpassen. Ändere einfach den Text
              und speichere deine Änderungen.
            </p>

            <form>
              <div className="flex flex-col gap-4">
                <Input required>
                  <Input.Label label="Frage oder Aktion">
                    <Input.InputField {...register("question")} />
                  </Input.Label>
                </Input>
                <Input required>
                  <Input.Label label="Art der Frage oder Aktion">
                    <Input.InputField {...register("questionType")} />
                  </Input.Label>
                </Input>
                <Input required>
                  <Input.Label label="Korrekte Antwort">
                    <Input.InputField {...register("correctAnswer")} />
                  </Input.Label>
                </Input>
                <Input required>
                  <Input.Label label="Frage oder Aktion">
                    <Input.InputField {...register("answers")} />
                    <Input.Helper helperText="Wenn es mehrere Antworten gibt, trenne sie mit einem Semikolon - bspw. Antwort 1; Antwort 2; Antwort 3; Antwort 4" />
                  </Input.Label>
                </Input>
              </div>
            </form>
          </>
        )}
      </Modal.Body>

      <Modal.Actions onClose={() => setSelectedQuestionId(null)}>
        <Button onClick={() => setSelectedQuestionId(null)}>Speichern</Button>
      </Modal.Actions>
    </Modal>
  );
}
