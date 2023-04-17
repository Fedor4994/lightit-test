import { SortType } from "./sortType";

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
};

export type ProductsQuery = {
  page?: number;
  limit?: number;
  sort?: SortType;
};

export const initialProduct = {
  _id: "",
  title: "string",
  description: "string",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: "",
  category: "",
  images: [],
};
