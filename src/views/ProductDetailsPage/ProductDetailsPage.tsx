import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import ZoomImage from "../../components/ZoomImage/ZoomImage";
import Rate from "../../components/Rate/Rate";
import starIcon from "./star.svg";
import s from "./ProductDetailsPage.module.scss";
import { Product } from "../../types/produts";

const product: Product = {
  _id: {
    $oid: "6436f461929d441e311b47ed",
  },
  title: "Crystal chandelier maria theresa for 12 light",
  description: "Crystal chandelier maria theresa for 12 light",
  price: 47,
  discountPercentage: 16,
  rating: 4.74,
  stock: 133,
  brand: "YIOSI",
  category: "lighting",
  images: [
    "https://i.dummyjson.com/data/products/100/1.jpg",
    "https://i.dummyjson.com/data/products/100/2.jpg",
    "https://i.dummyjson.com/data/products/100/3.jpg",
    "https://i.dummyjson.com/data/products/100/thumbnail.jpg",
  ],
};

const ProductDetailsPage = () => {
  const { productId } = useParams();

  return (
    <div className={s.productDetailsPage}>
      <div className={s.imageWrapper}>
        <ZoomImage img={product.images[2]} />
      </div>
      <div className={s.descriptionWrapper}>
        <div className={s.productDescriptoin}>
          <h1 className={s.productTitle}>
            {product.title} - {productId}
          </h1>
          <p>{product.title}</p>
        </div>

        <div className={s.ratingWrapper}>
          <div className={s.ratingTitleWrapper}>
            <div>
              <h2 className={s.ratingTitle}>Leave a review</h2>
              <p className={s.ratingInfo}>
                <span className={s.ratingInfo}>
                  <AiFillStar />
                  4.3 - 15 votes
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
