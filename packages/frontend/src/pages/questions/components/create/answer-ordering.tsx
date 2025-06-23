import { JSX } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Divider, Headline, Input, LabelInput } from "~/components";

export function AnswerOrdering(): JSX.Element {
  const { register, control } = useFormContext();

  const fieldName = "answer.correctOrder";

  const { fields, append } = useFieldArray({ control, name: fieldName });

  return (
    <>
      <Headline as={"h4"}>Antworten</Headline>

      <div className="flex flex-col gap-4">
        {fields.map((field, i) => (
          <div key={field.id}>
            {i > 0 && <Divider />}
            <LabelInput label={`Antwortstelle ${i + 1}`}>
              <Input {...register(`${fieldName}.${i}.value`)} />
            </LabelInput>
          </div>
        ))}
        <Button
          variant="neutral"
          type="button"
          onClick={() => append({ value: "" })}
        >
          Append
        </Button>
      </div>
    </>
  );
}
