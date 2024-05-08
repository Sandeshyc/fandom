import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
let settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
};
const Carousel = () => {
  return (
    <div className="pb-4 pt-[75px] bg-gradient-to-t from-black from-50% to-gray-800 to-100% overflow-hidden">
      <div className="mx-[1vw] mobileCarousel scale-[0.9]">
        <Slider {...settings}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <CarouselItem key={index} />
            ))}
        </Slider>
      </div>
    </div>
  );
};
export default Carousel;
const CarouselItem = () => {
  return (
    <div className="w-full aspect-[6/9] bg-zinc-900 rounded-md relative">
      <div className="w-full h-full rounded-lg">
        <Skeleton
          baseColor="#333"
          highlightColor="#666"
          className="h-full w-full rounded-md"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-2 pb-2 pt-4 sm:pb-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex justify-center">
          <div className="w-[30px]">
            <Skeleton
              baseColor="#777"
              highlightColor="#aaa"
              className="h-[30px]"
              borderRadius={50}
            />
          </div>
          <div className="w-[30px] mx-2">
            <Skeleton
              baseColor="#777"
              highlightColor="#aaa"
              className="h-[30px]"
              borderRadius={50}
            />
          </div>
          <div className="w-[30px]">
            <Skeleton
              baseColor="#777"
              highlightColor="#aaa"
              className="h-[30px]"
              borderRadius={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
