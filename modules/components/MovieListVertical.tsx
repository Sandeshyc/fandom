import { type } from 'os';
import React, {useEffect, useState} from 'react';
import { MovieInterface } from '@/types';
import { NoMovies } from '@/modules/Identities/NoFound';
import ReelHeading from '@/modules/elements/ReelHeading';
import MovieCardPurchase from '@/components/MovieCardPurchase';
import useAllTickets from '@/hooks/useAllTickets';
import SkeletonListCard from '@/components/Skeleton/ListCard';
import { stableKeys } from '@/utils/stableKeys';
type Props = {
    data:MovieInterface[];
    title?: string;
    isBoxesLayout?: boolean;
    link?: string;
    linkText?: string;
};
const MovieListVertical = ({ data, title, link, linkText, isBoxesLayout = false }:Props) => {
    if(Array.isArray(data) && data?.length > 0 ) {
        data = data.filter((item: any) => item && item._id);
    }
    // console.log('data', data);
    const [openTab, setOpenTab] = useState(0);
    const [userId, setUserId] = useState('');
    const [allTicketsItems, setAllTicketsItems] = useState([]);
    const [allTicketsLoaded, setAllTicketsLoaded] = useState(false);
    const {
        getAllTickets
    } = useAllTickets();
    
    const handelTabChange = (tab:number) => {
        setOpenTab(tab);
        if(tab === 1) {
            setAllTickets();
        }
    };

    const setAllTickets = () => {
        const _getAllTickets = async (userId:string) => {
            let allTickets = await getAllTickets(userId);
            if(Array.isArray(allTickets) && allTickets?.length > 0 ) {
                allTickets = allTickets.filter((item: any) => item && item._id);
            }
            setAllTicketsItems(allTickets);
            setAllTicketsLoaded(true);
            console.log('allTickets: ', allTickets);
        };
        if(userId) {
            _getAllTickets(userId);
        }else {
            const userInfo = window.localStorage.getItem('userInfo');
            if (userInfo) {
                const userInfoObj = JSON.parse(userInfo);
                if(userInfoObj.sub) {
                  setUserId(userInfoObj.sub);
                  _getAllTickets(userInfoObj.sub);
                }
            }
        }
    }

    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo'); 
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserId(userInfoObj.sub);
          }
        }        
    }, []);

    const ExpairedItems = data.filter((item:MovieInterface) => {
        return item.endTime < new Date().toISOString();
    });
    // const ActiveItems = data.filter((item:MovieInterface) => {
    //     return item.endTime > new Date().toISOString();
    // });
    const ActiveItems = data;
    // check data?_id is available

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
              >All</li>
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
            {(allTicketsLoaded)?
                <>{(Array.isArray(allTicketsItems) && allTicketsItems?.length > 0)?allTicketsItems.map((item:MovieInterface, index:number) => (
                <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4' key={stableKeys[index]}>
                    <MovieCardPurchase
                    data={item}
                    />
                </div>
                )):<NoMovies/>}
                </>:
            <div className="flex flex-wrap w-full">
                <SkeletonListCard count={5}/>
            </div>
            }
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