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


const MovieListHeroBannerItemsMobile = ({ data, title, portrait, setCurrentMovie, className, itemEnded }:MovieListNumberProps) => {
  if (isEmpty(data)) {
    return null;
  }
  const [current, setCurrent] = React.useState(0);
  const sliderRef = useRef(null);

  const hendleSlideChange = (e, movie) => {
    console.log('e', e.currentTarget.dataset.index, current);
    setCurrentMovie(movie);
    setCurrent(parseInt(e.currentTarget.dataset.index));
  }

  const hendleNext = () => {
    const index = ((current < data?.length - 1)  ? current  + 1 : data?.length - 1);
    // console.log('index - ', index)
    setCurrent(parseInt(index));
    setCurrentMovie(data[index]);
    sliderRef?.current.slickGoTo(index);
  }

  // if itemEnded is true then change slide to next slide
  React.useEffect(() => {
    // console.log('itemEnded', itemEnded);
    if(itemEnded !== 1){
      hendleNext();
    }
  }, [itemEnded]);

  const getSlides = () => { 
    let i = 0;
    return data.map((movie:any, index:number) => {   
    return (
      <div key={stableKeys[index]} data-index={i}  onClick={e => hendleSlideChange(e, movie)} className='movieCardNumber mb-[-6px]'>
        <div className="w-full aspect-video cursor-pointer">
          <div className={`bg-gray-800 w-full h-full rounded-md col-span-9 relative ${i++ === parseInt(current)?'scale-105 z-30 shadow-2xl border-4 border-white/80':'z-20 shadow-lg'}`}>
            {(movie?.allowed)?<PurchaseBadge/>:
            (movie?.canBuy === false)?<NotAllowed message='Region Restricted'/>:
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
          <div className='relative z-10'>
            <div className="block lg:hidden">
              <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
                {getSlides()}
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default MovieListHeroBannerItemsMobile;
