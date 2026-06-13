import { createContext, useContext } from "react";

export type InputContextValue = {
  error?: string;
  maxLength?: number;
  isRequired?: boolean;
};

export const InputContext = createContext<InputContextValue>({});

export function useInputContext(): InputContextValue {
  return useContext(InputContext);
}
