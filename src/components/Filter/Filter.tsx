import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { SortType } from "../../types/sortType";

import s from "./Filter.module.scss";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../utils/getCategories";
import { convertSortType } from "../../utils/convertSortType";

const Filter = ({
  categorie,
  setSortType,
  setCategorie,
}: {
  categorie: string;
  setSortType: (type: SortType) => void;
  setCategorie: (categorie: string) => void;
}) => {
  const sortTitles = [
    "Rating: Hight to Low",
    "Rating: Low to High",
    "Price: High to Low",
    "Price: Low to High",
  ];
  const savedSort = localStorage.getItem("sort");

  const [categories, setCategories] = useState<string[]>([]);
  const [sortTitle, setSortTitle] = useState(
    savedSort ? savedSort : "Rating: Hight to Low"
  );

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
        options={sortTitles}
        onChange={(option) => {
          setSortTitle(option.value as SortType);
          localStorage.setItem("sort", option.value);

          setSortType(convertSortType(option.value));
        }}
        value={sortTitle}
        placeholder="Select an sort type"
      />
    </div>
  );
};

export default Filter;
