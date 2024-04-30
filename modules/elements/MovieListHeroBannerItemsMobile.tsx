import React, {useRef} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stableKeys } from '@/utils/stableKeys';
import { MovieInterface } from '@/types';
import { get, isEmpty } from 'lodash';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import NotAllowed from '@/modules/Identities/NotAllowed';
import { getThumbnailLandscape } from '@/utils/getData';
import CardHeader from "@/modules/elements/CardHeader";
import CardFooter from "@/modules/elements/CardFooter";
interface MovieListNumberProps {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
  setCurrentMovie: Function;
  className : string;
  itemEnded: number;
}


const MovieListHeroBannerItemsMobile = ({ data, title, portrait, setCurrentMovie, className, itemEnded }:MovieListNumberProps) => {
  if (isEmpty(data)) {
    return null;
  }
  const [current, setCurrent] = React.useState(0);
  const sliderRef = useRef(null);

  const hendleSlideChange = (e, movie) => {
    // console.log('e', e.currentTarget.dataset.index, current);
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
    const bannerThumb = getThumbnailLandscape(movie); 
    return (
      <div key={stableKeys[index]} data-index={i}  onClick={e => hendleSlideChange(e, movie)} className='movieCardNumber mb-2'>
        <div className="w-full aspect-video cursor-pointer">
          <div className={`bg-gray-800 w-full h-full rounded-md col-span-9 relative ${i++ === parseInt(current)?'scale-105 z-30 shadow-2xl border-2 border-white/80':'z-20 shadow-lg'}`}>
            <CardHeader header={movie?.header} />
            {(bannerThumb)?
              <img src={bannerThumb} alt={movie?.title} className="w-full h-full object-contain rounded-lg" />
            :
              <div className="w-full h-full bg-gray-800 text-zinc-500 flex justify-center items-center text-center">{movie?.title}</div>
            }
            <div className="absolute left-0 bottom-0 w-full">
              <CardFooter footer={movie?.footer} />
            </div>
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
              <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide pl-1 py-2'>
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
