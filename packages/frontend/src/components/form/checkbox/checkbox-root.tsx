import {
  createContext,
  useContext,
  useMemo,
  type JSX,
  type PropsWithChildren,
} from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type CheckboxContextValues = {
  isDisabled?: boolean;
  label: string;
  field: ControllerRenderProps<FieldValues>;
};

const CheckboxContext = createContext<CheckboxContextValues | undefined>(
  undefined,
);

type CheckboxRootProps<T extends FieldValues> = PropsWithChildren & {
  isDisabled?: boolean;
  label: string;
  field: ControllerRenderProps<T, Path<T>>;
};

export function CheckboxRoot<T extends FieldValues>(
  props: Readonly<CheckboxRootProps<T>>,
): JSX.Element {
  const { field, label, isDisabled = false, children } = props;

  const value = useMemo<CheckboxContextValues>(
    () => ({
      label,
      isDisabled,
      field: field as ControllerRenderProps<FieldValues>,
    }),
    [label, field, isDisabled],
  );

  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  );
}

export function useCheckboxContext(): CheckboxContextValues {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      "Checkbox components must be wrapped with an CheckboxRoot.",
    );
  }
  return context;
}
