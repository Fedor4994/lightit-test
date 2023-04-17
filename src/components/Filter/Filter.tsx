import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { SortType } from "../../types/sortType";

import s from "./Filter.module.scss";

const Filter = ({
  sortType,
  setSortType,
}: {
  sortType: SortType;
  setSortType: (type: SortType) => void;
}) => {
  const sortArray: SortType[] = [
    "price-ask-rank",
    "price-desc-rank",
    "rating-ask-rank",
    "rating-desc-rank",
  ];

  return (
    <div className={s.filter}>
      <Dropdown
        controlClassName={s.dropdownInput}
        menuClassName={s.dropdown}
        arrowClassName={s.arrow}
        options={sortArray}
        onChange={(option) => {
          setSortType(option.value as SortType);
          localStorage.setItem("sort", option.value);
        }}
        value={sortType}
        placeholder="Select an sort type"
      />
    </div>
  );
};

export default Filter;
