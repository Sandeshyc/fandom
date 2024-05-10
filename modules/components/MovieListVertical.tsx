import React, {useEffect, useState} from 'react';
import { MovieInterface } from '@/types';
import { NoMovies } from '@/modules/Identities/NoFound';
import ReelHeading from '@/modules/elements/ReelHeading';
import MovieCardPurchase from '@/components/MovieCardPurchase';
import { stableKeys } from '@/utils/stableKeys';
import PurchasesAll from '@/modules/elements/PurchasesAll';
import useClientLocaion from "@/hooks/useClientLocaion";

type Props = {
    data:MovieInterface[];
    title?: string;
    isBoxesLayout?: boolean;
    link?: string;
    linkText?: string;
};
const MovieListVertical = ({ data, title, link, linkText, isBoxesLayout = false }:Props) => {
    const [openTab, setOpenTab] = useState(0);
    const [userId, setUserId] = useState('');
    const {data: clientLocation, error: locationError}:any = useClientLocaion();
    const region = clientLocation?.country?.isoCode;
    
    const handelTabChange = (tab:number) => {
        setOpenTab(tab);
    };

    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo'); 
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserId(userInfoObj.sub);
          }
        }   
    }, []);
    const ActiveItems = data;

    const ReelContent = () => (<div className={` z-10 relative mb-[3vw]`}>
        <div className='px-2'>
            <ReelHeading 
            title={title} 
            link={link}
            linkText={linkText}
            />
        </div>
        <ul className='text-white flex flex-wrap text-center mt-0 my-8 px-2 w-full'>
            <li className={`text-white border-2 flex justify-center items-center ${(openTab === 0)?'border-white bg-blue-500':'border-gray-500'} rounded-full h-[40px] py-2 px-4 mr-2 md:mr-4 lg:mr-8 min-w-[100px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
              onClick={() => handelTabChange(0)}
              >Active</li>
            <li className={`text-white border-2 flex justify-center items-center ${(openTab === 1)?'border-white bg-blue-500':'border-gray-500'} rounded-full h-[40px] py-2 px-4 mr-2 min-w-[100px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
              onClick={() => handelTabChange(1)}
              >Expire</li>
        </ul>
        <div className={`${(openTab === 0)?'flex flex-wrap w-full':'hidden'}`}>            
            {(Array.isArray(ActiveItems) && ActiveItems?.length > 0)?
                ActiveItems.map((item:MovieInterface, index:number) => (
                <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4' key={stableKeys[index]}>
                    <MovieCardPurchase
                    data={item}
                    />
                </div>
            )):
            <NoMovies/>}
        </div>
        <div className={`${(openTab === 1)?'flex flex-wrap w-full':'hidden'}`}>
            {(openTab === 1)&&(
                <PurchasesAll 
                data={{
                    userId: userId,
                    countryCode: region
                }}/>
            )}
        </div>
  </div>);

  return (<>
    {(isBoxesLayout === true)?
    <><div className="w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto pb-[15px]">
            <div className="overflow-hidden movieBoxsInside">
                {ReelContent()}
            </div>
        </div>
    </div></>:
    <div className='container mx-auto max-w-[2400px] px-4 mt-2 min-h-[70vh]'>
        {ReelContent()}
    </div>}
    </>
  );
};
export default MovieListVertical;