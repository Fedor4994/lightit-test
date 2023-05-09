import { useState } from "react";
import { toast } from "react-hot-toast";

import { Review } from "../../types/review";
import Rate from "../Rate/Rate";
import ReveiwCard from "../ReviewCard/ReveiwCard";

import s from "./ReviewsList.module.scss";

const ReviewsList = ({
  reviews,
  onEdit,
  onDelete,
}: {
  reviews: Review[];
  onEdit: (newReviewInfo: Pick<Review, "rating" | "text">) => void;
  onDelete: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedRating, setEditedRating] = useState(0);
  const [editedMessage, setEditedMessage] = useState("");

  const handleEdit = () => {
    onEdit({ rating: editedRating, text: editedMessage });
    setIsModalOpen(false);
    toast.success("Review is edited successfully");
  };

  return (
    <div className={s.reviewsWrapper}>
      {reviews.length === 0 ? (
        <p>There not reviews yet</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.userId}>
              <ReveiwCard
                review={review}
                setEditedMessage={setEditedMessage}
                setEditedRating={setEditedRating}
                setIsModalOpen={setIsModalOpen}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <div
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          className={s.backdrop}
        >
          <div className={s.editModal}>
            <h3>Edit Review:</h3>
            <textarea
              onChange={(e) => setEditedMessage(e.target.value)}
              value={editedMessage}
              className={s.commentArea}
              placeholder="Leave a comment: (optional)"
              maxLength={50}
            ></textarea>

            <Rate rating={editedRating} setRating={setEditedRating} />

            <div className={s.modalButtonsWrapper}>
              <button
                className={s.modalButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className={s.modalButton} onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
