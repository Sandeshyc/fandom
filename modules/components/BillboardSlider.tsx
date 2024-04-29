import React from "react";
import Slider from "react-slick";
import { PlayIcon } from "@heroicons/react/24/solid";
import BillboardBanner from "@/modules/elements/BilboardBanner";
import LinkRoute from "@/modules/Identities/LinkRoute";
import Title from "@/modules/Identities/Title";
import Text from "@/modules/Identities/Text";
import { stableKeys } from "@/utils/stableKeys";
import RentPlayButtonLink from "@/modules/elements/Purchase/RentPlayButtonLink";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import {
  getThumbnailLandscape
} from "@/utils/getData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SlickNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosOutlined
        sx={{
          fontSize: "2.5rem",
          color: "#ddd",
        }}
      />
    </div>
  );
}

function SlickPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosNewOutlined
        sx={{
          fontSize: "2.5rem",
          color: "#ddd",
        }}
      />
    </div>
  );
}
type Props = {
  data: any;
  module: any;
};

// main component
const BillboardSlider = (inputProps: Props) => {
  const { data } = inputProps;
  const [activeIndex, setActiveIndex] = React.useState(0);
  console.log("activeIndex", activeIndex);

  // const data = fetchData(inputProps.module)
  const noOfSlides = Array.isArray(data) ? data.length : 0;
  let settings = {
    dots: noOfSlides > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: noOfSlides > 1,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    afterChange: (current: number) => setActiveIndex(current),
  };
  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        <Slider className="billboardSlider" {...settings}>
          {data.map((item: any, index: number) => (
            <BillboardItem key={stableKeys[index]} data={item} activeIndex={activeIndex} slideIndex={index}/>
          ))}
        </Slider>
      ) : null}
    </>
  );
};
export default BillboardSlider;

type ItemProps = {
  data: any;
  activeIndex?: number;
  slideIndex?: number;
};
const BillboardItem = ({ data, activeIndex, slideIndex }: ItemProps) => {
  const itemId = data?._id;
  const title = data?.title;
  const description = data?.description;
  const trailerUrl = data?.trailerUrl;
  const thumbnailUrl = getThumbnailLandscape(data);
  const detailUrl = `/details/${itemId}`;
  const watchUrl = `/watch/${itemId}`;

  return (
    <div className={`relative billboardSec billboardSliderItem`}>
      <BillboardBanner thumbnailUrl={thumbnailUrl} trailerUrl={trailerUrl} isActive={activeIndex === slideIndex}/>
      <div
        className={`absolute bottom-[0%] pb-6 sm:pb-10 lg:pb-16 xl:pb-25 pl-4 md:pl-16 transition`}
      >
        <div className="mb-4 lg:mb-8 w-[90%] md:w-[80%] lg:w-[50%] xl:w-[40%] text-contentColor">
          <div className="hidden md:block">
            {title && (
              <Title tag="h1" size="6xl" className="mb-2">
                {title}
              </Title>
            )}
            {description && (
              <Text size="xl" clamp={4}>
                {description}
              </Text>
            )}
          </div>
          <div className="block md:hidden">
            {title && (
              <Title tag="h1" size="3xl" className="mb-1">
                {title}
              </Title>
            )}
            {description && (
              <Text size="sm" clamp={4}>
                {description}
              </Text>
            )}
          </div>
        </div>
        {itemId && (
          <>
          <RentPlayNotice data={data?.allowed} />          
          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <RentPlayButtonLink
            itemId={itemId} 
            data={data?.allowed} 
            onAirDate={data?.onAirDate}
            />
            <LinkRoute href={`${detailUrl}`} type="hoverOutline">
              Know More
              <ArrowForwardIosOutlined className="w-5 h-5 ml-2 text-contentColor/80" />
            </LinkRoute>
          </div>
          </>
        )}
      </div>
    </div>
  );
};