import { useTheme, type ButtonProps as MuiButtonProps } from "@mui/material";
import { RiAddLine } from "@remixicon/react";
import { Button, type ButtonVariants } from "~/src/components/actions/button";
import { Typography } from "~/src/components/data-display";
import { Stack } from "~/src/components/layout";

type CreateButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: ButtonVariants;
};

export function CreateButton(props: Readonly<CreateButtonProps>) {
  const { children, ...rest } = props;

  const { typography } = useTheme();

  return (
    <Button {...rest}>
      <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        <RiAddLine />
        <Typography
          component={"span"}
          sx={{ fontWeight: typography.fontWeightBold }}
        >
          {children}
        </Typography>
      </Stack>
    </Button>
  );
}
