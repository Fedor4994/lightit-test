import s from "./ProductsList.module.scss";
import { Product } from "../../types/produts";
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className={s.productsList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
