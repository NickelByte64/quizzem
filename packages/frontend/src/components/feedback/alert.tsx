import clsx from "clsx";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";
import { JSX, PropsWithChildren } from "react";

type AlertProps = PropsWithChildren &
  HTMLMotionProps<"div"> & {
    variant: "success" | "error" | "info" | "warning";
    show: boolean;
  };

export function Alert(props: Readonly<AlertProps>): JSX.Element {
  const { show = false, children, variant, className, ...rest } = props;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          role="alert"
          className={clsx(
            "alert alert-soft",
            alertVariants[variant],
            className
          )}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const alertVariants = {
  success: "alert-success",
  error: "alert-error",
  info: "alert-info",
  warning: "alert-warning",
};
