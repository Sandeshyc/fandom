import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { MovieInterface } from '@/types';
import MovieCardTop from '@/components/MovieCardTop';
import { isEmpty } from 'lodash';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
}

function SlickNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    
    <div className={className} onClick={onClick}><ChevronRightIcon/></div>
  );
}

function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}><ChevronLeftIcon/></div>
  );
}

const MovieList: React.FC<MovieListProps> = ({ data, title, portrait }) => {
  if (isEmpty(data)) {
    return null;
  }
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5.3,
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
  let i =1;

  return (
    <div className={`px-4 md:px-12 mb-[3vw] movieSlider `}>
      <div>
        <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4">{title}</p>
        <div className={`gap-2  `}>
        <Slider {...settings}>
          {
          data.map((movie) => (
            <MovieCardTop key={movie.id} data={movie} number={i++} portrait={portrait} />
          ))}
        </Slider>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
