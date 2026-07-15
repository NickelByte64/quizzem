import {
  Button as MuiButton,
  useTheme,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

type Variants = "contained" | "outlined";

type ButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: Variants;
};

export function Button(props: Readonly<ButtonProps>) {
  const {
    variant = "contained",
    children,
    sx,
    fullWidth = false,
    ...rest
  } = props;

  const { palette, typography } = useTheme();

  const variants = {
    outlined: {
      backgroundColor: palette.background.default,
      color: palette.primary.main,
    },
    contained: {
      backgroundColor: palette.primary.main,
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
