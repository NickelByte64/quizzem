import { EGameRoundType } from "@quizzem/common";
import clsx from "clsx";
import { Fragment, JSX } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button, Headline, Input, LabelInput, Select } from "~/components";
import { AddButton } from "~/components/actions/add-button";
import { CardTitle } from "~/pages/games/create-game/components/game-rounds/card-title";
import { SELECT_TYPE_OF_ROUND_OPTIONS } from "~/pages/games/create-game/utils/form-values";
import { getAlternatingBorders } from "~/utils";

export function CreateQuestionForm(): JSX.Element {
  const { control, register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      questions: [DEFAULT_QUESTION],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  const onSubmit: SubmitHandler<{}> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <>
      <Headline as={"h3"}>Fragen erstellen</Headline>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col gap-4"}>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <div
                className={clsx(
                  "rounded-xl shadow-xl w-full bg-base-200 border",
                  getAlternatingBorders(index)
                )}
              >
                <CardTitle
                  label="Frage"
                  index={index}
                  remove={() => remove(index)}
                  disableRemove={fields.length === 1}
                />

                <div className="p-4 flex flex-col gap-4">
                  <LabelInput label="Art der Runde">
                    <Select {...register(`questions.${index}.type`)}>
                      {SELECT_TYPE_OF_ROUND_OPTIONS.map((option) => (
                        <option key={option.type} value={option.type}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </LabelInput>
                  <LabelInput label="Kategorie">
                    <Input
                      placeholder="Naturwissenschaften"
                      {...register(`questions.${index}.category`)}
                    />
                  </LabelInput>
                  <LabelInput label="Frage">
                    <Input
                      placeholder="Wie heißt die Hauptstadt von Frankreich?"
                      {...register(`questions.${index}.question`)}
                    />
                  </LabelInput>
                  <LabelInput label="Richtige Antwort">
                    <Input
                      placeholder="Paris"
                      {...register(`questions.${index}.correctAnswer`)}
                    />
                  </LabelInput>
                  <LabelInput label="Antwortmöglichkeiten">
                    <Input
                      placeholder="Lyon"
                      {...register(`questions.${index}.answers`)}
                    />
                  </LabelInput>
                </div>
              </div>
            </Fragment>
          ))}

          <AddButton onClick={() => append(DEFAULT_QUESTION)} />
        </div>

        <Button className="mt-4 w-full">Fragen erstellen</Button>
      </form>
    </>
  );
}

const DEFAULT_QUESTION = {
  question: "",
  category: "",
  correctAnswer: "",
  answers: "",
  type: EGameRoundType.STANDARD_QUIZ_ROUND,
};
