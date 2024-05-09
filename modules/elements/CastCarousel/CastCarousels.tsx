import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CastCarouselItem from '@/modules/elements/CastCarousel/CastCarouselItem';
import CastCarouselItemMobile from '@/modules/elements/CastCarousel/CastCarouselItemMobile';
import {
    ArrowForwardIos,
    ArrowBackIosNew
} from '@mui/icons-material';
import { stableKeys } from "@/utils/stableKeys";
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
type Props = {
  casts: any,
  directors: any,
  writers: any,
}
const CastCarousels = ({
  casts,
  directors,
  writers
}:Props) => {
    const sliderRef = useRef(null as any)
    return (
        <div className="text-white">
            <div className="lg:hidden flex justify-start overflow-y-hidden pb-1 overflow-x-auto
            ">
              {(Array.isArray(directors) && directors.length > 0) && (
                directors.map((director:any, index:number) => {
                  return (
                      <CastCarouselItemMobile 
                      key={director?._id || stableKeys[index]} 
                      cast={director}
                      designation="Director"/>
                  )                        
                }
              ))}
              {(Array.isArray(writers) && writers.length > 0) && (
                writers.map((writer:any, index:number) => {
                  return (
                      <CastCarouselItemMobile 
                      key={writer?._id || stableKeys[index]} 
                      cast={writer}
                      designation="Writer"/>
                  )                        
                }
              ))}
              {(Array.isArray(casts) && casts.length > 0) && (
                casts.map((cast:any, index:number) => {
                  return (
                      <CastCarouselItemMobile 
                      key={cast?._id || stableKeys[index]} 
                      cast={cast}
                      designation="Actor"/>
                  )                        
                }
              ))}
            </div>
            <div className="hidden lg:block castCarousel overflow-hidden">
                <Slider
                ref={sliderRef}
                {...settings}>
                  {(Array.isArray(directors) && directors.length > 0) && (
                    directors.map((director:any, index:number) => {
                      return (
                          <CastCarouselItem 
                          key={director?._id || stableKeys[index]} 
                          cast={director}
                          designation="Director"/>
                      )                        
                    }
                  ))}
                  {(Array.isArray(writers) && writers.length > 0) && (
                    writers.map((writer:any, index:number) => {
                      return (
                          <CastCarouselItem 
                          key={writer?._id || stableKeys[index]} 
                          cast={writer}
                          designation="Writer"/>
                      )                        
                    }
                  ))}
                  {(Array.isArray(casts) && casts.length > 0) && (
                    casts.map((cast:any, index:number) => {
                      return (
                          <CastCarouselItem 
                          key={cast?._id || stableKeys[index]} 
                          cast={cast}
                          designation="Actor"/>
                      )                        
                    }
                  ))}
                </Slider>  
            </div> 
        </div>
    )
}
export default CastCarousels;