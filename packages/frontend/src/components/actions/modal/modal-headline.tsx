import { JSX, PropsWithChildren } from "react";
import { Headline } from "~/components/typography";

type ModalHeadlineProps = PropsWithChildren;

export function ModalHeadline(
  props: Readonly<ModalHeadlineProps>
): JSX.Element {
  const { children } = props;

  return (
    <Headline as="h3" defaultMargin={false} className="mb-4">
      {children}
    </Headline>
  );
}
