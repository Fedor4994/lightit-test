import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

import ZoomImage from "../../components/ZoomImage/ZoomImage";
import Rate from "../../components/Rate/Rate";
import { Product, initialProduct } from "../../types/produts";

import starIcon from "./star.svg";
import s from "./ProductDetailsPage.module.scss";
import { useEffect, useState } from "react";
import { getProdutById } from "../../utils/getProducts";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    const getProduts = async () => {
      try {
        setProduct(await getProdutById(productId || ""));
      } catch (error) {
        console.log(error);
      }
    };

    getProduts();
  }, [productId]);

  return (
    <div className={s.productDetailsPage}>
      <div className={s.imageWrapper}>
        <ZoomImage img={product.images[0]} />
      </div>
      <div className={s.descriptionWrapper}>
        <div className={s.productDescriptoin}>
          <h1 className={s.productTitle}>{product.title}</h1>
          <p>{product.description}</p>
          <p>Brand - {product.brand}</p>
          <p>Price: {product.price}$</p>
          <p>Category: {product.category}</p>
        </div>

        <div className={s.ratingWrapper}>
          <div className={s.ratingTitleWrapper}>
            <div>
              <h2 className={s.ratingTitle}>Leave a review</h2>
              <p className={s.ratingInfo}>
                <span className={s.ratingInfo}>
                  <AiFillStar />
                  {product.rating}
                </span>
              </p>
            </div>

            <img className={s.ratingImage} src={starIcon} alt="star" />
          </div>
          <p>You can always change the rating if your opinion changes.</p>
          <Rate />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
