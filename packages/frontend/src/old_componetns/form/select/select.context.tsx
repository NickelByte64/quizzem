import { createContext, useContext } from "react";

export type SelectContextValue = {
  error?: string;
};

export const SelectContext = createContext<SelectContextValue>({});

export function useSelectContext(): SelectContextValue {
  return useContext(SelectContext);
}
