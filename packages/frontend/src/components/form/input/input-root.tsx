import { useMemo, type JSX, type PropsWithChildren } from "react";
import {
  InputContext,
  type InputContextValue,
} from "~/src/components/form/input/input.context";

type InputRootProps = PropsWithChildren & {
  error?: string;
  maxLength?: number;
};

export function InputRoot(props: Readonly<InputRootProps>): JSX.Element {
  const { children, error, maxLength } = props;

  const value: InputContextValue = useMemo(
    () => ({ error, maxLength }),
    [error, maxLength],
  );

  return (
    <InputContext.Provider value={value}>
      <div className="flex flex-col">{children}</div>
    </InputContext.Provider>
  );
}
