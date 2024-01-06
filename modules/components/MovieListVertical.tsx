import { type } from 'os';
import React from 'react';
import { MovieInterface } from '@/types';
import { NoMovies } from '@/modules/Identities/NoFound';
import ReelHeading from '@/modules/elements/ReelHeading';
import MovieCardPurchase from '@/components/MovieCardPurchase';
import { stableKeys } from '@/utils/stableKeys';
type Props = {
    data:MovieInterface[];
    title?: string;
    isBoxesLayout?: boolean;
    link?: string;
    linkText?: string;
};
const MovieListVertical = ({ data, title, link, linkText, isBoxesLayout = false }:Props) => {
    const [openTab, setOpenTab] = React.useState(0);
    const ExpairedItems = data.filter((item:MovieInterface) => {
        return item.endTime < new Date().toISOString();
    });
    const ActiveItems = data.filter((item:MovieInterface) => {
        return item.endTime > new Date().toISOString();
    });
    const ReelContent = () => (<div className={` z-10 relative mt-[2vw] mb-[3vw]`}>
        <div className='px-2'>
            <ReelHeading 
            title={title} 
            link={link}
            linkText={linkText}
            />
        </div>
        <ul className='text-white flex flex-wrap text-center mt-0 my-8 px-2'>
            <li className={`text-white border-2 flex justify-center items-center ${(openTab === 0)?'border-white bg-blue-500':'border-gray-500'} rounded-full h-[40px] py-2 px-4 mr-2 md:mr-4 lg:mr-8 min-w-[100px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
              onClick={() => setOpenTab(0)}
              >Active</li>
            <li className={`text-white border-2 flex justify-center items-center ${(openTab === 1)?'border-white bg-blue-500':'border-gray-500'} rounded-full h-[40px] py-2 px-4 mr-2 min-w-[100px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
              onClick={() => setOpenTab(1)}
              >Expired</li>
        </ul>
        <div className={`${(openTab === 0)?'flex flex-wrap':'hidden'}`}>
            {(Array.isArray(ActiveItems) && ActiveItems?.length > 0)?ActiveItems.map((item:MovieInterface, index:number) => (
                <>
                <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4'>
                    <MovieCardPurchase
                    key={stableKeys[index]}
                    data={item}
                    />
                </div>
                </>
            )):<NoMovies/>}
        </div>
        <div className={`${(openTab === 1)?'flex flex-wrap':'hidden'}`}>
            {(Array.isArray(ExpairedItems) && ExpairedItems?.length > 0)?ExpairedItems.map((item:MovieInterface, index:number) => (
                <>
                <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4'>
                    <MovieCardPurchase
                    key={stableKeys[index]}
                    data={item}
                    />
                </div>
                </>
            )):<NoMovies/>}
        </div>
  </div>);

  return (<>
    {(Array.isArray(data) && data.length > 0)?(isBoxesLayout === true)?<><div className="w-full overflow-hidden"><div className="max-w-[1600px] mx-auto px-[15px]"><div className="overflow-hidden movieBoxsInside">{ReelContent()}</div></div></div></>:
    <div className='px-4 mt-2'>{ReelContent()}</div>:
    null}
    </>
  );
};
export default MovieListVertical;