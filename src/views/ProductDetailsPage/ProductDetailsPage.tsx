import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import ZoomImage from "../../components/ZoomImage/ZoomImage";
import Rate from "../../components/Rate/Rate";
import starIcon from "./star.svg";
import s from "./ProductDetailsPage.module.scss";

const product = {
  id: 5,
  title: "Huawei P30",
  description:
    "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
  price: 499,
  discountPercentage: 10.58,
  rating: 4.09,
  stock: 32,
  brand: "Huawei",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/5/1.jpg",
    "https://i.dummyjson.com/data/products/5/2.jpg",
    "https://i.dummyjson.com/data/products/5/3.jpg",
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
