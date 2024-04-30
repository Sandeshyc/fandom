import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { MovieInterface } from '@/types';
import MovieCardTop10 from '@/components/MovieCardTop10';
import { isEmpty } from 'lodash';
import { stableKeys } from '@/utils/stableKeys';
import ReelHeading from '@/modules/elements/ReelHeading';

type Props = {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
}

function SlickNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (    
    <div className={className} onClick={onClick}><ChevronRightIcon strokeWidth={1.5}/></div>
  );
}

function SlickPrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}><ChevronLeftIcon strokeWidth={1.5}/></div>
  );
}

const Top10 = ({ data, title, portrait }:Props) => {
  if (isEmpty(data)) {
    return null;
  }
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7.2,
    slidesToScroll: 7,
    swipeToSlide: true,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
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
        breakpoint: 1600,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3.3,
          slidesToScroll: 3,
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
  let i = 1;
  let j = 1;
  return (
    <div className={`pl-4 md:pl-16 mb-[3vw] movieSlider`}>
      <div className={`movieSliderInner`}>
        <ReelHeading title={title} />
        <div className={`gap-2`}>
            <div className="block lg:hidden">
                <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
                {data?.map((movie, index) => (
                    (i<=11)?<MovieCardTop10 key={stableKeys[index]} data={movie} number={i++} portrait={true} />:null
                ))}
                </div>
            </div>
            <div className="hidden lg:block gap-2">
                <Slider {...settings}>
                {data?.map((movie, index) => (                
                    (j<=11)?<MovieCardTop10 key={stableKeys[index]} data={movie} number={j++} portrait={true} />:null
                ))}
                </Slider>  
            </div> 
        </div>
      </div>
    </div>
  );
}

export default Top10;
