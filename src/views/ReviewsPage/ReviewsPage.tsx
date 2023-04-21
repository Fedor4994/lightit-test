import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Product } from "../../types/produts";
import StarsAverage from "../../components/StarsAverage/StarsAverage";
import { Review } from "../../types/review";
import { getUserReviews } from "../../http/reviewService";

import emptyImage from "../../assets/reviews-empty.svg";
import s from "./ReviewsPage.module.scss";

const ReviewsPage = () => {
  const [reviewsItems, setReviewsItems] = useState<
    { review: Review; product: Product }[]
  >([]);

  //получение отзывов пользователя
  useEffect(() => {
    const getReviews = async () => {
      try {
        setReviewsItems(await getUserReviews());
      } catch (error) {
        console.log(error);
      }
    };

    getReviews();
  }, []);

  return reviewsItems.length === 0 ? (
    <div className={s.emptyWrapper}>
      <h1 className={s.emptyTitle}>You haven't left any product reviews yet</h1>
      <img src={emptyImage} alt="no reviews" />
    </div>
  ) : (
    <ul className={s.reviewsList}>
      {reviewsItems.map((reviewItem) => (
        <li className={s.reviewItem} key={reviewItem.product._id}>
          <Link
            className={s.productWrapper}
            to={`/products/${reviewItem.product._id}`}
          >
            <img
              className={s.reviewImage}
              src={reviewItem.product.images[0]}
              alt="product"
            />
            <span>{reviewItem.product.title}</span>
          </Link>
          <div className={s.reviewWrapper}>
            <StarsAverage rating={reviewItem.review.rating} />
            <p>{reviewItem.review.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReviewsPage;
