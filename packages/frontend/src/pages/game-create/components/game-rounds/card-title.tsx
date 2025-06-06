import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { RiCloseLine, RiDraggable } from "@remixicon/react";
import { JSX } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import { Headline, IconButton } from "~/components";

type CardTitleProps = {
  index: number;
  remove: UseFieldArrayRemove;
  disableRemove?: boolean;
  dragAttributes: DraggableAttributes;
  dragListeners: SyntheticListenerMap | undefined;
};

export function CardTitle(props: Readonly<CardTitleProps>): JSX.Element {
  const {
    index,
    remove,
    disableRemove = false,
    dragAttributes,
    dragListeners,
  } = props;

  return (
    <div className="bg-base-300 rounded-t-xl w-full p-4 flex items-center justify-between">
      <Headline as="h4" defaultMargin={false}>
        Runde {index + 1}
      </Headline>

      <div className="flex items-center gap-2">
        <IconButton
          disabled={disableRemove}
          variant="accent"
          className="btn-ghost"
          onClick={() => {
            remove(index);
          }}
        >
          <RiCloseLine />
        </IconButton>
        <button type="button" {...dragAttributes} {...dragListeners}>
          <RiDraggable className="hover:cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
