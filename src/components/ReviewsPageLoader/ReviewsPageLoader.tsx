import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import s from "./ReviewsPageLoader.module.scss";

export const ReviewsPageLoader = () => {
  return (
    <div className={s.loader}>
      <Skeleton height={80} width={280} />
      <Skeleton height={80} width={280} />
      <Skeleton height={80} width={280} />
      <Skeleton height={80} width={280} />
      <Skeleton height={80} width={280} />
      <Skeleton height={80} width={280} />
      <Skeleton height={80} width={280} />
      <Skeleton height={80} width={280} />
    </div>
  );
};
