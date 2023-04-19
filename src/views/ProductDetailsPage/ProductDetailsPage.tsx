import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Review } from "../../types/review";
import { Product, initialProduct } from "../../types/produts";
import { getProductById } from "../../utils/getProducts";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/auth-selectors";

import StarsAverage from "../../components/StarsAverage/StarsAverage";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import DetailsImage from "../../components/DetailsImage/DetailsImage";

import s from "./ProductDetailsPage.module.scss";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser);

  const [isReviewFormShown, setIsReviewFormShown] = useState(true);
  const [product, setProduct] = useState<Product>(initialProduct);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getProduts = async () => {
      try {
        setProduct(await getProductById(productId || ""));
      } catch (error) {
        console.log(error);
      }
    };

    getProduts();
  }, [productId]);

  useEffect(() => {
    //find review of current user
    const index = reviews.findIndex(
      (review) => review.userId === currentUser._id
    );

    //move current user's reveiw on the first position
    if (index !== -1) {
      setIsReviewFormShown(false);

      const newReviews = [
        reviews[index],
        ...reviews.slice(0, index),
        ...reviews.slice(index + 1),
      ];

      setReviews(newReviews);
    } else {
      setIsReviewFormShown(true);
    }
  }, [currentUser._id, reviews]);

  const editReview = (newReviewInfo: Pick<Review, "rating" | "text">) => {
    const { rating, text } = newReviewInfo;

    const newReviews = reviews.map((review) => {
      if (review.userId === currentUser._id) {
        review.text = text;
        review.rating = rating;
      }
      return review;
    });

    setReviews(newReviews);
  };

  const deleteReview = () => {
    const newReviews = reviews.filter(
      (review) => review.userId !== currentUser._id
    );
    setReviews(newReviews);
  };

  return (
    <div className={s.productDetailsPage}>
      <DetailsImage product={product} />

      <div className={s.descriptionWrapper}>
        <div className={s.productDescriptoin}>
          <h1 className={s.productTitle}>{product.title}</h1>

          <div className={s.ratingInfo}>
            <StarsAverage rating={product.rating} />{" "}
            <span>{product.rating}</span> - average
          </div>

          <div className={s.divide}></div>

          <div className={s.characteristicsWrapper}>
            <b>Price: {product.price}$</b>
            <p>Brand name: {product.brand}</p>
            <div className={s.category}>
              Category: <div className={s.categoryName}>{product.category}</div>
            </div>
          </div>

          <div className={s.divide}></div>

          <h3 className={s.descriptionText}>About:</h3>
          <p className={s.descriptionText}>{product.description}</p>

          <div className={s.divide}></div>
        </div>

        {isLoggedIn ? (
          isReviewFormShown ? (
            <ReviewSection
              addReview={(review) => {
                setReviews((prev) => [review, ...prev]);
              }}
              productId={productId || ""}
            />
          ) : (
            <p className={s.descriptionText}>
              If your opinion changes, you can edit or delete your review.
            </p>
          )
        ) : (
          <p className={s.descriptionText}>
            <Link className={s.loginLink} to="/login">
              Login
            </Link>{" "}
            to leave a review
          </p>
        )}

        <ReviewsList
          onEdit={editReview}
          onDelete={deleteReview}
          reviews={reviews}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
