import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react";
import { JSX, PropsWithChildren, useState } from "react";
import { Headline } from "~/components/typography";

type AccordionProps = PropsWithChildren & {
  headline: string;
};

export function Accordion(props: Readonly<AccordionProps>): JSX.Element {
  const { children, headline } = props;

  const [expand, setExpand] = useState(false);

  return (
    <>
      <button onClick={() => setExpand((prev) => !prev)}>
        <div className="flex flex-row items-center gap-2">
          {expand ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
          <Headline as={"h3"}>{headline}</Headline>
        </div>
      </button>

      {expand && children}
    </>
  );
}
