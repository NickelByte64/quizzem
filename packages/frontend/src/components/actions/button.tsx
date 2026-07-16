import {
  Button as MuiButton,
  useTheme,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

export type ButtonVariants = "contained" | "outlined";
export type ColorVariants = "primary" | "secondary";

type ButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: ButtonVariants;
  colorVariant?: ColorVariants;
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
      backgroundColor: palette.background.default,
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
