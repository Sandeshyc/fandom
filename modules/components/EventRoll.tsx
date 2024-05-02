import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import EventCardReel from "@/modules/elements/EventCardReel";
import ReelHeading from "@/modules/elements/ReelHeading";
import { isEmpty } from "lodash";
import { stableKeys } from "@/utils/stableKeys";
import useIsMobile from "@/hooks/useIsMobile";
import { MovieInterface } from "@/types";


interface MovieListProps {
  data: MovieInterface[];
  title: string;
  source: string;
  portrait: boolean;
  link?: string;
  linkText?: string;
  gradient?: boolean;
  isBoxesLayout?: boolean;
  marginTop?: boolean;
}

function SlickNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronRightIcon strokeWidth={1.5} />
    </div>
  );
}

function SlickPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronLeftIcon strokeWidth={1.5} />
    </div>
  );
}
const EventRoll: React.FC<MovieListProps> = ({
  data,
  title,
  source,
  portrait,
  link,
  linkText,
  gradient = false,
  isBoxesLayout = false,
  marginTop = false,
}) => {
  const isMobile = useIsMobile();
  const mobileSliderRef = useRef(null as any);
  const mobileSliderOuterRef = useRef(null as any);
  const sliderRef = useRef(null as any)
  const sliderRefOuter = useRef(null as any);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderWidthOuter, setSliderWidthOuter] = useState(0);
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5.2,
    slidesToScroll: 5,
    swipeToSlide: true,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
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
  useEffect(() => {    
    if(isMobile){
      const mobileSliderRefCurrent = mobileSliderRef.current;
      const tempSliderWidth = mobileSliderRefCurrent?.scrollWidth;
      setSliderWidth(tempSliderWidth);
      const mobileSliderOuterRefCurrent = mobileSliderOuterRef.current;
      const tempSliderWidthOuter = mobileSliderOuterRefCurrent?.clientWidth;
      setSliderWidthOuter(tempSliderWidthOuter);
    }else{
      const sliderRefCurrent = sliderRef.current;
      const tempSliderWidth = sliderRefCurrent?.innerSlider?.list?.children[0]?.clientWidth;
      setSliderWidth(tempSliderWidth);
      const sliderRefCurrentOuter = sliderRefOuter.current;
      const tempSliderWidthOuter = sliderRefCurrentOuter?.getBoundingClientRect()?.width;
      setSliderWidthOuter(tempSliderWidthOuter);
    }
  }, [document, window, isMobile]);
  const ReelContent = () => (
    <div
      className={` z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${
        isMobile ? "portrait" : ""
      }`}
    >
      <div className="movieSliderInner">
        <ReelHeading
          title={title}
          link={((sliderWidth - sliderWidthOuter) > 60)?'/categories/upcoming':''}
          linkText={"Explore All"}
        />
        <div className="block lg:hidden" ref={mobileSliderOuterRef}>
          <div className="flex overflow-y-hidden overflow-x-auto mobileEventCardsSlide py-4" ref={mobileSliderRef}>
            {data?.map((movie, index) => (
              <EventCardReel
                key={stableKeys[index]}
                data={movie}
                portrait={portrait}
                gradient={gradient}
              />
            ))}
          </div>
        </div>
        <div className="hidden lg:block movieSliderReel sameHeightSlick" ref={sliderRefOuter}>
          <Slider 
          ref={sliderRef}
          {...settings}>
            {data?.map((movie, index) => (
              <EventCardReel
                key={stableKeys[index]}
                data={movie}
                portrait={portrait}
                gradient={gradient}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
  if (isEmpty(data)) {
    return null;
  }
  return (
    <div
      className={`pl-4 lg:pl-16 mt-2`}
      style={{
        marginTop: marginTop ? (isMobile ? "70px" : "120px") : "0px",
      }}
    >
      {ReelContent()}
    </div>
  );
};
export default EventRoll;