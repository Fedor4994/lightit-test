import { Link } from "react-router-dom";

import { Product } from "../../types/produts";
import s from "./ProductCard.module.scss";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product._id}`} className={s.productCard}>
      <img
        className={s.productCardImage}
        src={product.images[0]}
        alt="product"
      />
      <h3>{product.title}</h3>
    </Link>
  );
};

export default ProductCard;
