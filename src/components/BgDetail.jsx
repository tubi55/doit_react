import { motion } from "framer-motion";

export default function BgDetail({ movieDataById }) {
  return (
    <motion.div
      className="fixed top-0 left-0 size-full z-0 object-cover"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.5,
        transition: { duration: 1, delay: 0.5 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0 } }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w1280${movieDataById.backdrop_path}`}
        alt="thumbnail"
        className="object-cover size-full"
      />
      <div className="fixed size-full top-0 left-0 z-10 transition-colors duration-1000 bg-gradient-to-b from transparent to-[oklch(var(--theme-bg)/0.9)]" />
    </motion.div>
  );
}
