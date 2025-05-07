import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ children, openModal, onClose, className }) {
  return (
    <AnimatePresence>
      {openModal && (
        <motion.aside
          initial={{ opacity: 0, y: 300 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: 0, ease: "linear" },
          }}
          exit={{
            opacity: 0,
            y: -300,
            transition: { duration: 0.2, delay: 0.2, ease: "linear" },
          }}
          className={twMerge(
            "fixed top-1/2 left-1/2 w-7/10 h-7/10 bg-[oklch(var(--theme-bg)/0.4)] theme-text z-60 p-20 pt-8 backdrop-blur-md rounded-md -translate-x-1/2 -translate-y-1/2 shadow-xl border border-l-white/20 border-t-white/30 border-r-black/10 border-b-black/20 max-md:size-full max-md:p-10 max-md:pb-8 max-md:rounded-none max-md:top-0 max-md:left-0 max-md:translate-x-0 max-md:translate-y-0 max-md:z-150",
            className
          )}
        >
          <motion.div
            className="size-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duation: 0.5, delay: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
          >
            {children}
          </motion.div>
          <span
            className="absolute top-8 right-20 cursor-pointer"
            onClick={onClose}
          >
            close
          </span>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
