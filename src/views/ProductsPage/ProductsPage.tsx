import { useEffect, useState } from "react";

import ProductsList from "../../components/ProductsList/ProductsList";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import { Product } from "../../types/produts";
import { SortType } from "../../types/sortType";
import { getAllProducts } from "../../utils/getProducts";

import s from "./ProductsPage.module.scss";

const ProductsPage = () => {
  const savedPage = localStorage.getItem("page");
  const savedSort = localStorage.getItem("sort") as SortType;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [page, setPage] = useState(savedPage ? Number(savedPage) : 1);
  const [sortType, setSortType] = useState<SortType>(
    savedSort ? savedSort : "rating-desc-rank"
  );

  useEffect(() => {
    const getProduts = async () => {
      try {
        const { products, total } = await getAllProducts({
          limit: 12,
          page,
          sort: sortType,
        });
        setProducts(products);
        setTotalProductsCount(total);
      } catch (error) {
        console.log(error);
      }
    };

    getProduts();
  }, [page, sortType]);

  const pageHandler = (nextPage: number) => {
    setPage((prev) => prev + nextPage);
  };

  return (
    <div className={s.productsPage}>
      <div>
        <Filter
          sortType={sortType}
          setSortType={(sortType) => {
            setSortType(sortType);
            setPage(1);
            localStorage.setItem("page", "1");
          }}
        />
      </div>

      <div>
        <ProductsList products={products} />
        <Pagination
          page={page}
          totalProductsCount={totalProductsCount}
          increasePage={pageHandler}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
