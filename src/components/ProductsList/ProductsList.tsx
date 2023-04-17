import { Product } from "../../types/produts";
import ProductCard from "../ProductCard/ProductCard";

import s from "./ProductsList.module.scss";

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className={s.productsList}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
