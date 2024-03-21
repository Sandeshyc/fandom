import React, {use, useRef, useEffect} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { MovieInterface } from '@/types';
import EventCardReelMutliRaw from '@/modules/elements/EventCardReelMutliRaw';
import MovieCardReelPortraitMultiRaw from '@/modules/elements/MovieCardReelPortraitMultiRaw';
import ReelHeading from '@/modules/elements/ReelHeading';
import { isEmpty } from 'lodash';
import { stableKeys } from '@/utils/stableKeys';
import useIsMobile from '@/hooks/useIsMobile';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
  source: string;
  portrait: boolean;
  link?: string;
  linkText?: string;
  gradient?: boolean;
  isBoxesLayout?: boolean;
  marginTop?: boolean;
}

// Main Component
const MovieListReelMultiRaw: React.FC<MovieListProps> = ({ data, title, source, portrait, link, linkText, gradient = false, isBoxesLayout = false, marginTop=false }) => {
  const sliderRef = useRef(null);
  const [removedItem, setRemovedItem] = React.useState(null);
  // console.log('removedItem data: ', data);
  if(Array.isArray(data) && data?.length > 0 ) {
    data = data.filter((item: any) => item && item._id);
  }

  const [newData, setNewData] = React.useState(data);
  const isMobile = useIsMobile();

  useEffect(() => {
    // console.log('removedItem: ', removedItem);
    if (removedItem && Array.isArray(newData) && newData?.length > 0){
      const newDataTemp = newData?.filter((item: any) => {
        return (
          item?._id !== removedItem
        )
      }
      );
      setNewData(newDataTemp);
    }
  }, [removedItem]);

  const ReelContent = ()=> (<div className={`min-h-[70vh] z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${(isMobile || portrait) ? 'portrait': ""}`}>
    <div className="movieSliderInner">
      <ReelHeading 
        title={title} 
        />
      <div className="block lg:hidden">
        <div className='flex lg:flex flex-wrap mx-[-10px]'>
          {newData?.map((movie, index) => (
            <MovieCardReelPortraitMultiRaw key={stableKeys[index]} data={movie} portrait={isMobile || portrait} gradient={gradient} setRemovedItem={setRemovedItem}/>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex flex-wrap mx-[-20px]">
          {newData?.map((movie, index) => (
            <EventCardReelMutliRaw key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient} sliderRef={sliderRef} setRemovedItem={setRemovedItem}/>
          ))}
      </div> 
    </div>
  </div>);

  if (isEmpty(newData)) {
    return null;
  }

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
    <div className={`px-4 max-w-[2400px] mx-auto`}
    style={{
      marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
    }}>
      {ReelContent()}
    </div>:
    null}
    </>
  );
}

export default MovieListReelMultiRaw;

