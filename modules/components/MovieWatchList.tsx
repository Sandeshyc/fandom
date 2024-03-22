import { type } from 'os';
import React from 'react';
import { MovieInterface } from '@/types';
import { NoMovies } from '@/modules/Identities/NoFound';
import ReelHeading from '@/modules/elements/ReelHeading';
import MovieCardList from '@/components/MovieCardList';
import { stableKeys } from '@/utils/stableKeys';
type Props = {
    data:MovieInterface[];
    title?: string;
    isBoxesLayout?: boolean;
    link?: string;
    linkText?: string;
};
const MovieWatchList = ({ data, title, link, linkText, isBoxesLayout = false }:Props) => {
    
    const ReelContent = () => (<div className={` z-10 relative mb-[3vw]`}>
        <div className='px-2'>
            <ReelHeading 
            title={title} 
            link={link}
            linkText={linkText}
            />
        </div>
        <div className={`flex flex-wrap`}>
            {(Array.isArray(data) && data?.length > 0)?data.map((item:MovieInterface, index:number) => (
                <MovieCardList
                key={stableKeys[index]}
                data={item}
                />
            )):<NoMovies/>}
        </div>
  </div>);

  return (<>
    {(isBoxesLayout === true)?
    <div className="w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto pb-[15px]">
            <div className="overflow-hidden movieBoxsInside">
                {ReelContent()}
            </div>
        </div>
    </div>
    :
    <div className='container mx-auto max-w-[2400px] px-4 mt-2 min-h-[80vh]'>{ReelContent()}</div>
    }
    </>
  );
};
export default MovieWatchList;