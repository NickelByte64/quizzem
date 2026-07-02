import { useMemo, type JSX, type PropsWithChildren } from "react";
import {
  InputContext,
  type InputContextValue,
} from "~/src/components/form/input/input.context";

type InputRootProps = PropsWithChildren & {
  error?: string;
  maxLength?: number;
  isRequired?: boolean;
};

export function InputRoot(props: Readonly<InputRootProps>): JSX.Element {
  const { children, error, maxLength, isRequired } = props;

  const value: InputContextValue = useMemo(
    () => ({ error, maxLength, isRequired }),
    [error, maxLength, isRequired],
  );

  return (
    <InputContext.Provider value={value}>
      <div className="flex flex-col">{children}</div>
    </InputContext.Provider>
  );
}
