import { motion } from "framer-motion";

export default function BgHome({ selectedCategory }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
      className="fixed w-full h-6/10 top-0 left-0 bg-linear-to-b from-transparent to-white dark:from-black/60 dark:to-[oklch(var(--theme-text)/0.2)] transition-colors duration-1000"
    >
      <motion.h3
        initial={{ opacity: 0, x: 200 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay: 0.5 },
        }}
        exit={{
          opacity: 0,
          x: -200,
          transition: { duration: 0.5, delay: 0.3 },
        }}
        className="absolute bottom-0 left-[5vw] text-[20vw] text-white dark:text-white/3 transition-colors duration-1000 leading-none font-noto font-[800] tracking-tighter"
      >
        {selectedCategory.toUpperCase()}
      </motion.h3>
    </motion.div>
  );
}
