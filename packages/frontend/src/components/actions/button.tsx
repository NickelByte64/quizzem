import {
  Button as MuiButton,
  useTheme,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";
import type { MainColorVariants } from "~/src/styling";

export type ButtonVariants = "contained" | "outlined";

type ButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: ButtonVariants;
  colorVariant?: MainColorVariants;
};

export function Button(props: Readonly<ButtonProps>) {
  const {
    variant = "contained",
    colorVariant = "primary",
    children,
    sx,
    fullWidth = false,
    ...rest
  } = props;

  const { palette, typography } = useTheme();

  const variants = {
    outlined: {
      borderColor:
        colorVariant === "primary"
          ? palette.primary.main
          : palette.secondary.main,
      color:
        colorVariant === "primary"
          ? palette.primary.main
          : palette.secondary.main,
    },
    contained: {
      backgroundColor:
        colorVariant === "primary"
          ? palette.primary.main
          : palette.secondary.main,
      color: palette.common.white,
    },
  };

  return (
    <MuiButton
      variant={variant}
      size="medium"
      fullWidth={fullWidth}
      sx={{
        borderRadius: "2rem",
        fontWeight: typography.fontWeightBold,
        ...variants[variant],
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}
