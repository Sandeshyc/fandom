import React, {useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import SvgNumbers from '@/utils/SvgNumbers'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import ViewDetailsBtn from '@/components/ViewDetailsBtn';
import Locked from '@/components/Locked';
import { stableKeys } from '@/utils/stableKeys';
import ReactVideoPlayer from '@/components/ReactPlayer';
import MovieCardPopOver from '@/modules/elements/MovieCardPopOver';

interface MovieCardTopProps {
  data: MovieInterface;
  number?: number;
  portrait?: boolean;
}

const MovieCardTop: React.FC<MovieCardTopProps> = ({ data, portrait, number }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);
  const [isMouseActive, setIsMouseActive] = React.useState(false);
  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);
  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current;

  let timer: any = 0;
  const onHoverHandler = () => {
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

  return (
    <div  
    ref={thumbOuterRef}
    className="group col-span relative movieCard" onMouseOver={onHoverHandler} onMouseLeave={onMouseLeave}>
      <div className='movieCardTop movieCardTopV2'>
      {(!data?.allowed)?<Locked/>:null}
        <div className='number'><SvgNumbers item={number} /></div>
        <div className='img'>
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
            h-[12vw]
          " />
        </div>
      </div>
      <MovieCardPopOver
        data={data}
        autoplay={autoplay}
        parentRef={thumbOuter}
        isMouseActive={isMouseActive}
        popScale={(portrait)?0.2:0.2}
        />
    </div>
  )
}

export default MovieCardTop;
