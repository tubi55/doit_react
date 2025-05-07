import { FaSearch } from "react-icons/fa";

export default function FilterForm({ query, setQuery }) {
  return (
    <div className="absolute top-0 left-[5vw] max-md:left-[10vw] max-sm:left-[15vw] z-50 w-full pb-6 pt-15">
      <p className="relative inline-block">
        <input
          type="text"
          placeholder="SEARCH MOVIES"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-5 pt-1 text-2xl text-orange-300 placeholder-white border border-transparent shadow-inner w-[60vw] max-w-100 bg-black/7 dark:bg-white/5 backdrop-blur-md shadow-black-500/80 font-dongle focus:outline-none focus:ring-2 focus:ring-white/20 rounded-4xl"
        />
        <FaSearch className="absolute text-white right-6 top-3" />
      </p>
    </div>
  );
}
