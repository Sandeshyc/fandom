import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import CastCarouselItem from '@/modules/elements/CastCarousel/CastCarouselItem';
import CastCarouselItemMobile from '@/modules/elements/CastCarousel/CastCarouselItemMobile';
import {
    ArrowForwardIos,
    ArrowBackIosNew
} from '@mui/icons-material';
const SlickNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (    
        <div className={className} onClick={onClick}>
            <ArrowForwardIos 
            sx={{fontSize: 30, color: 'white'}}/>
        </div>
    );
}
  
const SlickPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosNew 
            sx={{fontSize: 30, color: 'white'}}/>
        </div>
    );
}
let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6.4,
    slidesToScroll: 6,
    swipeToSlide: true,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5.4,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 4.4,
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
const CastCarousels = () => {
    const sliderRef = useRef(null as any)
    return (
        <div className="text-white">
            <div className="lg:hidden flex justify-start overflow-y-hidden pb-1 overflow-x-auto
            ">
                {
                    Array(10).fill(0).map((_, index) => {
                        return (
                            <CastCarouselItemMobile key={index}/>
                        )
                    })
                }
            </div>
            <div className="hidden lg:block castCarousel overflow-hidden">
                <Slider
                ref={sliderRef}
                {...settings}>
                    {
                        Array(10).fill(0).map((_, index) => {
                            return (
                                <CastCarouselItem key={index}/>
                            )
                        })
                    }
                </Slider>  
            </div> 
        </div>
    )
}
export default CastCarousels;