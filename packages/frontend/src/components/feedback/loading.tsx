import clsx from "clsx";
import { JSX } from "react";

type LoadingProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export function Loading(props: Readonly<LoadingProps>): JSX.Element {
  const { size = "md" } = props;

  return (
    <span className={clsx("loading loading-ring", sizeClasses[size])}></span>
  );
}

const sizeClasses = {
  xs: "loading-xs",
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
  xl: "loading-xl",
};
