import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
const SkeletonRollUpcoming = () => {
  return (
    <div className='relative my-8 lg:mt-[2vw] lg:mb-[3vw]'>
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
            <SkeletonRollUpcomingCard/> 
          </div> 
          <div>
            <SkeletonRollUpcomingCard/> 
          </div> 
          <div>
            <SkeletonRollUpcomingCard/> 
          </div> 
          <div>
            <SkeletonRollUpcomingCard/> 
          </div> 
          <div>
            <SkeletonRollUpcomingCard/> 
          </div> 
          <div>
            <SkeletonRollUpcomingCard/> 
          </div> 
        </Slider>
    </div>
  )
}
export default SkeletonRollUpcoming;

const SkeletonRollUpcomingCard = () => {
  return (
    <div className={`group sm:h-full bg-zinc-900 rounded-md relative border border-contentColor/10`}>
      <div className="flex flex-wrap flex-col sm:flex-row sm:h-full">
        <div className="w-full h-auto sm:w-1/3 sm:bg-[#333] sm:aspect-[6/9] sm:scale-105 cursor-pointer relative">
            <Skeleton baseColor='#333' highlightColor='#666' className='h-full w-full' />
        </div>
        <div className="sm:w-2/3 p-4">
          <div className='w-[90%] mb-2'>
            <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] w-full' />
          </div>
          <div className='mb-4'>
            <Skeleton baseColor='#333' highlightColor='#666' className='h-[18px] w-full' count={3}/> 
          </div>  
          <div className="flex flex-row items-center sm:justify-end gap-2 mt-4">
            <div className="w-[100px]">
              <Skeleton baseColor='#333' highlightColor='#666' className='h-[40px] w-full' borderRadius={50}/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}