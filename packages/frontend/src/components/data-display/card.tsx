import clsx from "clsx";
import { JSX, PropsWithChildren } from "react";
import { Headline } from "~/components/typography";

type CardProps = PropsWithChildren & {
  className?: string;
};

export function Card(props: Readonly<CardProps>): JSX.Element {
  const { children, className } = props;
  return <div className={clsx(`card shadow-xl`, className)}>{children}</div>;
}

function CardHeading(
  props: Readonly<CardProps & { headline: string }>
): JSX.Element {
  const { children, headline, className } = props;
  return (
    <div className={clsx("card-header", className)}>
      <Headline as="h3">{headline}</Headline>
      {children}
    </div>
  );
}

function CardBody(props: Readonly<CardProps>): JSX.Element {
  const { children, className } = props;
  return <div className={clsx("card-body", className)}>{children}</div>;
}

Card.Body = CardBody;
Card.Heading = CardHeading;
