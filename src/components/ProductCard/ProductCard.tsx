import { Link } from "react-router-dom";

import { Product } from "../../types/produts";
import s from "./ProductCard.module.scss";
import StarsAverage from "../StarsAverage/StarsAverage";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product._id}`} className={s.productCard}>
      <img
        className={s.productCardImage}
        src={product.images[0]}
        alt="product"
      />
      <h3 className={s.cardTitle}>{product.title}</h3>
      <div className={s.decriptionWrapper}>
        <StarsAverage rating={product.rating} />

        <strong className={s.price}>{product.price}$</strong>
      </div>
    </Link>
  );
};

export default ProductCard;
