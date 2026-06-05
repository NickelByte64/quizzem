import type { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "neutral";
  size?: "full" | "fit";
};

const button = tv({
  base: "px-4 py-1 rounded-md text-white disabled:bg-neutral-100 disabled:cursor-not-allowed shadow-md font-semibold",
  variants: {
    variant: {
      primary: "bg-primary hover:bg-primary-dark",
      secondary: "bg-secondary hover:bg-secondary-dark",
      neutral: "bg-neutral-100 hover:bg-neutral-200 text-primary-foreground",
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
