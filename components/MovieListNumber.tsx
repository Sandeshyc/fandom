import React, {useRef} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import SvgNumbers, {SvgNumberModak} from '@/utils/SvgNumbers';

import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import { get, isEmpty } from 'lodash';
import Locked from '@/components/Locked';

interface MovieListNumberProps {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
  setCurrentMovie: Function;
  className : string;
}

function SlickNextArrow(props : object) {
  const { className, style, onClick } = props;
  return (
    <div className="w-[40px] h-full absolute z-40 right-[-40px] top-0 flex items-center bg-gray-700   text-white  cursor-pointer bg-opacity-40 opacity-30  group-hover:opacity-100" onClick={onClick}><ChevronRightIcon strokeWidth={2.5}/></div>
  );
}

function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="w-[40px] h-full absolute z-40 right-[100%] top-0 flex items-center bg-gray-700   text-white cursor-pointer bg-opacity-40 opacity-30  group-hover:opacity-100 transition-opacity" onClick={onClick}><ChevronLeftIcon strokeWidth={2.5}/></div>
  );
}

const MovieListNumber: React.FC<MovieListNumberProps> = ({ data, title, portrait, setCurrentMovie, className, itemEnded }) => {
  if (isEmpty(data)) {
    return null;
  }
  const [current, setCurrent] = React.useState(0);
  const sliderRef = useRef(null);

  let settings = {
    arrows: false,
    dots: false,
    infinite: false,
    swipeToSlide :false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ]
   
    // adaptiveHeight: true,
    // nextArrow: <SlickNextArrow />,
    // prevArrow: <SlickPrevArrow />,

    
  };

  const hendleSlideChange = (e, movie) => {
    console.log('e', e.currentTarget.dataset.index, current);
    setCurrentMovie(movie);
    setCurrent(parseInt(e.currentTarget.dataset.index));
  }

  const hendlePrev = () => {
    const index = (current > 0 ? current  - 1 : 0);
    setCurrent(parseInt(index));
    setCurrentMovie(data[index]);
    sliderRef.current.slickGoTo(index);
  }
  const hendleNext = () => {
    const index = ((current < data?.length - 1)  ? current  + 1 : data?.length - 1);
    console.log('index - ', index)
    setCurrent(parseInt(index));
    setCurrentMovie(data[index]);
    sliderRef.current.slickGoTo(index);
  }

  // if itemEnded is true then change slide to next slide
  React.useEffect(() => {
    console.log('itemEnded', itemEnded);
    if(itemEnded !== 1){
      hendleNext();
    }
  }, [itemEnded]);



  // on click slide change to current slide


  const getSlides = () => { 
    let i = 0;
    return data.map((movie) => {
   
    return (
      <div key={movie.id} data-index={i}   onClick={e => hendleSlideChange(e, movie)}>
        <div className="movieListNumberCard grid grid-cols-12 items-center px-3 group cursor-pointer"  >
          <span className={`col-span-3 relative z-10 w-auto h-[50%] flex justify-end font-monoton text-white leading-[1] ${i === parseInt(current)? 'opacity-100' : 'opacity-50'}`}>
            <SvgNumberModak item={i + 1} />
          </span>

          <div className={`col-span-9 relative z-20 shadow-lg  transition origin-left -translate-x-4  ${i++ === parseInt(current)? 'translate-x-2 scale-105' : ''}`}>
          {(!data?.allowed)?<Locked/>:null}
            <img src={get(movie, 'thumbnailUrl')} className="w-full  object-cover rounded-lg" />
          </div>
        </div>
      </div>
    )
  }) };

  return (
    <div className={`group px-4 md:px-12 mb-[3vw] movieSlider ${className} ${portrait ? 'portrait': ""}`}>
      <div>
        {/* <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title} x</p> */}
        <div className={`gap-2 relative`}>

          {current > 0 && <SlickPrevArrow onClick={hendlePrev} />}

          <div className='relative z-10'>
            <Slider {...settings} ref={sliderRef} >
              {getSlides()}
            </Slider>
          </div>
          
          {current < data.length -1 && <SlickNextArrow onClick={hendleNext} />}

        </div>
      </div>
    </div>
  );
}

export default MovieListNumber;
