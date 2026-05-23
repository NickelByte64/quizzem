import { AnimatePresence, motion } from "motion/react";
import { JSX, PropsWithChildren } from "react";
import { useNavigationStore } from "~/components/global/navigation/navigation.store";

type NavigationDrawerProps = PropsWithChildren;

export function NavigationDrawer(
  props: Readonly<NavigationDrawerProps>
): JSX.Element {
  const { children } = props;

  const { drawerState, toggleDrawerState } = useNavigationStore();

  return (
    <AnimatePresence>
      {drawerState ? (
        <>
          <motion.div
            onClick={() => toggleDrawerState(drawerState)}
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="bg-base-100 fixed w-3/4 h-full z-50 shadow-xl top-[64px]"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
