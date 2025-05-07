import { useState, useOptimistic, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

// SubmitButton 컴포넌트는 폼 컨텍스트 내부에서 호출되어야 함
function SubmitButton({ handleReset }) {
  const formStatus = useFormStatus();

  return (
    <div className="mt-2 flex gap-2">
      <button
        type="submit"
        disabled={formStatus.pending}
        className="btn -hue-rotate-10"
      >
        {formStatus.pending ? "POSTING..." : "POST"}
      </button>
      <button onClick={handleReset} type="reset" className="btn -hue-rotate-40">
        CANCEL
      </button>
    </div>
  );
}

export default function ReviewForm({ movieId }) {
  const [reviewText, setReviewText] = useState("");

  // 낙관적 업데이트를 위한 useOptimistic 훅을 사용하여 초기 상태를 설정
  const [optimisticReviews, updateOptimisticReviews] = useOptimistic(
    [],
    (prev, newReview) => [newReview, ...prev]
  );

  // 낙관적 업데이트 함수
  const optimisticUpdate = (newReview) => {
    updateOptimisticReviews(newReview);
  };

  //낙관적 업데이트 함수를 사용하여 새로운 리뷰를 추가하는 비동기 함수
  const handleReviewSubmit = async (prevState, formData) => {
    const reviewTextValue = formData.get("reviewText");
    const movieIdValue = formData.get("movieId");

    const newReview = {
      id: Date.now(),
      text: reviewTextValue,
      movieId: movieIdValue,
      date: new Date().toLocaleString(),
    };

    optimisticUpdate(newReview);

    const newState = { reviews: [newReview, ...prevState.reviews] };
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setReviewText("");
    return newState;
  };

  const handleReset = () => {
    setReviewText("");
  };

  // useActionState 훅을 사용하여 리뷰를 추가하는 비동기 함수를 호출
  const [state, formAction] = useActionState(handleReviewSubmit, {
    reviews: [],
  });

  const reviewsToDisplay = [...optimisticReviews, ...state.reviews];

  return (
    <div className="w-3/12 relative h-full flex flex-col theme-text max-xl:w-full">
      <div className="size-full flex flex-col relative theme-text">
        {/* 리뷰 목록 */}
        <motion.article
          className="size-full overflow-y-auto h-3/5 flex flex-col relative custom-scroll pb-10"
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: 0.6 },
          }}
          exit={{
            opacity: 0,
            x: 200,
            transition: { duratioin: 0.3, delay: 0.3 },
          }}
        >
          <ul className="flex flex-col gap-2">
            {reviewsToDisplay && reviewsToDisplay.length > 0 ? (
              reviewsToDisplay.map((review) => (
                <li className="panel px-6 py-3" key={review.id}>
                  <p className="text-sm font-medium">{review.text}</p>
                  <p className="text-xs opacity-60 mt-1">{review.date}</p>
                </li>
              ))
            ) : (
              <li className="panel">
                <h2 className="text-md font-[700] font-noto opacity-95 mb-2">
                  등록된 한줄평이 없습니다.
                </h2>
                <p className="text-xs opacity-60">
                  직접 여러분의 첫 번째 한줄평을 작성해주세요.
                </p>
              </li>
            )}
          </ul>
        </motion.article>

        {/* 리뷰 작성 폼 */}
        <motion.article
          className="panel h-2/5"
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: 0.8 },
          }}
          exit={{
            opacity: 0,
            x: 200,
            transition: { duration: 0.3, delay: 0.4 },
          }}
        >
          <h2 className="drop-shadow-md text-base font-noto font-[700] theme-text opacity-70 mb-4">
            Leave a Review
          </h2>
          <form action={formAction}>
            <textarea
              name="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="영화 리뷰를 작성하세요"
              rows={6}
              required
              className="w-full bg-black/6 resize-none p-3 rounded shadow-inner backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/20 text-xs  placeholder-[oklch(var(--theme-text)/0.4)] border-r border-r-white/40 border-b border-b-white/30 border-l border-l-black/10"
            />

            <input type="hidden" name="movieId" value={movieId} />
            <SubmitButton handleReset={handleReset} />
          </form>
        </motion.article>
      </div>
    </div>
  );
}
