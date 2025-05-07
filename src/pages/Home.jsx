import { useEffect, useState } from "react";

import SwiperBox from "../components/SwiperBox";
import Spinner from "../components/Spinner";
import MovieList from "./MovieList";
import Category from "../components/Category";
import ToggleList from "../components/ToggleList";
import BgHome from "../components/BgHome";

export default function Home() {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("action");
  const [list, setList] = useState(false);

  const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
  const API_KEY = "4cf85a609f260b43cf0278ad12483b46";
  const LANGUAGE = "ko-KR";
  const categories = {
    action: "28",
    animation: "16",
    comedy: "35",
    thriller: "53",
    sf: "878",
  };
  const REQ_URL = `${BASE_URL}?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${categories[selectedCategory]}`;

  useEffect(() => {
    setLoading(true);
    const fetchMovieData = async () => {
      try {
        const response = await fetch(REQ_URL);
        const data = await response.json();
        setMovieData(data.results);
      } catch (error) {
        console.error("영화 데이터를 가져오는데 실패했습니다: ", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchMovieData();
  }, [REQ_URL, selectedCategory]);

  return (
    <section className="w-full h-screen overflow-hidden">
      {/* 배경 패널 */}
      <BgHome selectedCategory={selectedCategory} />

      {/* 리스트 토글 버튼 */}
      <ToggleList list={list} setList={setList} />

      {/* 스와이퍼 갤러리 */}
      <SwiperBox movieData={movieData} loading={loading} />

      {/* 카테고리 선택 메뉴 */}
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 조건부 영화 리스트 */}
      <MovieList list={list} />

      {/* 카테고리 변경 로딩 스피너 */}
      {loading && <Spinner color="border-[oklch(var(--point-color))]" />}
    </section>
  );
}
