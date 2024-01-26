import React, {use, useRef, useEffect} from 'react';
import Slider from "react-slick";
import { useRouter } from 'next/router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { MovieInterface } from '@/types';
import MovieCardReel from '@/modules/elements/MovieCardReel';
import ReelHeading from '@/modules/elements/ReelHeading';
import { isEmpty } from 'lodash';
import { stableKeys } from '@/utils/stableKeys';
import useIsMobile from '@/hooks/useIsMobile';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
  portrait: boolean;
  link?: string;
  linkText?: string;
  gradient?: boolean;
  isBoxesLayout?: boolean;
  marginTop?: boolean;
}

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

// Main Component
const MovieListReel: React.FC<MovieListProps> = ({ data, title, portrait, link, linkText, gradient = false, isBoxesLayout = false, marginTop=false }) => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const [removedItem, setRemovedItem] = React.useState(null);
  if(Array.isArray(data) && data?.length > 0 ) {
    data = data.filter((item: any) => item !== null);
  }
  const [newData, setNewData] = React.useState(data);
  const isMobile = useIsMobile();

  if (isEmpty(newData)) {
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
  useEffect(() => {
    if (removedItem) {
      setNewData(newData.filter((item: any) => item._id !== removedItem));
    }
  }, [removedItem]);
  const ReelContent = ()=> (<div className={` z-10 relative mt-[2vw] mb-[3vw] movieSlider ${portrait ? 'portrait': ""}`}>
    <div className="movieSliderInner">
      <ReelHeading 
        title={title} 
        link={link}
        linkText={linkText}
        />
      <div className="block lg:hidden">
        <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
          {newData?.map((movie, index) => (
            <MovieCardReel key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient} setRemovedItem={setRemovedItem}/>
          ))}
        </div>
      </div>
      <div className="hidden lg:block movieSliderReel">
        <Slider
        ref={sliderRef}
        key={newData.length}
        {...settings}>
          {newData?.map((movie, index) => (
            <MovieCardReel key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient} sliderRef={sliderRef} setRemovedItem={setRemovedItem}/>
          ))}
        </Slider>  
      </div> 
    </div>
  </div>);

  return (<>
    {(Array.isArray(newData) && newData.length > 0)?(isBoxesLayout === true)?
    <>
    <div className={`w-full overflow-hidden`}
    style={{
      marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
    }}>
      <div className="max-w-[1600px] mx-auto px-[15px]">
        <div className="overflow-hidden movieBoxsInside">
          {ReelContent()}
        </div>
      </div>
    </div>
    </>:
    <div className={`pl-4 lg:pl-16 mt-2`}
    style={{
      marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
    }}>
      {ReelContent()}
    </div>:
    null}
    </>
  );
}

export default MovieListReel;

