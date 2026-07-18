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
import { useTheme } from "~/src/styling";

export type SelectOptions<T extends string = string> = {
  value: T;
  label: string;
};

export function Select(): JSX.Element {
  const { options, field, bgColorVariant } = useSelectContext();

  const { palette, shape } = useTheme();

  return (
    <MuiSelect
      size="small"
      fullWidth
      sx={{
        borderRadius: shape.borderRadiusLg,
        backgroundColor:
          bgColorVariant === "default"
            ? palette.background.default
            : palette.background.paper,
      }}
      {...field}
    >
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
