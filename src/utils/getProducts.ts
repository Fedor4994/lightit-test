import axios from "axios";
import { ProductsQuery } from "../types/produts";

export const getAllProduts = async ({
  page = 1,
  limit = 10,
  sort = "rating-desc-rank",
}: ProductsQuery) => {
  const { data } = await axios.get(
    `/products?page=${page}&limit=${limit}&sort=${sort}`
  );
  return data;
};

export const getProdutById = async (productId: string) => {
  const { data } = await axios.get(`/products/${productId}`);
  return data;
};
