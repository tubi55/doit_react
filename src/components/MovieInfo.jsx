import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MovieInfo({ movieDataById, trailer, setOpenModal }) {
  const navigate = useNavigate();

  return (
    <div className="w-9/12 h-full relative pr-20 theme-text flex flex-col gap-10 max-xl:w-full max-xl:pr-0 max-xl:pt-[20vh] ">
      <motion.article
        className="w-full h-3/5 flex flex-wrap content-end gap-10 relative max-xl:h-auto max-xl:mt-40vh"
        initial={{ x: -200, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 },
        }}
        exit={{
          x: -200,
          opacity: 0,
          transition: { duration: 0.3, delay: 0 },
        }}
      >
        <h1 className="w-full text-[5vmax] font-hanna leading-none drop-shadow-lg">
          {movieDataById.title}
        </h1>
        <h2 className="w-full text-2xl font-hanna theme-text opacity-40 pl-1 mb-10 leading-none">
          {movieDataById.original_title}
        </h2>

        <div className="flex flex-wrap gap-2 font-noto text-xs font-[600]">
          <ul className="flex flex-wrap bar">
            {movieDataById.genres.map((el, idx) => (
              <li key={el.id}>
                {" "}
                &nbsp;
                {idx !== 0 && "/"}
                &nbsp;
                {el.name}
              </li>
            ))}
          </ul>
          <span className="bar">
            {movieDataById.release_date.split("-").join(".")}
          </span>
          <span className="bar">{movieDataById.runtime}분</span>
          <span className="bar">
            <strong>{movieDataById.vote_average}</strong> / 10
          </span>
        </div>

        <nav>
          {trailer && (
            <button
              // shadow속성을 적용한뒤 색상을 줘야 기존 index.css의 값을 변경가능
              className="btn bg-black/80 shadow shadow-black/20"
              onClick={() => setOpenModal(true)}
            >
              WATCH TRAILER
            </button>
          )}
        </nav>
      </motion.article>

      {/* 영화 포스터 및 줄거리 */}
      <motion.article
        className="h-2/5 flex gap-10 panel max-xl:h-auto max-xl:mb-20 max-md:flex-wrap"
        initial={{ opacity: 0, x: -200 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay: 0.4 },
        }}
        exit={{
          opacity: 0,
          x: -200,
          transition: { duration: 0.3, delay: 0.1 },
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${movieDataById.poster_path}`}
          alt={movieDataById.title}
          loading="lazy"
          className="w-1/4 h-full object-contain block max-md:w-full max-md:h-auto"
        />
        <div className="text-justify">
          {movieDataById.tagline && (
            <h3 className="font-dongle text-4xl mb-4">
              {movieDataById.tagline}
            </h3>
          )}
          <p className="w-full mb-10 text-sm opacity-60">
            {movieDataById.overview
              ? movieDataById.overview
              : "해당 영화는 제공되는 줄거리 요약이 없습니다."}
          </p>
          <button className="btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </motion.article>
    </div>
  );
}
