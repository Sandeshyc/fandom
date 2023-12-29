import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { MovieInterface } from '@/types';
import MovieCardTop from '@/components/MovieCardTopV2';
import { isEmpty } from 'lodash';
import { stableKeys } from '@/utils/stableKeys';
import ReelHeading from '@/modules/elements/ReelHeading';

interface MovieListTopsV2Props {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
}

function SlickNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    
    <div className={className} onClick={onClick}><ChevronRightIcon strokeWidth={1.5}/></div>
  );
}

function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}><ChevronLeftIcon strokeWidth={1.5}/></div>
  );
}

const MovieListTopsV2: React.FC<MovieListTopsV2Props> = ({ data, title, portrait }) => {
  if (isEmpty(data)) {
    return null;
  }
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    swipeToSlide: true,
    // adaptiveHeight: true,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,

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
  let i = 1;
  let j = 1;
  return (
    <div className={`pl-4 md:pl-16 mb-[3vw] movieSlider `}>
      <div>
        <ReelHeading title={title} />
        <div className={`gap-2  `}>
        <div className="block lg:hidden">
            <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
              {data?.map((movie, index) => (
                (i<=10)?<MovieCardTop key={stableKeys[index]} data={movie} number={i++} portrait={portrait} />:null
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <Slider {...settings}>
              {data?.map((movie, index) => (                
                (j<=10)?<MovieCardTop key={stableKeys[index]} data={movie} number={j++} portrait={portrait} />:null
              ))}
            </Slider>  
          </div> 
        </div>
      </div>
    </div>
  );
}

export default MovieListTopsV2;
