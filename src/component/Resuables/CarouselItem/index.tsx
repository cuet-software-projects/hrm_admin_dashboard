interface CarouselItemProps {
  id: string;
  children: React.ReactNode;
  totalSlides: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ id, children, totalSlides }) => {
  return (
    <div id={id} className="carousel-item relative w-full">
      {children}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a
          href={`#${id === 'slide1' ? `slide${totalSlides}` : `slide${+id[5] - 1}`}`}
          className="btn btn-circle"
        >
          ❮
        </a>
        <a
          href={`#${id === 'slide' + totalSlides ? 'slide1' : `slide${+id[5] + 1}`}`}
          className="btn btn-circle"
        >
          ❯
        </a>
      </div>
    </div>
  );
};

export default CarouselItem;
