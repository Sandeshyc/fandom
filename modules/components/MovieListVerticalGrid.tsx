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
const MovieListVerticalGrid: React.FC<MovieListProps> = ({ data, title, source, portrait, link, linkText, gradient = false, isBoxesLayout = false, marginTop=false }) => {
    const isMobile = useIsMobile();    
    const ReelContent = ()=> (<div className={` z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${(isMobile) ? 'portrait': ""}`}>
        <div className="movieSliderInner">
            <ReelHeading 
                title={'Upcoming'} 
                link={''} 
                linkText={'Explore All'}
                />
            <div className='flex flex-wrap py-4 mx-[-15px]'>
                {Array.from({length: 15}, (_, i) => {
                    return (
                        <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-[15px]">
                            <EventCardReel key={i}/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    );
    return (
        <div className={`pl-4 lg:pl-16 mt-2`}
        style={{
            marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
        }}
        >
            {ReelContent()}
        </div>
    );
};
export default MovieListVerticalGrid;


