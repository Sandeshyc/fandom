import React, {useRef} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { stableKeys } from '@/utils/stableKeys';
import useIsMobile from '@/hooks/useIsMobile';
import { MovieInterface } from '@/types';
import { get, isEmpty } from 'lodash';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import NotAllowed from '@/modules/Identities/NotAllowed';
import { getThumbnailLandscape } from '@/utils/getData';
import CardHeader from "@/modules/elements/CardHeader";
import CardFooter from "@/modules/elements/CardFooter";

type MovieListNumberProps = {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
  setCurrentMovie: Function;
  className : string;
  itemEnded: number;
}

function SlickNextArrow(props : any) {
  const { className, style, onClick } = props;
  return (
    <div className="slick-arrow slick-next hidden lg:block" onClick={onClick}><ChevronRightIcon strokeWidth={1.5}/></div>
  );
}

function SlickPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className="slick-arrow slick-prev hidden lg:block" onClick={onClick}><ChevronLeftIcon strokeWidth={1.5}/></div>
  );
}

const MovieListHeroBannerItems = ({ data, title, portrait, setCurrentMovie, className, itemEnded }:MovieListNumberProps) => {
  if (isEmpty(data)) {
    return null;
  }
  const [current, setCurrent] = React.useState(0);
  const sliderRef = useRef(null);
  const isMobile = useIsMobile();
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

  const hendleSlideChange = (e:any, movie:any) => {
    // console.log('e', e.currentTarget.dataset.index, current);
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
    // console.log('index - ', index)
    setCurrent(parseInt(index));
    setCurrentMovie(data[index]);
    sliderRef.current.slickGoTo(index);
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
      // console.log('movie', movie);
      const bannerThumb = getThumbnailLandscape(movie);
      return (
        <div key={stableKeys[index]} data-index={i}  onClick={e => hendleSlideChange(e, movie)} className='movieCardNumber mb-[-6px]'>
          <div className="w-full aspect-[16/9] cursor-pointer">
            <div className={`bg-gray-800 w-full h-full rounded-md col-span-9 relative ${i++ === parseInt(current)?'scale-105 z-30 shadow-2xl border-4 border-white/80':'z-20 shadow-lg'}`}>
              <CardHeader header={movie?.header} />
              {bannerThumb ?
              <img src={bannerThumb} alt={movie?.title} className="w-full h-full object-contain rounded-lg text-zinc-500 flex justify-center items-center" />
              :
              <div className="w-full h-full bg-gray-800 rounded-lg text-zinc-500 flex justify-center items-center">{movie?.title}</div>
              }
              <div className="absolute left-0 bottom-0 w-full">
                <CardFooter footer={movie?.footer} />
              </div>
            </div>
          </div>
        </div>
      )
    }) 
  };

  return (
    <div className={`group movieSlider ${className} ${portrait ? 'portrait': ""}`}>
      <div>
        <div className={`gap-2 relative`}>
          {(!isMobile && current > 0) && <SlickPrevArrow onClick={hendlePrev} />}
          <div className='relative z-10'>
            <div className="block lg:hidden">
              <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide pb-2'>
                {getSlides()}
              </div>
            </div>
            <div className="hidden lg:block movieSliderReel movieSliderInner">
              <Slider {...settings} ref={sliderRef} >
                {getSlides()}
              </Slider>
            </div> 
          </div>          
          {(!isMobile && (current < data.length -1)) && <SlickNextArrow onClick={hendleNext} />}
        </div>
      </div>
    </div>
  );
}

export default MovieListHeroBannerItems;
