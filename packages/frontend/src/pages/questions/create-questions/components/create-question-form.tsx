import { EGameRoundType } from "@quizzem/common";
import clsx from "clsx";
import { Fragment, JSX } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Headline, Input, LabelInput, Select } from "~/components";
import { AddButton } from "~/components/actions/add-button";
import { CardTitle } from "~/pages/games/create-game/components/game-rounds/card-title";
import { SELECT_TYPE_OF_ROUND_OPTIONS } from "~/pages/games/create-game/utils/form-values";

export function CreateQuestionForm(): JSX.Element {
  const { control, register } = useForm({
    mode: "onBlur",
    defaultValues: {
      questions: [DEFAULT_QUESTION],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  return (
    <>
      <Headline as={"h3"}>Fragen erstellen</Headline>
      <form>
        <div className={clsx("flex flex-col gap-4")}>
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
                    <Input placeholder="Wie heißt die Hauptstadt von Frankreich?" />
                  </LabelInput>
                  <LabelInput label="Frage">
                    <Input placeholder="Wie heißt die Hauptstadt von Frankreich?" />
                  </LabelInput>
                  <LabelInput label="Richtige Antwort">
                    <Input placeholder="Paris" />
                  </LabelInput>
                  <LabelInput label="Antwortmöglichkeiten">
                    <Input placeholder="Lyon" />
                  </LabelInput>
                </div>
              </div>
            </Fragment>
          ))}

          <AddButton onClick={() => append(DEFAULT_QUESTION)} />
        </div>
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

function getAlternatingBorders(index: number): string {
  const borderClasses = ["border-primary", "border-secondary", "border-accent"];
  return borderClasses[index % borderClasses.length];
}
