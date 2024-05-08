import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
import useIsMobile from "@/hooks/useIsMobile";
let settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8.2,
  slidesToScroll: 8,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 3200,
      settings: {
        slidesToShow: 6.2,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 2400,
      settings: {
        slidesToShow: 5.2,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1140,
      settings: {
        slidesToShow: 4.3,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3.3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2.3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1,
      },
    },
  ],
};
const Roll = () => {
  const isMobile = useIsMobile();
  return (
    <div className="pl-4 lg:pl-16 mt-2">
      <div
        className={`relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${
          isMobile ? "portrait" : ""
        }`}
      >
        <div className="movieSliderInner">
          <ReelHeading />
          <div className="block lg:hidden">
            <div className="flex overflow-y-hidden overflow-x-auto mobileCardsSlide">
              {Array.from({ length: 10 }, (_, i) => (
                <div className="aspect-[6/9] movieCard" key={i}>
                  <Skeleton
                    baseColor="#333"
                    highlightColor="#666"
                    className="aspect-[6/9] w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block movieSliderReel">
            <Slider {...settings}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i}>
                  <Skeleton
                    baseColor="#333"
                    highlightColor="#666"
                    className="aspect-video w-full"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Roll;