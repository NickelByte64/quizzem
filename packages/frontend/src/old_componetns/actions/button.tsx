import type { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?:
    | "primary"
    | "primary-light"
    | "secondary"
    | "secondary-light"
    | "neutral";
  size?: "full" | "fit";
};

const button = tv({
  base: "text-text-inverse px-4 py-1 rounded-md hover:cursor-pointer disabled:bg-disabled disabled:text-disabled-text disabled:cursor-not-allowed shadow-md font-semibold",
  variants: {
    variant: {
      primary: "bg-primary hover:bg-primary-dark",
      "primary-light": "bg-primary-light hover:bg-primary",
      secondary: "bg-secondary hover:bg-secondary-dark",
      "secondary-light": "bg-secondary-light hover:bg-secondary",
      neutral: "bg-neutral-100 hover:bg-neutral-200 text-primary",
    },
    size: {
      full: "w-full",
      fit: "w-fit",
    },
  },
});

export function Button(props: Readonly<ButtonProps>): JSX.Element {
  const { children, variant = "primary", size = "fit", ...rest } = props;
  return (
    <button className={button({ variant, size })} {...rest}>
      {children}
    </button>
  );
}
