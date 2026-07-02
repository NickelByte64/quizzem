import { useMemo, type JSX, type PropsWithChildren } from "react";
import {
  SelectContext,
  type SelectContextValue,
} from "~/src/components/form/select/select.context";

type SelectRootProps = PropsWithChildren & {
  error?: string;
};

export function SelectRoot(props: Readonly<SelectRootProps>): JSX.Element {
  const { children, error } = props;

  const value: SelectContextValue = useMemo(() => ({ error }), [error]);

  return (
    <SelectContext.Provider value={value}>
      <div className="flex flex-col">{children}</div>
    </SelectContext.Provider>
  );
}
