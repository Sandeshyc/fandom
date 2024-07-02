import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  ]
}; 
const SkeletonRoll = () => {
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
        <div className='block lg:hidden'>
          <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
            <div className='aspect-[6/9] min-w-[150px] mr-2'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='aspect-[6/9] min-w-[150px] mr-2'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='aspect-[6/9] min-w-[150px] mr-2'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='aspect-[6/9] min-w-[150px] mr-2'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='aspect-[6/9] min-w-[150px] mr-2'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='aspect-[6/9] min-w-[150px] mr-0'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <Slider
          {...settings}>
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div>
          </Slider>
        </div>
    </div>
  )
}
export default SkeletonRoll