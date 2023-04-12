import { useRef } from "react";
import s from "./ZoomImage.module.scss";

const ZoomImage = ({ img }: { img: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomedImageRef = useRef<HTMLImageElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current || !zoomedImageRef.current) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    const dx = containerRect.width / 2 - x;
    const dy = containerRect.height / 2 - y;

    zoomedImageRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(2)`;
  }

  function handleMouseEnter() {
    if (!zoomedImageRef.current) {
      return;
    }
    zoomedImageRef.current.style.opacity = "1";
  }

  function handleMouseLeave() {
    if (!zoomedImageRef.current) {
      return;
    }
    zoomedImageRef.current.style.opacity = "0";
  }

  return (
    <div
      className={s.zoomContainer}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={img} alt="product" />
      <img
        src={img}
        alt="product"
        className={s.zoomedImage}
        ref={zoomedImageRef}
      />
    </div>
  );
};

export default ZoomImage;
