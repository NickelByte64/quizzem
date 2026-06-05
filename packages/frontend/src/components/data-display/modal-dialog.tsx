import { useClickAway } from "@uidotdev/usehooks";
import { type JSX, type PropsWithChildren, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Button } from "~/src/components/actions";
import { Headline } from "~/src/components/typography";

type ModalDialogProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: "sm" | "md" | "lg";
  additionalButtons?: ReactNode;
};

const modalDialogStyles = tv({
  base: "bg-bg-100 rounded-lg border border-primary p-4 z-50 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl max-h-9/10 overflow-auto",
  variants: {
    size: {
      sm: "max-w-lg",
      md: "max-w-2xl",
      lg: "max-w-4xl",
    },
  },
});

export function ModalDialog(props: Readonly<ModalDialogProps>): JSX.Element {
  const {
    onClose,
    open,
    title,
    children,
    size = "md",
    additionalButtons,
  } = props;

  const ref = useClickAway<HTMLDialogElement>(() => onClose());

  if (!open) return <></>;

  return (
    <>
      <dialog open={open} ref={ref} className={modalDialogStyles({ size })}>
        <Headline as="h3" title={title} />

        <div className="py-4">{children}</div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="neutral" onClick={onClose}>
            Close
          </Button>
          {additionalButtons}
        </div>
      </dialog>
      <div className="fixed inset-0 bg-bg-black/60 z-40" />
    </>
  );
}
