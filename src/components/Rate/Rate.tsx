import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import s from "./Rate.module.scss";

const rateArray = [1, 2, 3, 4, 5];

const Rate = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <ul className={s.rateList}>
      {rateArray.map((rate) => (
        <button
          key={rate}
          onMouseEnter={() => setHoverRating(rate)}
          onMouseLeave={() => setHoverRating(0)}
          className={s.star}
          onClick={() => setRating(rate)}
        >
          {hoverRating >= rate ? (
            <AiFillStar size="100%" />
          ) : !hoverRating && rating >= rate ? (
            <AiFillStar size="100%" />
          ) : (
            <AiOutlineStar size="100%" />
          )}
        </button>
      ))}
    </ul>
  );
};

export default Rate;
