import { useEffect, useState } from "react";

import ProductsList from "../../components/ProductsList/ProductsList";
import { Product } from "../../types/produts";
import { getAllProduts } from "../../utils/getProducts";

import s from "./ProductsPage.module.scss";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProduts = async () => {
      try {
        setProducts(await getAllProduts({ limit: 12, page }));
      } catch (error) {
        console.log(error);
      }
    };

    getProduts();
  }, [page]);

  return (
    <div className={s.productsPage}>
      <ProductsList products={products} />
      <div>
        <button disabled={page < 2} onClick={() => setPage((prev) => prev - 1)}>
          Prev Page
        </button>
        <button
          disabled={products.length < 12}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
