import { Link } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import clsx from "clsx";

export default function Card({ data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [stars] = useState(Math.round((data.vote_average / 10) * 5));

  return (
    <article
      className="relative mb-20 w-50 h-75  max-2xl:w-58 max-2xl:h-86 max-sm:w-8/10 max-sm:h-[90vw]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 썸네일 */}
      <Link to={"/" + data.id} className="block size-full">
        <img
          src={`https://image.tmdb.org/t/p/w200${data.poster_path}`}
          alt={data.title}
          loading="lazy"
          className="absolute object-cover translate-x-4 translate-y-4 size-full blur-xl saturate-150 opacity-80"
        />
        <img
          src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
          alt={data.title}
          loading="lazy"
          className="absolute object-cover rounded-lg size-full"
        />
      </Link>

      {/* 호버 툴팁 */}
      <aside
        className={clsx(
          "w-full h-1/2 bg-gray/20 absolute bottom-0 backdrop-blur-lg p-5 origin-bottom transition-all rounded-lg duration-400",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="mb-4 text-xs text-white/60">
          {data.overview
            ? data.overview.length > 60
              ? data.overview.substr(0, 60) + "..."
              : data.overview
            : "해당 영화의 요약 줄거리가 없습니다."}
        </p>

        <span className="text-[oklch(var(--point-color))] font-orbitron text-[11px] font-[400] tracking-wider">
          {data.release_date.split("-").join(".")}
        </span>
      </aside>

      {/* 제목, 평점 */}
      <h2 className="text-2xl font-dongle transition-colors duration-1000 text-[oklch(var(--theme-text))] font-[500] mt-3">
        <Link to={"/" + data.id}>{data.title}</Link>
      </h2>
      <p className="flex gap-1 text-xs text-[oklch(var(--point-color))]">
        {Array(stars)
          .fill()
          .map((_, idx) => (
            <span className="inline-block" key={idx}>
              <FaStar />
            </span>
          ))}
      </p>

      <div></div>
    </article>
  );
}
