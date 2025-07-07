import { JSX } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Button,
  Checkbox,
  Divider,
  Headline,
  Input,
  LabelInput,
} from "~/components";

export function AnswerMultipleChoice(): JSX.Element {
  const { register, control } = useFormContext();

  const fieldName = "answer.choices";

  const { append, fields } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <>
      <Headline as={"h4"}>Antworten</Headline>

      <div className="flex flex-col gap-4">
        {fields.map((field, i) => (
          <div key={field.id}>
            {i > 0 && <Divider />}
            <LabelInput label={"Text"}>
              <Input {...register(`${fieldName}.${i}.text`)} />
            </LabelInput>
            <LabelInput label={"Ist es die richtige Antwort?"}>
              <Checkbox {...register(`${fieldName}.${i}.correctAnswer`)} />
            </LabelInput>
          </div>
        ))}
        <Button
          variant="neutral"
          type="button"
          onClick={() => append({ text: "", correctAnswer: false })}
        >
          Append
        </Button>
      </div>
    </>
  );
}
