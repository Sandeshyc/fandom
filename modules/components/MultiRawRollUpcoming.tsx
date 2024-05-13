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
    const ReelContent = ()=> (<div className={`z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] ${(isMobile) ? 'portrait': ""}`}>
        <div className="movieSliderInner">
            <ReelHeading 
                title={title} 
                />
            <div className='flex flex-wrap mx-[-7px] lg:mx-[-15px] mt-2'>
                {data?.map((movie, index) => (
                    <div className="w-full md:w-1/2 xl:w-1/3 3xl:w-1/4 p-[7px] lg:p-[15px] pt-0 mb-6">
                        <EventCardReel key={stableKeys[index]} data={movie} portrait={portrait} gradient={gradient}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
    return (
        <div className={`px-4 max-w-[2400px] mx-auto min-h-[70vh]`}
        style={{
            marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
        }}
        >
            {ReelContent()}
        </div>
    );
};
export default MultiRawRollUpcoming;


