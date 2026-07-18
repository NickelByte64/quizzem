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
import type { BgColorVariants } from "~/src/styling";

type InputContextValues = {
  label: string;
  error: FieldError["message"];
  maxLength: number;
  field: ControllerRenderProps<FieldValues>;
  bgColorVariant?: BgColorVariants;
  helperText?: string;
  isRequired?: boolean;
};

const InputContext = createContext<InputContextValues | undefined>(undefined);

type InputRootProps<T extends FieldValues> = PropsWithChildren & {
  label: string;
  error: FieldError["message"];
  maxLength: number;
  field: ControllerRenderProps<T, Path<T>>;
  bgColorVariant?: BgColorVariants;
  helperText?: string;
  isRequired?: boolean;
};

export function InputRoot<T extends FieldValues>(
  props: Readonly<InputRootProps<T>>,
): JSX.Element {
  const {
    error,
    field,
    label,
    maxLength,
    isRequired,
    helperText,
    children,
    bgColorVariant = "default",
  } = props;

  const value = useMemo<InputContextValues>(
    () => ({
      label,
      error,
      maxLength,
      field: field as ControllerRenderProps<FieldValues>,
      bgColorVariant,
      isRequired,
      helperText,
    }),
    [label, error, maxLength, field, bgColorVariant, isRequired, helperText],
  );

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
}

export function useInputContext(): InputContextValues {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("Input components must be wrapped with an InputRoot.");
  }
  return context;
}
