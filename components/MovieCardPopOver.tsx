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
}
const MovieCardPopOver: React.FC<MovieCardProps> = ({ data, autoplay }) => {
  const router = useRouter();
  const redirectToWatch = useCallback(() => router.push(`/details/${data?._id}`), [router, data?._id]);
  console.log('data', data);
  return (
    <div 
      className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-100
        group-hover:opacity-100        
      ">
        <div className="bg-zinc-800 shadow-md
        rounded-t-lg jk_player"
        style={{backgroundImage: `url(${data?.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
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
            <p className="font-medium text-3xl mb-2">{data?.title || "upcoming..."}</p>
            {(data?.description) && <p className="font-normal	text-sm mb-2 text-white/80 line-clamp-2">{data?.description}</p>}
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <div className='flex flex-row items-center gap-2 mb-2'>
                <p className="leading-normal py-1 px-2 text-sm font-medium text-white/80 rounded-md border border-white/80">U/A</p>
                <p className="text-sm font-medium text-white/80">{data?.duration}</p>
              </div>
              {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm font-medium mr-2 last:mr-0 text-white/80">
                {capFirstLetter(itemTxt)}
              </span>)}</div>:null}              
            </div>
            <div className='flex flex-row items-center gap-2'>
              <FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>
              <div onClick={redirectToWatch} className="cursor-pointer bg-gradient-to-br to-blue-700 from-blue-500 bg-white rounded-md flex justify-center items-center py-1 px-4">Buy</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MovieCardPopOver;
