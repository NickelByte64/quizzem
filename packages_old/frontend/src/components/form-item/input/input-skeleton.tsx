import { JSX } from "react";

/**
 * InputSkeleton component that provides a common skeleton loading state for the input fields.
 */
export function InputSkeleton(): JSX.Element {
  return (
    <div>
      <div className="skeleton h-5 w-48 mb-4" />
      <div className="skeleton h-10 w-full pb-1" />
    </div>
  );
}
