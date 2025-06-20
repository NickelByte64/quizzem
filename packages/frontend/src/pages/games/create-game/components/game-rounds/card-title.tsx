import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { RiCloseLine, RiDraggable } from "@remixicon/react";
import { JSX } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import { Headline, IconButton } from "~/components";

type CardTitleProps = {
  label: string;
  index: number;
  remove: UseFieldArrayRemove;
  disableRemove?: boolean;
  draggable?: boolean;
  dragAttributes?: DraggableAttributes;
  dragListeners?: SyntheticListenerMap;
};

export function CardTitle(props: Readonly<CardTitleProps>): JSX.Element {
  const {
    label,
    index,
    remove,
    disableRemove = false,
    draggable = false,
    dragAttributes,
    dragListeners,
  } = props;

  return (
    <div className="bg-base-300 rounded-t-xl w-full p-4 flex items-center justify-between">
      <Headline as="h4" defaultMargin={false}>
        {label} {index + 1}
      </Headline>

      <div className="flex items-center gap-2">
        <IconButton
          disabled={disableRemove}
          variant={getAlternatingVariant(index)}
          className="btn-ghost"
          onClick={() => remove(index)}
        >
          <RiCloseLine />
        </IconButton>
        {draggable && (
          <button type="button" {...dragAttributes} {...dragListeners}>
            <RiDraggable className="hover:cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
}

function getAlternatingVariant(
  index: number
): "primary" | "secondary" | "accent" {
  const borderClasses = ["primary", "secondary", "accent"] as const;
  return borderClasses[index % borderClasses.length];
}
