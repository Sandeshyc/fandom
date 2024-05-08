import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
import EventRollCard from "@/modules/skeletons/elements/EventRollCard";
import useIsMobile from "@/hooks/useIsMobile";
let settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5.2,
  slidesToScroll: 5,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 3200,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 2400,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 2.1,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1,
      },
    },
  ],
};
const EventRoll = () => {
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
            <div className="flex overflow-y-hidden overflow-x-auto mobileEventCardsSlide py-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <EventRollCard />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block movieSliderReel sameHeightSlick">
            <Slider {...settings}>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <EventRollCard />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventRoll;