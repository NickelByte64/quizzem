import {
  Checkbox as MuiCheckbox,
  FormControlLabel as MuiFormControlLabel,
  FormGroup as MuiFormGroup,
} from "@mui/material";
import type { JSX } from "react";
import {
  CheckboxRoot,
  useCheckboxContext,
} from "~/src/components/form/checkbox/checkbox-root";

export function Checkbox(): JSX.Element {
  const { isDisabled, field, label } = useCheckboxContext();

  return (
    <MuiFormGroup>
      <MuiFormControlLabel
        control={<MuiCheckbox size="small" disabled={isDisabled} {...field} />}
        label={label}
      />
    </MuiFormGroup>
  );
}

Checkbox.Root = CheckboxRoot;
