import { AnimatePresence, motion } from "motion/react";
import { Dispatch, JSX, PropsWithChildren, SetStateAction } from "react";

type SliderProps = PropsWithChildren & {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function Slider(props: Readonly<SliderProps>): JSX.Element {
  const { children, setOpen, open } = props;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 rounded-t-2xl shadow-lg px-6 pb-6 max-h-[90vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={() => setOpen(false)}
              className="hover:cursor-pointer py-3 w-full"
            >
              <div className="bg-white/10 rounded-2xl h-1" />
            </button>
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
