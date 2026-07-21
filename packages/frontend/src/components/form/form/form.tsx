import { Box } from "@mui/material";
import {
  type DetailedHTMLProps,
  type FormHTMLAttributes,
  type JSX,
  type PropsWithChildren,
} from "react";

type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> &
  PropsWithChildren;

export function Form(props: Readonly<FormProps>): JSX.Element {
  const { children, ...rest } = props;

  return (
    <Box component={"form"} {...rest}>
      {children}
    </Box>
  );
}
