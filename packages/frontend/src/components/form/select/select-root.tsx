import {
  createContext,
  useContext,
  useMemo,
  type JSX,
  type PropsWithChildren,
} from "react";
import type {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import type { SelectOptions } from "~/src/components/form/select/select";

export type SelectContextValues = {
  label: string;
  error: FieldError["message"];
  field: ControllerRenderProps<FieldValues>;
  options: SelectOptions[];
  helperText?: string;
  isRequired?: boolean;
};

export const SelectContext = createContext<SelectContextValues | undefined>(
  undefined,
);

type SelectRootProps<T extends FieldValues> = PropsWithChildren & {
  label: string;
  error: FieldError["message"];
  field: ControllerRenderProps<T, Path<T>>;
  options: SelectOptions[];
  helperText?: string;
  isRequired?: boolean;
};

export function SelectRoot<T extends FieldValues>(
  props: Readonly<SelectRootProps<T>>,
): JSX.Element {
  const { error, field, label, options, isRequired, helperText, children } =
    props;

  const value = useMemo<SelectContextValues>(
    () => ({
      error,
      field: field as ControllerRenderProps<FieldValues>,
      label,
      options,
      isRequired,
      helperText,
    }),
    [error, field, label, options, isRequired, helperText],
  );

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
}

export function useSelectContext(): SelectContextValues {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be wrapped with a SelectRoot.");
  }
  return context;
}
