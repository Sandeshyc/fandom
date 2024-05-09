import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
let settings = {
  arrows: false,
  dots: false,
  infinite: false,
  swipeToSlide: false,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const MovieListHeroBannerItems = () => {
  return (
    <div className={`group movieSlider`}>
      <div className="relative z-10">
        <div className="hidden lg:block movieSliderReel movieSliderInner">
          <Slider {...settings}>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="movieCardNumber mb-[-6px]">
                  <div className="w-full aspect-[16/9] cursor-pointer">
                    <div className="bg-[#333] w-full h-full rounded-md col-span-9 relative z-20">
                      <Skeleton width="100%" height="100%" 
                        baseColor="#333"
                        highlightColor="#666"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default MovieListHeroBannerItems;
