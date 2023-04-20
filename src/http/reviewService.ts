import axios from "axios";
import { Review } from "../types/review";

export const getReviewsByProductId = async (productId: string) => {
  const { data } = await axios.get<Review[]>(`/reviews/${productId}`);
  return data;
};

export const addReviewForProduct = async (
  review: Review,
  productId: string
) => {
  const { rating, text, username } = review;

  const { data } = await axios.post<{
    review: Review;
    rating: number;
  }>(`/reviews/${productId}`, {
    rating,
    text,
    username,
  });

  return data;
};

export const editReviewForProduct = async (
  newReviewInfo: { text: string; rating: number },
  productId: string
) => {
  const { rating, text } = newReviewInfo;

  const { data } = await axios.put<{
    updatedReview: Review;
    rating: number;
  }>(`/reviews/${productId}`, {
    text,
    rating,
  });

  return data;
};

export const deleteReviewForProduct = async (productId: string) => {
  const { data } = await axios.delete<{
    deletedReview: Review;
    rating: number;
  }>(`/reviews/${productId}`);

  return data;
};
