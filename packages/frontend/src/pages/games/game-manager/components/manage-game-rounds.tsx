import { EGameRoundType, GameDto } from "@quizzem/common";
import { JSX } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Accordion, Headline, ViewEditDisplay } from "~/components";
import { NameOfRoundInput } from "~/pages/games/components/inputs/name-of-round";
import { QuestionCountInput } from "~/pages/games/components/inputs/question-count";
import { TimeLimitInput } from "~/pages/games/components/inputs/time-limit";
import { TypeOfRoundInput } from "~/pages/games/components/inputs/type-of-round";
import { SELECT_TYPE_OF_ROUND_OPTIONS } from "~/pages/games/create-game/utils/form-values";

type GameRoundProps = {
  data: GameDto;
};

export function ManageGameRounds(props: Readonly<GameRoundProps>): JSX.Element {
  const { data } = props;

  const { register, control, formState } = useFormContext();
  const { fields } = useFieldArray({
    name: "rounds",
    control: control,
  });

  return (
    <>
      <Headline as={"h3"}>Runden</Headline>
      <p className="text-right mb-4">Gesamt: {data.rounds.length} Runden</p>

      <ul>
        {fields.map((round, index) => (
          <ManageGameRound index={index} round={round} key={round.id} />
        ))}
      </ul>
    </>
  );
}

type ManageGameRoundProps = {
  index: number;
  round: GameDto["rounds"][number];
};

function ManageGameRound(props: Readonly<ManageGameRoundProps>): JSX.Element {
  const { index, round } = props;

  const { control } = useFormContext();

  const gameRoundType: EGameRoundType = useWatch({
    control,
    name: `rounds.${index}.type`,
  });

  return (
    <li key={round.id}>
      <Accordion headline={`Runde ${index + 1}`}>
        <ViewEditDisplay
          headline={`Settings für Runde ${index + 1}`}
          // TODO
          ViewMode={
            <div className="p-4 flex flex-col gap-4">
              <div>
                Rundentyp:{" "}
                {
                  SELECT_TYPE_OF_ROUND_OPTIONS.find(
                    (option) => option.type === round.type
                  )?.label
                }
              </div>
              <div>Rundenname {round.name}</div>
              <div>Zeit pro Runde {round.timeLimit}</div>
              <div>Anzahl der Fragen {round.count}</div>
            </div>
          }
          EditMode={
            <div className="p-4 flex flex-col gap-4">
              <TypeOfRoundInput index={index} gameRoundType={gameRoundType} />
              <NameOfRoundInput index={index} gameRoundType={gameRoundType} />
              <TimeLimitInput index={index} gameRoundType={gameRoundType} />
              <QuestionCountInput index={index} gameRoundType={gameRoundType} />
            </div>
          }
        />

        <ViewEditDisplay
          headline={`Fragen für Runde ${index + 1}`}
          // TODO
          ViewMode={<div>view mode</div>}
          EditMode={<div>Edit mode</div>}
        />
      </Accordion>
    </li>
  );
}
