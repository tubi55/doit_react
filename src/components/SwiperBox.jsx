import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../customSwiper.css";

export default function SwiperBox({ movieData, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delay: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0 } }}
      className="size-full flex items-center relative overflow-visible"
    >
      <Swiper
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        spaceBetween={-100}
        slidesPerView={"auto"}
        className={twMerge("mySwiper", loading ? "" : "on")}
        speed={600}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
      >
        {movieData.map((data, idx) => (
          <SwiperSlide key={idx}>
            <figure>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                  alt="thumbnail"
                />
              </div>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w342${data.backdrop_path}`}
                  alt="thumbnail"
                />
              </div>

              <p className="stars">
                {Array(Math.round((data.vote_average / 10) * 5))
                  .fill()
                  .map((_, idx) => (
                    <span
                      key={idx}
                      style={{ transitionDelay: `${400 * idx}ms` }}
                    >
                      <FaStar />
                    </span>
                  ))}
              </p>
            </figure>

            <h2 className="tit">{data.title}</h2>

            <div className="btnArrow">
              <span className="vertical"></span>
              <span className="horizontal"></span>
              <Link to={"/" + data.id}>View Detail</Link>
            </div>
          </SwiperSlide>
        ))}

        <nav className="btnNav">
          {["prev", "next"].map((el) => (
            <SlideButton key={el} direction={el} />
          ))}
        </nav>
      </Swiper>
    </motion.div>
  );
}

function SlideButton({ direction }) {
  const swiper = useSwiper();
  return (
    <div
      className={direction === "prev" ? "prev" : "next"}
      onClick={() =>
        direction === "prev" ? swiper.slidePrev() : swiper.slideNext()
      }
    >
      <span>{direction === "prev" ? "Prev Movie" : "Next Movie"}</span>
    </div>
  );
}
