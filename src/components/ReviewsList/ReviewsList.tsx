import { useState } from "react";
import { FaEdit, FaTrash, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Review } from "../../types/review";
import { selectUser } from "../../redux/auth/auth-selectors";
import StarsAverage from "../StarsAverage/StarsAverage";
import Rate from "../Rate/Rate";

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
  const currentUser = useSelector(selectUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedRating, setEditedRating] = useState(0);
  const [editedMessage, setEditedMessage] = useState("");

  return (
    <div className={s.reviewsWrapper}>
      <h2 className={s.reviewsTitle}>Reviews:</h2>

      {reviews.length === 0 ? (
        <p>There not reviews yet</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li className={s.reviewCard} key={review.userId}>
              <p className={s.username}>
                {" "}
                <FaUserAlt /> {review.username}
                {review.userId === currentUser._id && (
                  <>
                    <button
                      className={s.reviewControllButton}
                      onClick={() => {
                        setEditedMessage(review.text);
                        setEditedRating(review.rating);
                        setIsModalOpen(true);
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className={s.reviewControllButton}
                      onClick={() => {
                        confirmAlert({
                          title: "Confirm to delete",
                          message: "Are you sure to do this?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => {
                                onDelete();
                                alert("Review deleted successfully");
                              },
                            },
                            {
                              label: "No",
                              onClick: () => {},
                            },
                          ],
                        });
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </>
                )}
              </p>

              <div className={s.mainData}>
                <StarsAverage rating={review.rating} />
                <p>
                  {new Date(review.createdAt).toLocaleString().slice(0, 17)}
                </p>
              </div>
              <p>{review.text}</p>
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
            ></textarea>

            <Rate rating={editedRating} setRating={setEditedRating} />

            <div className={s.modalButtonsWrapper}>
              <button
                className={s.modalButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={s.modalButton}
                onClick={() => {
                  onEdit({ rating: editedRating, text: editedMessage });
                  setIsModalOpen(false);
                  alert("review is edited successfully");
                }}
              >
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
