import ProductsList from "../../components/ProductsList/ProductsList";
import s from "./ProductsPage.module.scss";

import products from "./products.json";

const ProductsPage = () => {
  return (
    <div className={s.productsPage}>
      <ProductsList products={products} />
    </div>
  );
};

export default ProductsPage;
