import type { UUID } from "node:crypto";
import { type JSX } from "react";
import { useParams } from "react-router";
import { EditQuestionForm } from "~/src/features/question/components/edit-question/edit-question-form";

export function EditQuestion(): JSX.Element | null {
  const { id } = useParams<{ id: UUID }>();

  if (!id) return null;

  return <EditQuestionForm id={id} />;
}
