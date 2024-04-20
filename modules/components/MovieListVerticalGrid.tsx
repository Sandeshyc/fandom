import React, {use, useRef, useEffect} from 'react';
import ReelHeading from '@/modules/elements/ReelHeading';
import { stableKeys } from '@/utils/stableKeys';
import useIsMobile from '@/hooks/useIsMobile';
import EventCardReelMutliRaw from '@/modules/elements/EventCardReelMutliRaw';
import { MovieInterface } from '@/types';
interface MovieListProps {
  data: MovieInterface[];
  items: MovieInterface[];
  title: string;
  source: string;
  portrait: boolean;
  link?: string;
  linkText?: string;
  gradient?: boolean;
  isBoxesLayout?: boolean;
  marginTop?: boolean;
}
const MovieListVerticalGrid: React.FC<MovieListProps> = ({ data, items, title, source, portrait, link, linkText, gradient = false, isBoxesLayout = false, marginTop=false }) => {

    // console.log('MovieListVerticalGrid data: ', data, title, source);
    const sliderRef = useRef(null);
  const [removedItem, setRemovedItem] = React.useState(null);
  // console.log('removedItem data: ', data);
  if(Array.isArray(items) && items?.length > 0 ) {
    items = items.filter((item: any) => item && item._id);
  }

  const [newData, setNewData] = React.useState(items);
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

    const ReelContent = ()=> (<div className={` z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${(isMobile) ? 'portrait': ""}`}>
        <div className="movieSliderInner">
            <ReelHeading 
            title={title} 
            link={''} 
            linkText={'Explore All'}
            />
            <div className='flex flex-wrap mx-[-7px] lg:mx-[-15px]'>
                {newData?.map((movie, index) => (
                    <EventCardReelMutliRaw key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient} sliderRef={sliderRef} setRemovedItem={setRemovedItem}/>
                ))}
            </div>
        </div>
    </div>
    );
    return (
        <div className={`pl-2 lg:pl-16 pr-2 lg:pr-4 mt-2 min-h-[80vh]`}
        style={{
            marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
        }}
        >
            {ReelContent()}
        </div>
    );
};
export default MovieListVerticalGrid;


