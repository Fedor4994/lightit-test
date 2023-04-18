import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ZoomImage from "../../components/ZoomImage/ZoomImage";
import Rate from "../../components/Rate/Rate";
import { Product, initialProduct } from "../../types/produts";
import { getProductById } from "../../utils/getProducts";

import starIcon from "./star.svg";
import s from "./ProductDetailsPage.module.scss";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    const getProduts = async () => {
      try {
        setProduct(await getProductById(productId || ""));
      } catch (error) {
        console.log(error);
      }
    };

    getProduts();
  }, [productId]);

  return (
    <div className={s.productDetailsPage}>
      <div className={s.imageWrapper}>
        <Carousel
          renderThumbs={(children) => {
            return product.images.map((img, index) => (
              <img key={index} src={img} alt="product thumb" />
            ));
          }}
          dynamicHeight={true}
          showArrows={false}
          showIndicators={false}
        >
          {product.images.map((src, index) => (
            <ZoomImage key={index} img={src} />
          ))}
        </Carousel>
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
