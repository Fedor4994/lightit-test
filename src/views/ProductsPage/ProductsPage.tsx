import { useEffect, useState } from "react";

import ProductsList from "../../components/ProductsList/ProductsList";
import { Product } from "../../types/produts";
import { getAllProduts } from "../../utils/getProducts";

import s from "./ProductsPage.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";

const ProductsPage = () => {
  const savedPage = localStorage.getItem("page");

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(savedPage ? Number(savedPage) : 1);

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

  const pageHandler = (nextPage: number) => {
    setPage((prev) => prev + nextPage);
  };

  return (
    <div className={s.productsPage}>
      <div>
        <Filter />
      </div>

      <div>
        <ProductsList products={products} />
        <Pagination
          page={page}
          itemsCount={products.length}
          setPage={pageHandler}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
