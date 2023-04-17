import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

import s from "./Pagination.module.scss";

const Pagination = ({
  page,
  increasePage,
  setPage,
  totalProductsCount,
}: {
  page: number;
  totalProductsCount: number;
  increasePage: (page: number) => void;
  setPage: (page: number) => void;
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const countOfFullPages = Number((totalProductsCount / 12).toFixed(0));

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
          setPage(1);
          localStorage.setItem("page", "1");
        }}
      >
        <FaAngleDoubleLeft size={20} />
      </button>
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
          increasePage(-1);
          localStorage.setItem("page", (page - 1).toString());
        }}
      >
        <FaAngleLeft size={20} />
      </button>

      <div className={s.currentPage}>{page}</div>

      <button
        className={s.paginationButton}
        disabled={page > countOfFullPages}
        style={
          page > countOfFullPages
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
          increasePage(1);
          localStorage.setItem("page", (page + 1).toString());
        }}
      >
        <FaAngleRight size={20} />
      </button>

      <button
        className={s.paginationButton}
        disabled={page > countOfFullPages}
        style={
          page > countOfFullPages
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
          setPage(countOfFullPages + 1);
          localStorage.setItem("page", (countOfFullPages + 1).toString());
        }}
      >
        <FaAngleDoubleRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
