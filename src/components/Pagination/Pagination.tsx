import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import s from "./Pagination.module.scss";

const Pagination = ({
  page,
  setPage,
  itemsCount,
}: {
  page: number;
  itemsCount: number;
  setPage: (page: number) => void;
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={s.pagination}>
      <button
        className={s.paginationButton}
        disabled={page < 2}
        style={
          page < 2
            ? {
                opacity: 0.5,
                cursor: "default",
              }
            : {
                opacity: 1,
                cursor: "pointer",
              }
        }
        onClick={() => {
          scrollToTop();
          setPage(-1);
          localStorage.setItem("page", (page - 1).toString());
        }}
      >
        <FaChevronLeft size={16} />
      </button>

      <div className={s.currentPage}>{page}</div>

      <button
        className={s.paginationButton}
        disabled={itemsCount < 12}
        style={
          itemsCount < 12
            ? {
                opacity: 0.5,
                cursor: "default",
              }
            : {
                opacity: 1,
                cursor: "pointer",
              }
        }
        onClick={() => {
          scrollToTop();
          setPage(1);
          localStorage.setItem("page", (page + 1).toString());
        }}
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
