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
  const { isDisabled, field, label, value } = useCheckboxContext();

  const { value: fieldValue, onChange, ...rest } = field;

  const isGrouped = value !== undefined && Array.isArray(fieldValue);
  const checked = isGrouped ? fieldValue.includes(value) : Boolean(fieldValue);

  const handleChange = (_: unknown, isChecked: boolean): void => {
    if (isGrouped) {
      onChange(
        isChecked
          ? [...fieldValue, value]
          : fieldValue.filter((entry) => entry !== value),
      );
    } else {
      onChange(isChecked);
    }
  };

  return (
    <MuiFormGroup>
      <MuiFormControlLabel
        control={
          <MuiCheckbox
            size="small"
            disabled={isDisabled}
            checked={checked}
            onChange={handleChange}
            {...rest}
          />
        }
        label={label}
      />
    </MuiFormGroup>
  );
}

Checkbox.Root = CheckboxRoot;
