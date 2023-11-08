import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import { PlayIcon } from '@heroicons/react/24/solid';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import ViewDetailsBtn from '@/components/ViewDetailsBtn';
import Locked from '@/components/Locked';
import { ClockIcon } from '@heroicons/react/24/outline';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardUpcoming: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);

  const redirectToWatch = useCallback(() => router.push(`/watch/${data._id}`), [router, data._id]);

  const onHoverHandler = () => {
    setAutoplay(true);
  }
  const onMouseLeave = () => {
    setAutoplay(false);
  }
  // console.log('data', data);
  const publishDate = data?.publishSchedule;
  const publishDatex = new Date(publishDate).toLocaleDateString('en-US', { 
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
   });

  return (
    <div className="group bg-zinc-900 col-span relative aspect-[9/16] min-w-[250px] w-[250px] sm:w-[300px] " onMouseOver={onHoverHandler} onMouseLeave={onMouseLeave}>
      {(true)?<Locked/>:null}
      <p
        className='flex items-center absolute bottom-4 left-4 text-white text-xs sm:text-sm p-1 bg-black bg-opacity-60 rounded-md'
      ><ClockIcon className='text-white w-[16px] h-[16px] mr-1'/><span>{publishDatex}</span></p>
      <div className='img h-full w-full'>
        <img onClick={redirectToWatch} src={portrait ? data.thumbnailPotrait : data.thumbnailUrl } alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          h-full
        " />
      </div>
      <div className="
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
        xl:group-hover:opacity-180        
        group-hover:opacity-100">
        <div className=" shadow-md
        rounded-t-lg jk_player " >
          {autoplay && (
          <VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false}   />)}
          <p className="text-green-400 font-semibold mt-4 title">
            {data.title || "upcoming..."} <span className="text-white">({yearFromDate(data?.createdDate)})</span>
          </p>
        </div>
        <div className="
          z-10
          p-2
          lg:p-4          
          transition
          shadow-md
          rounded-b-lg
          ">
          <div className="flex flex-row items-center gap-3">
            <div onClick={redirectToWatch} className="cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <PlayIcon className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton movieId={data._id} isInWatchList={data?.isInWatchList}/>
            <ViewDetailsBtn movieId={data._id} />
          </div>

          <div className="flex flex-row items-center gap-2 mt-2 text-white ">
            <p className="text-green-400">85% Match</p>
            <p className="">
              {data?.duration}
            </p>
            <p className="border-gray-500 border px-1 text-xs">HD</p>
            <p className="border-gray-500 border px-1 text-xs">16+</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-2 text-white text-xs text-gray-500">
            <p>language, violence, suicide</p>
          </div>

          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            {data.genre?.map(item => <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-100 ring-1 ring-inset ring-gray-100/1">
            {capFirstLetter(item)}
      </span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCardUpcoming;
