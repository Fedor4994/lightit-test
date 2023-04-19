import React, { useState } from "react";
import Rate from "../Rate/Rate";
import s from "./ReviewSection.module.scss";
import starIcon from "./star.svg";
import { Review } from "../../types/review";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/auth-selectors";

const ReviewSection = ({
  productId,
  addReview,
}: {
  productId: string;
  addReview: (reveiw: Review) => void;
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const { _id: userId, username } = useSelector(selectUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Your review has been sent successfully");
    addReview({
      text: reviewText,
      rating,
      productId,
      userId,
      username,
      createdAt: new Date().toString(),
    });
  };

  return (
    <div className={s.ratingWrapper}>
      <div className={s.ratingTitleWrapper}>
        <div>
          <h2 className={s.ratingTitle}>Leave a review:</h2>
        </div>

        <img className={s.ratingImage} src={starIcon} alt="star" />
      </div>
      <p>You can always change it if your opinion changes.</p>
      <Rate rating={rating} setRating={setRating} />
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
          className={s.commentArea}
          placeholder="Leave a comment: (optional)"
        ></textarea>
        <button className={s.submitButton} disabled={!rating} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
