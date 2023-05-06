import { useEffect, useState } from "react";

import ProductsList from "../../components/ProductsList/ProductsList";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import { ProductsPageLoader } from "../../components/ProductsPageLoader/ProductsPageLoader";

import { convertSortType } from "../../utils/convertSortType";
import { getProducts } from "../../http/productService";
import { Product } from "../../types/produts";
import { SortType } from "../../types/sortType";

import s from "./ProductsPage.module.scss";

const ProductsPage = () => {
  const savedPage = localStorage.getItem("page");
  const savedSort = localStorage.getItem("sort");
  const savedCategorie = localStorage.getItem("categorie");

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [page, setPage] = useState(savedPage ? Number(savedPage) : 1);
  const [sortType, setSortType] = useState<SortType>(
    savedSort ? convertSortType(savedSort) : "rating-desc-rank"
  );
  const [categorie, setCategorie] = useState(
    savedCategorie ? savedCategorie : "all products"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProduts = async () => {
      try {
        setIsLoading(true);
        const { products, total } = await getProducts({
          query: {
            limit: 12,
            page,
            sort: sortType,
          },
          categorieName: categorie,
        });
        setProducts(products);
        setIsLoading(false);
        setTotalProductsCount(total);
      } catch (error) {
        console.log(error);
      }
    };

    getProduts();
  }, [categorie, page, sortType]);

  const pageHandler = (nextPage: number) => {
    setPage((prev) => prev + nextPage);
  };

  return isLoading && page === 1 ? (
    <ProductsPageLoader />
  ) : (
    <div className={s.productsPage}>
      <Filter
        setSortType={(sortType) => {
          setSortType(sortType);
          setPage(1);
          localStorage.setItem("page", "1");
        }}
        categorie={categorie}
        setCategorie={(categorie) => {
          setCategorie(categorie);
          setPage(1);
          localStorage.setItem("page", "1");
        }}
      />

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
