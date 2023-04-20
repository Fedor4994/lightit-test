import axios from "axios";

export const getAllCategories = async () => {
  const { data } = await axios.get<string[]>(`/products/categories`);
  return data;
};
