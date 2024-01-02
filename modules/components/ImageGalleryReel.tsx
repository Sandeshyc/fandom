import React from 'react';
import Slider from "react-slick";
import { useRouter } from 'next/router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { MovieInterface } from '@/types';
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
  isBoxesLayout?: boolean;
}

function SlickNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    
    <div className={className} onClick={onClick}><ChevronRightIcon strokeWidth={1.5}/></div>
  );
}

function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}><ChevronLeftIcon strokeWidth={1.5}/></div>
  );
}

const ImageGalleryReel: React.FC<MovieListProps> = ({ data, title, portrait, link, linkText, gradient = false, isBoxesLayout = false }) => {
  console.log(data?.title, data?.imageGalleryUrls);
  const router = useRouter();
  let items = [];
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
  if(Array.isArray(data?.imageGalleryUrls) && data?.imageGalleryUrls?.length > 0 ) {
    items = data?.imageGalleryUrls.filter((item: any) => item !== null);
  }
  const ReelContent = ()=> (<div className={` z-10 relative mt-[2vw] mb-[3vw] movieSlider ${portrait ? 'portrait': ""}`}>
    <div className="movieSliderInner">
      <ReelHeading 
        title={title} 
        link={link}
        linkText={linkText}
        />
      <div className="block lg:hidden">
        <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
          {/* {items?.map((movie, index) => (
            <p>Need to Update</p>
          ))} */}
          <p>Need to Update</p>
        </div>
      </div>
      <div className="hidden lg:block movieSliderReel">
      <p>Need to Update</p>
        {/* <Slider {...settings}>
          {items?.map((movie, index) => (
            
          ))}
        </Slider>   */}
      </div> 
    </div>
  </div>);

  return (<>
    {(Array.isArray(items) && items.length > 0)?(isBoxesLayout === true)?<><div className="w-full overflow-hidden"><div className="max-w-[1600px] mx-auto px-[15px]"><div className="overflow-hidden movieBoxsInside">{ReelContent()}</div></div></div></>:<div className='pl-4 md:pl-16 mt-2'>{ReelContent()}</div>:null}
    </>
  );
}

export default ImageGalleryReel;

