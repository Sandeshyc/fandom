import React, { useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import { PlayIcon } from '@heroicons/react/24/solid';
import FavoriteButton from '@/components/FavoriteButton';
import ViewDetailsBtn from '@/components/ViewDetailsBtn';
import { stableKeys } from '@/utils/stableKeys';
import ReactVideoPlayer from '@/components/ReactPlayer';
import { MovieInterface } from '@/types';

interface MovieCardProps {
  data?: MovieInterface;
  autoplay?: boolean;
  parentRef?: any;
  isMouseActive?: boolean;
}
const MovieCardPopOver: React.FC<MovieCardProps> = ({ data, autoplay, parentRef, isMouseActive }) => {
  const router = useRouter();
  const [popOverLeft, setPopOverLeft] = React.useState('');
  const [popOverRight, setPopOverRight] = React.useState('');
  const redirectToWatch = useCallback(() => router.push(`/details/${data?._id}`), [router, data?._id]);
  // console.log('Width:', parentRef?.getBoundingClientRect()?.width, 'Left:', parentRef?.getBoundingClientRect()?.left, 'Top:', parentRef?.getBoundingClientRect()?.top, 'left offset:', parentRef?.offsetLeft, 'Top offset:', parentRef?.offsetTop);
  // console.log('MovieCardPopOver: ', parentRef);
  useEffect(() => {
    // console.log('log ', isMouseActive?.toString());
    let width = parentRef?.getBoundingClientRect()?.width;
    let left = parentRef?.getBoundingClientRect()?.left;
    let right = window.innerWidth - (left + width);
    let popOverHalfWidth = width / 2;

    console.log('Width:', width, 'Left:', left, 'Right:', right, 'popOverHalfWidth:', popOverHalfWidth);
    if(left < popOverHalfWidth && right > popOverHalfWidth){
      setPopOverLeft('0px');
      setPopOverRight('auto');
    }else if(left > popOverHalfWidth && right < popOverHalfWidth){
      setPopOverLeft('auto');
      setPopOverRight('0px');
    }else{
      setPopOverLeft('0px');
      setPopOverRight('auto');
    }
      
    

    // console.log('Width:', parentRef?.getBoundingClientRect()?.width, 'Left:', parentRef?.getBoundingClientRect()?.left, 'Top:', parentRef?.getBoundingClientRect()?.top, 'left offset:', parentRef?.offsetLeft, 'Top offset:', parentRef?.offsetTop);
  }, [isMouseActive]);
  // console.log('MovieCardPopOver: ', data);
  return (
    <div 
      className={`asPopOver absolute top-0 transition duration-200 z-10 invisible sm:visible w-full ${(isMouseActive)?'scale-100 opacity-100':'scale-0 opacity-0'}`}
        style={{
          left: popOverLeft,
          right: popOverRight,
        }}>
        <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player"
        style={{backgroundImage: `url(${data?.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
        onClick={redirectToWatch}>
          {autoplay && (<ReactVideoPlayer videoURL={data?.videoUrl} control={false} poster={data?.thumbnailUrl}/>)}          
        </div>        
        <div className="z-10
          bg-zinc-800
          p-2
          lg:p-4
          transition
          shadow-md
          rounded-b-lg">
          <div className='mb-4'>
            <p className="font-medium text-3xl mb-2 cursor-pointer" onClick={redirectToWatch}>{data?.title || "upcoming..."}</p>
            {(data?.description) && <p className="font-normal	text-sm mb-2 text-white/80 line-clamp-2">{data?.description}</p>}
          </div>
          <div className='flex justify-between items-center'>
            <div>              
              {(data?.duration)&&(<div className='flex flex-row items-center gap-2 mb-2'>
                <p className="leading-normal py-1 px-2 text-sm font-medium text-white/80 rounded-md border border-white/80">U/A</p>
                <p className="text-sm font-medium text-white/80">{data?.duration}</p>
              </div>)}
              {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm font-medium mr-2 last:mr-0 text-white/80">
                {capFirstLetter(itemTxt)}
              </span>)}</div>:null}              
            </div>
            <div className='flex flex-row items-center gap-2'>
              <FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>
              <div onClick={redirectToWatch} className="text-white text-center rounded-full py-2 px-3 text-base w-[150px] h-[40px] transition bg-gradient-to-l from-blue-500 to-blue-600 hover:bg-gradient-to-r">Buy</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MovieCardPopOver;
