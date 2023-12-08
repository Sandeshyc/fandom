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
import MovieCardPopOver from '@/modules/elements/MovieCardPopOver';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardReel: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);
  const redirectToWatch = useCallback(() => router.push(`/details/${data?._id}`), [router, data?._id]);

  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current;
  const [isMouseActive, setIsMouseActive] = React.useState(false);
  // let isMouseActive = false;
  let timer: any = 0;
  const onHoverHandler = () => {
    // console.log('Width:', thumbOuter?.getBoundingClientRect()?.width, 'Left:', thumbOuter?.getBoundingClientRect()?.left, 'Top:', thumbOuter?.getBoundingClientRect()?.top, 'left offset:', thumbOuter?.offsetLeft, 'Top offset:', thumbOuter?.offsetTop);

    


    clearTimeout(timer);
    setIsMouseActive(true);
    timer = setTimeout(() => {
      if(isMouseActive){
        setAutoplay(true);
        // console.log('timer', timer);
      }
    }, 1500);
  }
  const onMouseLeave = () => {
    setIsMouseActive(false);
    setAutoplay(false);
  }
  let thumbURl = '';
  let aspectRatio = '384/216';
  if(portrait){
    thumbURl = data?.thumbnailPotrait;
    aspectRatio = '6/9';
  }else{
    thumbURl = data?.thumbnailUrl;
  }
  


  return (
    <div 
    ref={thumbOuterRef}
    className={`group bg-zinc-900 col-span relative movieCard aspect-[${aspectRatio}]`} onMouseOver={onHoverHandler} onMouseLeave={onMouseLeave}>
      {(!data?.allowed)?<Locked/>:null}      
      <div className='img relative h-full w-full'>
        {(data?.publishSchedule)?<div className='absolute bottom-[10px] left-[10px] z-[1] text-white bg-black bg-opacity-80 px-2 py-1 rounded-sm'><EnititlementEndDate endDate={data?.publishSchedule} short={true} /></div>:null}
        <img onClick={redirectToWatch} src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          h-[12vw]`}/>
      </div>
      <MovieCardPopOver
        data={data}
        autoplay={autoplay}
        parentRef={thumbOuter}
        isMouseActive={isMouseActive}
        />
    </div>
  )
}

export default MovieCardReel;
