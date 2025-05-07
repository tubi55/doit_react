import { useEffect, useState, useDeferredValue, useTransition } from "react";

import Card from "../components/Card";
import Spinner from "../components/Spinner";
import FilterForm from "../components/FilterForm";
import { AnimatePresence, motion } from "framer-motion";

export default function MovieList({ list }) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const BASE_URL = "https://api.themoviedb.org/3/movie/popular";
  const API_KEY = "4cf85a609f260b43cf0278ad12483b46";
  const LANGUAGE = "ko-KR";
  const pageNum = 3;

  // 페이지별 영화 데이터 요청 함수
  const fetchMoviesByPage = async (page) => {
    const REQ_URL = `${BASE_URL}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
    const response = await fetch(REQ_URL);
    const data = await response.json();
    return data.results;
  };

  // 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);

      try {
        const pages = await Promise.all(
          Array.from({ length: pageNum }, (_, idx) =>
            fetchMoviesByPage(idx + 1)
          )
        );

        setMovieData(pages.flat());
      } catch (error) {
        console.error("영화 데이터를 가져오는데 실패했습니다: ", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchMovieData();
  }, []);

  // 영화 데이터 필터링
  useEffect(() => {
    startTransition(() => {
      const filtered = movieData.filter((movie) =>
        movie.title.toLowerCase().includes(deferredQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    });
  }, [deferredQuery, movieData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {list && (
          <motion.section
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="fixed w-1/2 h-screen top-0 right-0 z-100 bg-[oklch(var(--theme-bg)/0.2)] backdrop-blur-2xl px-[5vw]  max-md:px-[10vw] pt-30  gap-10 overflow-x-hidden overflow-y-auto shadow-2xl custom-scroll max-2xl:w-3/4  max-md:w-full max-md:pt-28"
          >
            {/* 영화 필터링 박스 */}
            <FilterForm query={query} setQuery={setQuery} />

            {/* 로딩 스피너 */}
            {loading && <Spinner color="border-pink-500" />}
            {!loading && isPending && <Spinner />}

            {/* 영화 카드 (필터링) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              className="justify-items-center grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-10 mt-10"
            >
              {filteredMovies.map((data, idx) => {
                return <Card key={`${data.id}-${idx}`} data={data} />;
              })}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
