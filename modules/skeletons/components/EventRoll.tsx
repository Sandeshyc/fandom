import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventRollCard from "@/modules/skeletons/elements/EventRollCard";
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
    }
  ]
}; 
const EventRoll = () => {
    return (
      <div className='relative my-8 lg:mt-[2vw] lg:mb-[3vw] pl-4 lg:pl-8'>
        <div className='flex items-center justify-between pr-4 lg:pr-8'>
            <p className="mb-1 lg:mb-4 mr-2 w-[200px]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[36px]' />
            </p>
            <span className='mb-2 lg:mb-4 w-[100px]'>
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]' />
            </span>
        </div>
        <Slider
        {...settings}>
          <div>
            <EventRollCard/> 
          </div> 
          <div>
            <EventRollCard/> 
          </div> 
          <div>
            <EventRollCard/> 
          </div> 
          <div>
            <EventRollCard/> 
          </div> 
          <div>
            <EventRollCard/> 
          </div> 
          <div>
            <EventRollCard/> 
          </div> 
        </Slider>
    </div>
    );
}
export default EventRoll;