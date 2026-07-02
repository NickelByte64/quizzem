import type { RemixiconComponentType } from "@remixicon/react";
import type { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from "react";
import { tv } from "tailwind-variants";

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  Icon: RemixiconComponentType;
  variant?: "primary" | "secondary" | "neutral";
};

const iconButtonStyles = tv({
  base: "cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed",
  variants: {
    variant: {
      primary: "text-primary hover:text-primary-dark",
      secondary: "text-secondary hover:text-secondary-dark",
      neutral: "text-neutral hover:text-neutral-dark",
    },
  },
});

export function IconButton(props: Readonly<IconButtonProps>): JSX.Element {
  const { Icon, variant = "primary", ...rest } = props;
  return (
    <button {...rest} className={iconButtonStyles({ variant })}>
      <Icon />
    </button>
  );
}
