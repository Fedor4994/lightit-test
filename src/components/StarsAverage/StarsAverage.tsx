import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

import { getStarsByAverageRating } from "../../utils/getStarsByAverageRating";
import s from "./StarsAverage.module.scss";

const StarsAverage = ({ rating }: { rating: number }) => {
  return (
    <div className={s.starsAverageWrapper}>
      <div className={s.starsList}>
        {getStarsByAverageRating(rating).map((star, index) => {
          if (star === 1) {
            return <BsStarFill key={index} />;
          } else if (star === 0.5) {
            return <BsStarHalf key={index} />;
          } else {
            return <BsStar key={index} />;
          }
        })}
      </div>
      <p>{rating}</p>
    </div>
  );
};

export default StarsAverage;
