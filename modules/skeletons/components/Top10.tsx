import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Top10Card from "@/modules/skeletons/elements/Top10Card";
let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
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
const Top10 = () => {
  let i = 1;
  return (
    <div className={`pl-4 md:pl-16 mb-[3vw] movieSlider`}>
      <div className={`movieSliderInner`}>
        <div className='flex items-center justify-between pr-4 lg:pr-8'>
            <p className="mb-1 lg:mb-4 mr-2 w-[200px]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[36px]' />
            </p>
            <span className='mb-2 lg:mb-4 w-[100px]'>
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]' />
            </span>
        </div>
        <div className={`gap-2`}>
            <div className="block lg:hidden">
                <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
                {Array.from({ length: 11 - i + 1 }).map((_, index) => (
                    <Top10Card key={index} number={index + 1}/>
                ))}
                </div>
            </div>
            <div className="hidden lg:block gap-2">
                <Slider {...settings}>
                {Array.from({ length: 11 - i + 1 }).map((_, index) => (
                    <Top10Card key={index} number={index + 1}/>
                ))}
                </Slider>  
            </div> 
        </div>
      </div>
    </div>
  );
}
export default Top10;