import { type } from 'os';
import React from 'react';
import { MovieInterface } from '@/types';
import { NoMovies } from '@/modules/Identities/NoFound';
import ReelHeading from '@/modules/elements/ReelHeading';
import MovieCardList from '@/components/MovieCardList';
import { stableKeys } from '@/utils/stableKeys';
import useIsMobile from "@/hooks/useIsMobile";
type Props = {
    data:MovieInterface[];
    title?: string;
    isBoxesLayout?: boolean;
    link?: string;
    linkText?: string;
    marginTop?: boolean,
};
const MovieWatchList = ({ data, title, link, linkText, isBoxesLayout = false, marginTop = false, }:Props) => {
    const isMobile = useIsMobile();
    const ReelContent = () => (<div className={`z-10 relative mb-[3vw]`}>
        <div className='px-0'>
            <ReelHeading 
            title={title}
            />
        </div>
        <div className={`flex flex-wrap sm:mx-[-7px] xl:mx-[-14px]`}>
            {(Array.isArray(data) && data?.length > 0)?data.map((item:MovieInterface, index:number) => (
                <MovieCardList
                key={stableKeys[index]}
                data={item}
                />
            )):<NoMovies/>}
        </div>
  </div>);

  return (
    <>
      {isBoxesLayout === true ? (
        <>
          <div className="w-full overflow-hidden">
            <div className="max-w-[1600px] mx-auto pb-[15px]">
              <div className="overflow-hidden movieBoxsInside">
                {ReelContent()}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`px-4 max-w-[2400px] mx-auto min-h-[70vh]`}
          style={{
            marginTop: marginTop ? (isMobile ? "70px" : "120px") : "0px",
          }}
        >
          {ReelContent()}
        </div>
      )}
    </>
  );
};
export default MovieWatchList;