import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";

type RangeProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Range(props: Readonly<RangeProps>): JSX.Element {
  const { className, max, step, ...rest } = props;

  const steps = calculateStepLines(max, step);

  return (
    <div className="w-full">
      <input
        type="range"
        className={clsx("range w-full", className)}
        max={max}
        step={step}
        {...rest}
      />
      <div className="flex justify-between px-1.5 mt-2 text-xs">
        {Array.from({ length: steps }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="font-thin">|</span>
            <span>{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateStepLines(
  max: number | string | undefined,
  step: number | string | undefined
): number {
  if (max === undefined || step === undefined) {
    throw new Error("max and step must be defined");
  }
  if (
    (typeof max === "string" && isNaN(Number(max))) ||
    (typeof step === "string" && isNaN(Number(step)))
  ) {
    throw new Error("max and step must be numbers");
  }

  return Math.floor(Number(max) / Number(step));
}
