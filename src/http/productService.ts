import axios from "axios";
import { Product, ProductsQuery } from "../types/produts";

export const getProducts = async ({
  query,
  categorieName,
}: {
  query: ProductsQuery;
  categorieName?: string;
}) => {
  const { page = 1, limit = 10, sort = "rating-desc-rank" } = query;
  const queryUrl = `page=${page}&limit=${limit}&sort=${sort}`;
  let baseUrl = `/products/categories/${categorieName}`;

  if (categorieName === "all products") {
    baseUrl = "/products";
  }

  const { data } = await axios.get<{ products: Product[]; total: number }>(
    `${baseUrl}?${queryUrl}`
  );
  return data;
};

export const getProductById = async (productId: string) => {
  const { data } = await axios.get<Product>(`/products/${productId}`);
  return data;
};
