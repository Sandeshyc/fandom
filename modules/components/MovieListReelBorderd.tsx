import React from 'react';
import Slider from "react-slick";
import { useRouter } from 'next/router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 'globalStyles.scss'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import MovieCardReelBorderd from '@/modules/elements/MovieCardReelBorderd';
import ReelHeading from '@/modules/elements/ReelHeading';
import { isEmpty } from 'lodash';
import { stableKeys } from '@/utils/stableKeys';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
  link?: string;
  linkText?: string;
  gradient?: boolean;
}

function SlickNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    
    <div className={className} onClick={onClick}><ChevronRightIcon strokeWidth={2.5}/></div>
  );
}

function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}><ChevronLeftIcon strokeWidth={2.5}/></div>
  );
}

const MovieListReel: React.FC<MovieListProps> = ({ data, title, portrait, link, linkText, gradient = false }) => {
  const router = useRouter();
  if (isEmpty(data)) {
    return null;
  }
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: portrait ? 6.3 : 4.2,
    slidesToScroll: portrait ? 6 : 4,
    swipeToSlide: true,
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

  return (
    <div className={`mt-[2vw] mb-[3vw] movieSlider ${portrait ? 'portrait': ""}`}>
      <div className="movieSliderInner">
        <ReelHeading 
          title={title} 
          link={link}
          linkText={linkText}
          />
        <div className="block lg:hidden">
          <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
            {data?.map((movie, index) => (
              <MovieCardReelBorderd key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient}/>
            ))}
          </div>
        </div>
        <div className="hidden lg:block movieSliderReel">
          <Slider {...settings}>
            {data?.map((movie, index) => (
              <MovieCardReelBorderd key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient}/>
            ))}
          </Slider>  
        </div> 
      </div>
    </div>
  );
}

export default MovieListReel;

