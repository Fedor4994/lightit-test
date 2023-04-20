import axios from "axios";
import { Product, ProductsQuery } from "../types/produts";

export const getAllProducts = async ({
  page = 1,
  limit = 10,
  sort = "rating-desc-rank",
}: ProductsQuery) => {
  const { data } = await axios.get<{ products: Product[]; total: number }>(
    `/products?page=${page}&limit=${limit}&sort=${sort}`
  );
  return data;
};

export const getAllProductsByCategorie = async ({
  query,
  categorieName,
}: {
  query: ProductsQuery;
  categorieName: string;
}) => {
  const { page = 1, limit = 10, sort = "rating-desc-rank" } = query;

  const { data } = await axios.get<{ products: Product[]; total: number }>(
    `/products/categories/${categorieName}?page=${page}&limit=${limit}&sort=${sort}`
  );
  return data;
};

export const getProductById = async (productId: string) => {
  const { data } = await axios.get<Product>(`/products/${productId}`);
  return data;
};
