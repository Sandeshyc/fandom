import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import MovieCardReel from '@/modules/elements/MovieCardReel';
import MovieCardReelPortrait from '@/modules/elements/MovieCardReelPortrait';
import useIsMobile from '@/hooks/useIsMobile';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { stableKeys } from '@/utils/stableKeys';
import ReelHeading from '@/modules/elements/ReelHeading';
function SlickNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (    
      <div className={className} onClick={onClick}><ChevronRightIcon strokeWidth={1.5}/></div>
    );
}
  
function SlickPrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}><ChevronLeftIcon strokeWidth={1.5}/></div>
    );
}
let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.2,
    slidesToScroll: 4,
    swipeToSlide: true,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 3,
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
const RelatedMovies = ({data}:{data:any}) => {    
  const isMobile = useIsMobile();
    return (
        <div className={`mt-8 lg:mt-16 ${(isMobile)?'portrait':''}`}>
          <ReelHeading 
            title='Related Movies'
            />
            <div className="block lg:hidden ">
                <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
                    {data?.map((movie:any, index:number) => (
                        <MovieCardReelPortrait key={stableKeys[index]} data={movie} portrait={isMobile}/>
                    ))}
                </div>
            </div>
            <div className="hidden lg:block overflow-hidden movieSliderReel movieBoxsInside movieSliderInner mt-4">
                <div className="movieSlider">
                    <Slider {...settings}>
                        {Array.isArray(data) && data?.length > 0 && data.map((item: any, index: number) => (
                            <div key={stableKeys[index]} className="related-movie">
                                <MovieCardReel data={item} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
export default RelatedMovies;