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
import EnititlementEndDate from '@/components/Expair';
import { VolunteerActivism } from '@mui/icons-material';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardUpcoming: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);

  // const redirectToWatch = useCallback(() => router.push(`/watch/${data._id}`), [router, data._id]);
  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);

  const onHoverHandler = () => {
    setAutoplay(true);
  }
  const onMouseLeave = () => {
    setAutoplay(false);
  }
  return (
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white w-full rounded-sm movieCard" onMouseOver={onHoverHandler} onMouseLeave={onMouseLeave}>
      <div className="w-full relative">
        <img onClick={redirectToWatch} src={data.thumbnailUrl } alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          rounded-md
          w-full
          aspect-[16/9]" />
        <div className="absolute top-2 right-2 p-1 flex flex-wrap bg-black bg-opacity-50 rounded-md">
          <EnititlementEndDate endDate={data?.endTime} short={true} />  
        </div>
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
        
        group-hover:opacity-100
        
      ">
        <div className="bg-zinc-800 shadow-md
        rounded-t-lg jk_player " >
          {autoplay && (
          <VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false}   />)}
          <p className="text-green-400 font-semibold mt-4 title">
            {data.title || "upcoming..."} <span className="text-white">({yearFromDate(data?.createdDate)})</span>
          </p>
        </div>
        <div className="
          z-10
          bg-zinc-800
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
            {/* <p className="text-green-400">85% Match</p> */}
            <p className="text-green-400">
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
