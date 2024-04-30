import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import { useRouter } from 'next/router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { MovieInterface } from '@/types';
import MovieCardReelBorderd from '@/modules/elements/MovieCardReelBorderd';
import MovieCardReelPortrait from '@/modules/elements/MovieCardReelPortrait';
import ReelHeading from '@/modules/elements/ReelHeading';
import { isEmpty } from 'lodash';
import { stableKeys } from '@/utils/stableKeys';


type Props = {
  data: MovieInterface[];
  title: string;
  link?: string;
  linkText?: string;
  isBoxesLayout?: boolean;
  module: any
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

const RollBordered = ({ data, title, link, linkText, isBoxesLayout }:Props) => {
  const [viewAllUrl, setViewAllUrl] = React.useState('');
  const router = useRouter();
  if (isEmpty(data)) {
    return null;
  }
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6.2,
    slidesToScroll: 6,
    swipeToSlide: true,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    responsive: [
      {
        breakpoint: 2400,
        settings: {
          slidesToShow: 5.2,
          slidesToScroll:  5,
        },
      },
      {
        breakpoint: 1140,
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
  useEffect(() => {
    if (Array.isArray(data) && data?.length > 0){
      setViewAllUrl( '/categories/bundle');
    }
  }, [data]);
  const ReelContent = ()=> (<div className={`mt-[2vw] mb-[3vw] movieSlider portrait`}>
    <div className="movieSliderInner">
      <ReelHeading 
        title={title}
        link={viewAllUrl}
        linkText={'Explore All'}
        />
      <div className="block lg:hidden">
        <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
          {data?.map((movie, index) => (
            <MovieCardReelPortrait key={stableKeys[index]} data={movie}/>
          ))}
        </div>
      </div>
      <div className="hidden lg:block movieSliderReel">
        <Slider {...settings}>
          {data?.map((movie, index) => (
            <MovieCardReelBorderd key={stableKeys[index]} data={movie}/>
          ))}
        </Slider>  
      </div> 
    </div>
  </div>);
  return (<>{(Array.isArray(data) && data.length > 0)?(isBoxesLayout === true)?<><div className="w-full overflow-hidden"><div className="max-w-[1600px] mx-auto px-[15px]"><div className="overflow-hidden movieBoxsInside">{ReelContent()}</div></div></div></>:<div className='pl-4 md:pl-16 mt-2 pr-2'>{ReelContent()}</div>:null}</>);
}

export default RollBordered;

