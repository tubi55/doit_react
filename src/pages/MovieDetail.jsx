import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReviewForm from "../components/ReviewForm";
import Spinner from "../components/Spinner";
import BgDetail from "../components/BgDetail";
import MovieInfo from "../components/MovieInfo";
import Trailer from "../components/Trailer";
import Modal from "../components/Modal";

export default function MovieDetail() {
  const { id } = useParams();

  const [movieDataById, setMovieDataById] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const BASE_URL = "https://api.themoviedb.org/3/movie";
  const API_KEY = "4cf85a609f260b43cf0278ad12483b46";
  const REQ_URL = `${BASE_URL}/${id}?api_key=${API_KEY}&language=ko-KR`;
  const REQ_TRAILER = `${BASE_URL}/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(REQ_URL);
        const dataMovie = await response.json();

        const responseTrailer = await fetch(REQ_TRAILER);
        const dataTrailer = await responseTrailer.json();
        const officialTrailer = dataTrailer.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setMovieDataById(dataMovie);
        if (officialTrailer) setTrailer(officialTrailer);
      } catch (err) {
        console.error("데이터 로딩 중 에러 발생: ", err);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchData();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [REQ_URL, REQ_TRAILER]);

  return (
    <section className="w-full h-screen theme-bg relative flex flex-wrap justify-between px-[10vw] pt-[17vh] pb-[6vh] overflow-hidden max-xl:overflow-auto max-xl:h-auto">
      {movieDataById && (
        <>
          {/* 배경 상세페이지 */}
          <BgDetail movieDataById={movieDataById} />

          {/* 로딩 스피너 */}
          {isLoading && <Spinner color="border-pink-500" />}

          {/* 영화 정보 */}
          <MovieInfo
            movieDataById={movieDataById}
            trailer={trailer}
            setOpenModal={setOpenModal}
          />

          {/* 리뷰 작성 폼 */}
          <ReviewForm movieId={id} />

          {/* 모달 영화 트레일러 */}
          <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
            <Trailer trailer={trailer} movieDataById={movieDataById} />
          </Modal>
        </>
      )}
    </section>
  );
}
