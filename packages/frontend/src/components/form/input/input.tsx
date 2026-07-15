import { OutlinedInput as MuiInput } from "@mui/material";
import { type JSX } from "react";
import { InputError } from "~/src/components/form/input/input-error";
import { InputHelperText } from "~/src/components/form/input/input-helper-text";
import { InputLabel } from "~/src/components/form/input/input-label";
import { InputLength } from "~/src/components/form/input/input-length";
import { InputOptionals } from "~/src/components/form/input/input-optionals";
import {
  InputRoot,
  useInputContext,
} from "~/src/components/form/input/input-root";

export function Input(): JSX.Element {
  const { field } = useInputContext();

  return <MuiInput size="small" sx={{ borderRadius: 5 }} {...field} />;
}

Input.Root = InputRoot;
Input.Label = InputLabel;
Input.Length = InputLength;
Input.Error = InputError;
Input.Optionals = InputOptionals;
Input.HelperText = InputHelperText;
