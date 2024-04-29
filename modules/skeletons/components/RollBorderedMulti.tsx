import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RollBorderedCard from "@/modules/skeletons/elements/RollBorderedCard";
let settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6.2,
  slidesToScroll: 6,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 2400,
      settings: {
        slidesToShow: 5.2,
        slidesToScroll:  5,
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
const RollBorderedMulti = () => {
    return (
        <div className='relative my-8 lg:mb-[3vw] mt-[160px]'>
            <div className='flex items-center justify-between pr-4 lg:pr-8'>
                <p className="mb-1 lg:mb-4 mr-2 w-[200px]">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[36px]' />
                </p>
            </div>
            <Slider
            {...settings}>
            <div>
                <RollBorderedCard/> 
            </div> 
            <div>
                <RollBorderedCard/> 
            </div> 
            <div>
                <RollBorderedCard/> 
            </div> 
            <div>
                <RollBorderedCard/> 
            </div> 
            <div>
                <RollBorderedCard/> 
            </div> 
            <div>
                <RollBorderedCard/> 
            </div> 
            <div>
                <RollBorderedCard/> 
            </div> 
            </Slider>
        </div>
    );
}
export default RollBorderedMulti;