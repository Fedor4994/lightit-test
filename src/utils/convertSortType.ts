import { SortType } from "../types/sortType";

export const convertSortType = (sortType: string) => {
  let convertedSortType: SortType = "rating-desc-rank";

  switch (sortType) {
    case "Price: Low to High":
      convertedSortType = "price-ask-rank";
      break;
    case "Price: High to Low":
      convertedSortType = "price-desc-rank";
      break;
    case "Rating: Low to High":
      convertedSortType = "rating-ask-rank";
      break;
    case "Rating: Hight to Low":
      convertedSortType = "rating-desc-rank";
      break;
    default:
      convertedSortType = "rating-desc-rank";
  }

  return convertedSortType;
};
