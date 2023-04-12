import { Link } from "react-router-dom";
import { Product } from "../../types/produts";
import s from "./ProductCard.module.scss";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product.id}`} className={s.productCard}>
      <img
        className={s.productCardImage}
        src={product.images[0]}
        alt="product"
      />
      <h2>{product.title}</h2>
      <p>{product.brand}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>{product.rating}</p>
    </Link>
  );
};

export default ProductCard;
