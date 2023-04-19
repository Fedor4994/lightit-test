import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ZoomImage from "../ZoomImage/ZoomImage";
import { Product } from "../../types/produts";

import s from "./DetailsImage.module.scss";

const DetailsImage = ({ product }: { product: Product }) => {
  return (
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
  );
};

export default DetailsImage;
