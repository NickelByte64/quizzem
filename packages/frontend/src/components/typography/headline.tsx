import type { DetailedHTMLProps, HTMLAttributes, JSX } from "react";
import { tv } from "tailwind-variants";

const headline = tv({
  base: "truncate pb-2",
  variants: {
    size: {
      h1: "text-4xl font-light mb-8",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-light",
    },
  },
});

type HeadlineProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  "children"
> & {
  title: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function Headline(props: Readonly<HeadlineProps>): JSX.Element {
  const { title, as = "h1", ...rest } = props;

  const Component = as;

  return (
    <Component className={headline({ size: as })} {...rest}>
      {title}
    </Component>
  );
}
