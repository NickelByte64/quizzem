import { RiCloseFill, RiMenu2Fill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { JSX } from "react";
import { IconButton } from "~/components";
import { useNavigationStore } from "~/components/global/navigation/navigation.store";

export function NavigationAction(): JSX.Element {
  const { toggleDrawerState, drawerState } = useNavigationStore();

  return (
    <IconButton onClick={() => toggleDrawerState(drawerState)}>
      <AnimatePresence mode="wait" initial={false}>
        {drawerState ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <RiCloseFill className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <RiMenu2Fill className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
