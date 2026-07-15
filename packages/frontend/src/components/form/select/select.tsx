import { MenuItem as MuiMenuItem, Select as MuiSelect } from "@mui/material";
import { type JSX } from "react";
import { SelectError } from "~/src/components/form/select/select-error";
import { SelectHelperText } from "~/src/components/form/select/select-helper-text";
import { SelectLabel } from "~/src/components/form/select/select-label";
import { SelectOptionals } from "~/src/components/form/select/select-optionals";
import {
  SelectRoot,
  useSelectContext,
} from "~/src/components/form/select/select-root";

export type SelectOptions<T extends string = string> = {
  value: T;
  label: string;
};

export function Select(): JSX.Element {
  const { options, field } = useSelectContext();

  return (
    <MuiSelect size="small" fullWidth sx={{ borderRadius: 5 }} {...field}>
      {options.map((option) => (
        <MuiMenuItem key={option.value} value={option.value}>
          {option.label}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  );
}

Select.Root = SelectRoot;
Select.Label = SelectLabel;
Select.Error = SelectError;
Select.Optionals = SelectOptionals;
Select.HelperText = SelectHelperText;
