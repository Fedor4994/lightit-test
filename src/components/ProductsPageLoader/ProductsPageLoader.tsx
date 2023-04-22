import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import s from "./ProductsPageLoader.module.scss";

export const ProductsPageLoader = () => {
  return (
    <>
      <div className={s.loaderHeader}>
        <Skeleton height={40} width={130} />
        <Skeleton height={40} width={130} />
      </div>
      <div className={s.loader}>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    </>
  );
};

const SkeletonLoader = () => {
  return (
    <div>
      <div>
        <Skeleton height={300} />
      </div>
      <div>
        <h5>
          <Skeleton height={20} width={270} />
        </h5>
        <p>
          <Skeleton height={16} width={200} />
        </p>
        <div className={s.footer}>
          <Skeleton height={16} width={60} />
          <Skeleton height={16} width={60} />
        </div>
      </div>
    </div>
  );
};
