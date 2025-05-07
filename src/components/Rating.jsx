import { useState } from "react";

export default function Rating() {
  const [count, setCount] = useState(0);

  //평점 증가, 감소 함수
  //increase 매개변수가 false면 평점 감소, true면 평점 증가
  const updateRating = (increase) => {
    if (increase) {
      //평점이 5를 초과하지 않도록 설정
      count !== 5 && setCount(count + 1);
    } else {
      //평점이 0 미만으로 떨어지지 않도록 설정
      count !== 0 && setCount(count - 1);
    }
  };

  return (
    <div>
      <strong>{count} </strong>
      <button onClick={() => updateRating(false)}>-</button>
      <button onClick={() => updateRating(true)}>+</button>
    </div>
  );
}
