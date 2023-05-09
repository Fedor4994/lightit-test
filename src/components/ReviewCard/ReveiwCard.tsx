import { useSelector } from "react-redux";
import { FaEdit, FaTrash, FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { selectUser } from "../../redux/auth/auth-selectors";
import { Review } from "../../types/review";
import { openConfirmModal } from "../../utils/openConfirmModal";
import StarsAverage from "../StarsAverage/StarsAverage";

import s from "./ReviewCard.module.scss";

const ReveiwCard = ({
  review,
  setEditedMessage,
  setEditedRating,
  setIsModalOpen,
  onDelete,
}: {
  review: Review;
  setEditedMessage: (text: string) => void;
  setEditedRating: (rating: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  onDelete: () => void;
}) => {
  const currentUser = useSelector(selectUser);

  return (
    <div className={s.reviewCard}>
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
              onClick={() =>
                openConfirmModal(() => {
                  onDelete();
                  toast.success("Review deleted successfully");
                }, "delete")
              }
            >
              <FaTrash /> Delete
            </button>
          </>
        )}
        {review.isEdited && <span className={s.isEdited}>(edited)</span>}
      </p>

      <div className={s.mainData}>
        <StarsAverage rating={review.rating} />
        <p>{new Date(review.createdAt).toLocaleString().slice(0, 17)}</p>
      </div>
      <p>{review.text}</p>
    </div>
  );
};

export default ReveiwCard;
