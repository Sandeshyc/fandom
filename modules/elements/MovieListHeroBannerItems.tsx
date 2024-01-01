import React, {useRef} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { stableKeys } from '@/utils/stableKeys';

import { MovieInterface } from '@/types';
import { get, isEmpty } from 'lodash';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import NotAllowed from '@/modules/Identities/NotAllowed';

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
    <div className="slick-arrow slick-next hidden lg:block" onClick={onClick}><ChevronRightIcon strokeWidth={1.5}/></div>
  );
}

function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="slick-arrow slick-prev hidden lg:block" onClick={onClick}><ChevronLeftIcon strokeWidth={1.5}/></div>
  );
}

const MovieListHeroBannerItems = ({ data, title, portrait, setCurrentMovie, className, itemEnded }) => {
  if (isEmpty(data)) {
    return null;
  }
  const [current, setCurrent] = React.useState(0);
  const sliderRef = useRef(null);
  // console.log('itemEnded',title, data);
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

  const getSlides = () => { 
    let i = 0;
    return data.map((movie, index) => {
   
    return (
      <div key={stableKeys[index]} data-index={i}  onClick={e => hendleSlideChange(e, movie)} className='movieCardNumber'>
        <div className="w-full aspect-video cursor-pointer">
          <div className={`bg-gray-800 w-full h-full rounded-md col-span-9 relative ${i++ === parseInt(current)?'scale-105 z-30 shadow-2xl border-4 border-white/80':'z-20 shadow-lg'}`}>
            {(movie?.allowed)?<PurchaseBadge/>:
            (movie?.canBuy === false)?<NotAllowed/>:
            null}
            <img src={get(movie, 'thumbnailUrl')} className="w-full h-full object-contain rounded-lg" />
          </div>
        </div>
      </div>
    )
  }) };

  return (
    <div className={`group movieSlider ${className} ${portrait ? 'portrait': ""}`}>
      <div>
        <div className={`gap-2 relative`}>
          {current > 0 && <SlickPrevArrow onClick={hendlePrev} />}
          <div className='relative z-10'>
            <div className="block lg:hidden">
              <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
                {getSlides()}
              </div>
            </div>
            <div className="hidden lg:block movieSliderReel">
              <Slider {...settings} ref={sliderRef} >
                {getSlides()}
              </Slider>
            </div> 
          </div>          
          {current < data.length -1 && <SlickNextArrow onClick={hendleNext} />}
        </div>
      </div>
    </div>
  );
}

export default MovieListHeroBannerItems;
