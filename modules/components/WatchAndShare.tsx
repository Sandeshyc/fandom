import React from 'react';
import { useRouter } from 'next/router';
import PlayButton from '@/components/PlayButton';
import WatchTrailerBtn from '@/components/WatchTrailerBtn';
import Buy from '@/components/Buy';
import FavoriteButton from '@/components/FavoriteButton';
import Buttons from '@/components/identites/Buttons';
import { ThumbUp, RestartAlt } from '@mui/icons-material';
import { ShareIcon } from '@heroicons/react/24/solid';
import { PlayIcon } from '@heroicons/react/24/solid';
import { stableKeys } from '@/utils/stableKeys';
import {ReportProblem} from '@mui/icons-material';
import useIsMobile from '@/hooks/useIsMobile';
import WatchAndBuy from '@/modules/components/WatchAndBuy';
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';

type dataProps = {
    data: any;
}
const MovieSummary = ({data}:dataProps) => {
    const router = useRouter();
    const isMobile = useIsMobile();
    return (<>{(isMobile)?(<>
    <WatchAndBuy data={data}/>
    <div className='px-4'>
        <ShareBtnGroup data={data}/>
    </div>
    </>):<div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
      {(data?.canBuy === false && Array.isArray(data?.messages) && data?.messages.length) ?  (
        <div className='border border-yellow-500 p-2 flex flex-wrap mb-2 rounded-md bg-black bg-opacity-40 max-w-[410px]'>
            <div className='w-[30px]'>
                <ReportProblem
                sx={{ 
                    color: '#EAB307',
                    fontSize: '24px',
                    marginRight: '10px',
                }}/>
            </div>
            <div className='w-[180px] flex-grow'>
                {data.messages.map((message : string, index : number) => <p key={stableKeys[index]}>{message}</p>)}
            </div>
        </div>): null}
        <div className="flex flex-row gap-4 items-center lg:mb-5 flex-wrap">
            {(data)?<>{(data?.allowed)?(<>{data?.isPackage ? null : (data?.currentTime)?(<Buttons
            onClick={() => router.push(`/watch/${data?._id}`)} 
            type='white'><PlayIcon className="w-6 text-black mr-2" /> Resume</Buttons>):(<PlayButton movieId={data?._id}/>)}</>):(
            <Buy 
                movieId={data?._id} 
                allowedPlans={data?.allowedPlans}
                messages={data?.messages}
                allowed={data?.allowed}
                data={data}
                />
            )}              
            {data?.isPackage ? null : (data?.allowed && data?.currentTime)?(<Buttons
            onClick={() => router.push(`/watch/${data?._id}?t=restart`)} 
            type='white'><RestartAlt className="w-6 text-black mr-2" /> Restart</Buttons>):(<WatchTrailerBtn movieId={data?._id} />)}</>:null}
            <div className='flex flex-row gap-8 items-center mb-0 flex-wrap'>
            <FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>
            <div className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition">
                <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
            </div>
            </div>
        </div>
    </div>}</>);
  
}
export default MovieSummary;