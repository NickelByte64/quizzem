import { createContext, useContext } from "react";

type InputContextType = {
  required?: boolean;
  errorMessage?: string;
  hasErrors?: boolean;
};

export const InputContext = createContext<InputContextType | undefined>(
  undefined
);

export function useInputContext(): InputContextType {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error(
      "useInputContext must be used within an InputContext.Provider"
    );
  }
  return context;
}
