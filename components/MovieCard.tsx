import React, { useRef, useCallback, useEffect } from 'react';
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
import { stableKeys } from '@/utils/stableKeys';
import ReactVideoPlayer from '@/components/ReactPlayer';
import EnititlementEndDate from '@/components/Expair';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);


  const elementRef = useRef(null);
  const elementRef2 = useRef(null);

  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);
  const onHoverHandler = () => {
    setAutoplay(true);
  }
  const onMouseLeave = () => {
    setAutoplay(false);
  }
  useEffect(() => {
    const element = elementRef.current;
    const element2 = elementRef2.current;
    if (element2 && autoplay) {
      const boundingBox = element2.getBoundingClientRect();
      const boundingBox1 = element.getBoundingClientRect();
      const leftOffset = boundingBox.left;
      const rightOffset = boundingBox.right;

      console.log('Left Offset:', leftOffset);
      console.log('Right Offset:', rightOffset);
      console.log('===|||||===', boundingBox.width);
      // if(leftOffset < 100 ){
      //   element.style.left = `${0}%`;
      //   element.style.transfrom = `translateX(-${0}%)`;
      // }
      // if(rightOffset < 100 ){
      //   element.style.right = `${0}%`;
      //   element.style.transfrom = `translateX(-${0}%)`;
      // }
    }
  }, [autoplay]);
  // console.log('data', data);
  return (
    <div 
    ref={elementRef2}
    className="group bg-zinc-900 col-span relative movieCard" onMouseOver={onHoverHandler} onMouseLeave={onMouseLeave}>
      {(!data?.allowed)?<Locked/>:null}      
      <div className='img relative'>
        {(data?.publishSchedule)?<div className='absolute bottom-[10px] left-[10px] z-[1] text-white bg-black bg-opacity-80 px-2 py-1 rounded-sm'><EnititlementEndDate endDate={data?.publishSchedule} short={true} /></div>:null}
        <img onClick={redirectToWatch} src={portrait ? data.thumbnailPotrait : data.thumbnailUrl } alt="Movie" draggable={false} className="
          cursor-pointer
          object-contain
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          h-[12vw]
        " />
      </div>
      <div 
      ref={elementRef}
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
        rounded-t-lg jk_player " >
          {/* {autoplay && (<VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false}/>)} */}
          {autoplay && (<ReactVideoPlayer videoURL={data?.videoUrl} control={false} poster={data?.thumbnailUrl}/>)}
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
            {data.genre?.map((item, index) => <span key={stableKeys[index]} className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-100 ring-1 ring-inset ring-gray-100/1">
            {capFirstLetter(item)}
      </span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;
