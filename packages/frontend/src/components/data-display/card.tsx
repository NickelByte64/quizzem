import { JSX } from "react";
import { Headline } from "~/components";

export function Card(): JSX.Element {
  return (
    <div className="card shadow-xl border border-base-200 w-full max-w-96">
      <div className="card-body">
        <div className="card-title">
          <Headline as="h2" className="mt-0 mb-4">
            {headline}
          </Headline>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
