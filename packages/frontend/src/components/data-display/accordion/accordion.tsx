import { RiArrowDownSLine } from "@remixicon/react";
import { useState, type JSX, type PropsWithChildren } from "react";
import { cx } from "tailwind-variants";
import { AccordionGroup } from "~/src/components/data-display/accordion/accordion-group";
import { Headline } from "~/src/components/typography";

type AccordionProps = PropsWithChildren & {
  title: string;
};

export function Accordion(props: Readonly<AccordionProps>): JSX.Element {
  const { title, children } = props;

  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border rounded-md">
      <button
        type="button"
        className={cx(
          "w-full flex flex-row gap-4 items-center justify-between bg-bg-elevated p-2",
          expanded ? "rounded-t-md" : "rounded-md",
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <Headline as="h4" title={title} />
        <RiArrowDownSLine className={cx(expanded && "rotate-180")} />
      </button>

      {expanded && <div className="p-2">{children}</div>}
    </div>
  );
}

Accordion.Group = AccordionGroup;
