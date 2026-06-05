import { RiArrowDropDownLine } from "@remixicon/react";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useState,
  type DetailedHTMLProps,
  type JSX,
  type SelectHTMLAttributes,
} from "react";
import { cx } from "tailwind-variants";
import { BaseInputLabel } from "~/src/components/form/base-input/base-input-label";
import { BaseInputMessage } from "~/src/components/form/base-input/base-input-message";
import { BaseInputOptionals } from "~/src/components/form/base-input/base-input-optionals";
import { SelectError } from "~/src/components/form/select/select-error";
import { SelectRoot } from "~/src/components/form/select/select-root";
import { useSelectContext } from "~/src/components/form/select/select.context";

export type SelectOptions<T extends string> = {
  value: T;
  label: string;
};

type SelectProps<T extends string> = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "onChange" | "value"
> & {
  options: SelectOptions<T>[];
  value?: T;
  onChange?: (value: T) => void;
};

export function Select<T extends string>(props: SelectProps<T>): JSX.Element {
  const { options, value, onChange } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useClickAway<HTMLUListElement>(() => setIsExpanded(!isExpanded));

  const { error } = useSelectContext();

  const activeOption = options.find((option) => option.value === value);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className={cx(
          "w-full flex flex-row justify-between rounded-sm mt-1 mb-2 px-2 py-1 border font-normal",
          error ? "border-error" : "border-neutral-600",
        )}
      >
        <span>{activeOption?.label}</span>
        <RiArrowDropDownLine
          className={cx(
            "text-neutral-600 transition-all duration-300",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      {isExpanded && (
        <ul
          ref={ref}
          className="bg-bg-100 absolute top-full left-0 w-full py-2 shadow-lg rounded-md z-40"
        >
          {options.map((option) => (
            <li key={option.value} value={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setIsExpanded(false);
                }}
                className={cx(
                  "w-full text-left px-4 py-1 hover:bg-primary-50 cursor-pointer",
                  activeOption?.value === option.value && "bg-primary-50",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Select.Root = SelectRoot;
Select.Label = BaseInputLabel;
Select.Error = SelectError;
Select.Optionals = BaseInputOptionals;
Select.Message = BaseInputMessage;
