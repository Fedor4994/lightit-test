import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { SortType } from "../../types/sortType";

import s from "./Filter.module.scss";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../utils/getCategories";

const Filter = ({
  sortType,
  categorie,
  setSortType,
  setCategorie,
}: {
  sortType: SortType;
  categorie: string;
  setSortType: (type: SortType) => void;
  setCategorie: (categorie: string) => void;
}) => {
  const sortArray: SortType[] = [
    "price-ask-rank",
    "price-desc-rank",
    "rating-ask-rank",
    "rating-desc-rank",
  ];

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(["all products", ...categories]);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className={s.filterWrapper}>
      <Dropdown
        controlClassName={s.dropdownInput}
        menuClassName={s.dropdown}
        arrowClassName={s.arrow}
        options={categories}
        onChange={(option) => {
          setCategorie(option.value);
          localStorage.setItem("categorie", option.value);
        }}
        value={categorie}
        placeholder="Select an categorie"
      />

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
