import React from "react";
import EventCardReel from '@/modules/elements/EventCardReel';
import ReelHeading from '@/modules/elements/ReelHeading';
import { isEmpty } from 'lodash';
import { stableKeys } from '@/utils/stableKeys';
import useIsMobile from '@/hooks/useIsMobile';
import { MovieInterface } from '@/types';
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
const MultiRawRollUpcoming: React.FC<MovieListProps> = ({ data, title, source, portrait, link, linkText, gradient = false, isBoxesLayout = false, marginTop=false }) => {
    const isMobile = useIsMobile();    
    const ReelContent = ()=> (<div className={`max-w-[2400px] mx-auto z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${(isMobile) ? 'portrait': ""}`}>
        <div className="movieSliderInner">
            <ReelHeading 
                title={'Upcoming'} 
                link={''} 
                linkText={'Explore All'}
                />
            <div className='flex flex-wrap py-4 md:mx-[-10px] pr-4'>
                {data?.map((movie, index) => (
                    <div className="w-full md:w-1/2 xl:w-1/3 3xl:w-1/4 md:p-[10px] mb-6 md:mb-0">
                        <EventCardReel key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
    return (
        <div className={`pl-4 lg:pl-16 mt-2 min-h-[70vh]`}
        style={{
            marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
        }}
        >
            {ReelContent()}
        </div>
    );
};
export default MultiRawRollUpcoming;


