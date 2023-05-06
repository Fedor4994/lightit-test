import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Product } from "../../types/produts";
import StarsAverage from "../../components/StarsAverage/StarsAverage";
import { Review } from "../../types/review";
import { getUserReviews } from "../../http/reviewService";

import emptyImage from "../../assets/reviews-empty.svg";
import s from "./ReviewsPage.module.scss";
import { ReviewsPageLoader } from "../../components/ReviewsPageLoader/ReviewsPageLoader";

const ReviewsPage = () => {
  const [reviewsItems, setReviewsItems] = useState<
    { review: Review; product: Product }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  //получение отзывов пользователя
  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setReviewsItems(await getUserReviews());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getReviews();
  }, []);

  return isLoading ? (
    <ReviewsPageLoader />
  ) : reviewsItems.length === 0 ? (
    <div className={s.emptyWrapper}>
      <h1 className={s.emptyTitle}>You haven't left any product reviews yet</h1>
      <img src={emptyImage} alt="no reviews" />
    </div>
  ) : (
    <ul className={s.reviewsList}>
      {reviewsItems.map(({ product, review }) => (
        <li className={s.reviewItem} key={product._id}>
          <Link className={s.productWrapper} to={`/products/${product._id}`}>
            <img
              className={s.reviewImage}
              src={product.images[0]}
              alt="product"
            />
            <span>{product.title}</span>
          </Link>
          <div className={s.reviewWrapper}>
            <StarsAverage rating={review.rating} />
            <p>{review.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReviewsPage;
