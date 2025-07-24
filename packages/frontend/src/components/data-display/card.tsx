import { JSX, PropsWithChildren } from "react";
import { Headline } from "~/components/typography";

type CardProps = PropsWithChildren;

export function Card(props: Readonly<CardProps>): JSX.Element {
  const { children } = props;
  return <div className="card shadow-xl">{children}</div>;
}

function CardHeading(
  props: Readonly<CardProps & { headline: string }>
): JSX.Element {
  const { children, headline } = props;
  return (
    <div className="card-header">
      <Headline as="h3">{headline}</Headline>
      {children}
    </div>
  );
}

function CardBody(props: Readonly<CardProps>): JSX.Element {
  const { children } = props;
  return <div className="card-body">{children}</div>;
}

Card.Body = CardBody;
Card.Heading = CardHeading;
