import { QuestionDto } from "@quizzem/common";
import { JSX } from "react";
import { Headline } from "~/components";
import { RenderAnswer } from "~/pages/questions/components/list/render-answer";

export function ListQuestionsItem(props: Readonly<QuestionDto>): JSX.Element {
  const { answer, hint, question, timer, type } = props;

  return (
    <div className="p-4 bg-base-200 rounded-2xl shadow-xl">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Type: {type}</span>
          {timer && <span>timer {timer}</span>}
        </div>

        <div>
          <Headline as="h4">Question</Headline>
          <p>{question}</p>
        </div>
        {hint && (
          <div>
            <Headline as="h4">Hint</Headline>
            <p>{hint}</p>
          </div>
        )}
        <div>
          <Headline as="h4">Answers</Headline>
          <RenderAnswer answer={answer} type={type} />
        </div>
      </div>
    </div>
  );
}
