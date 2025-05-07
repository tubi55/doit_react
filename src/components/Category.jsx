import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export default function Category({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex gap-2 absolute bottom-[10vh] left-1/11 z-10 max-lg:left-1/2 max-lg:-translate-x-1/2 max-md:bottom-[5vh] max-sm:w-full max-sm:justify-center max-sm:scale-90 max-sm:flex-wrap">
      {Object.keys(categories).map((category, idx) => (
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: 0.1 * idx + 0.6 },
          }}
          exit={{
            opacity: 0,
            y: -40,
            transition: { duration: 0.3, delay: 0.1 * idx + 0.3 },
          }}
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={twMerge(
            "btn-bar",
            selectedCategory === category ? "on" : ""
          )}
        >
          {category.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
}
