import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
}

function SlickNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
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
    slidesToShow: 6.3,
    slidesToScroll: 6,
    swipeToSlide: true,
    adaptiveHeight: true,

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
    ]
  };

  return (
    <div className={`px-4 md:px-12 mb-[3vw] movieSlider ${portrait ? 'portrait': ""}`}>
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className={`gap-2  `}>
        <Slider {...settings}>
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} portrait={portrait} />
          ))}
        </Slider>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
