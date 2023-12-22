import React, {useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { round } from 'lodash';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import SvgNumbers from '@/utils/SvgNumbers'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import ViewDetailsBtn from '@/components/ViewDetailsBtn';
import Locked from '@/components/Locked';
import { stableKeys } from '@/utils/stableKeys';
import ReactVideoPlayer from '@/components/ReactPlayer';
import MovieCardPopOver from '@/modules/elements/MovieCardPopOver';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';

interface MovieCardTopProps {
  data: MovieInterface;
  number?: number;
  portrait?: boolean;
}

const MovieCardTop: React.FC<MovieCardTopProps> = ({ data, portrait, number }) => {
  const router = useRouter();
  // const { openModal } = useInfoModalStore();
  const { openModal, closeModal} = useMoviePopupStore();
  const [autoplay, setAutoplay] = React.useState(false);
  const [isMouseActive, setIsMouseActive] = React.useState(false);
  
  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current as unknown as HTMLElement;
  const x = useRef(false);

  let timer: any = 0;
  const onHoverHandler = () => {
    let unit = window.innerWidth / 100;
    const widthUnit = 30;
    let thumbW = thumbOuter?.getBoundingClientRect()?.width;
    let thumbH = thumbOuter?.getBoundingClientRect()?.height;
    let top = thumbOuter?.getBoundingClientRect()?.top + window.scrollY + (thumbH / 2);
    let left = thumbOuter?.getBoundingClientRect()?.left + (thumbW / 2);

    let popWidth = unit * widthUnit;
    popWidth = (popWidth < 400)? 400 : popWidth;
    const popWidthHalf = popWidth / 2;

    top = round(top - popWidthHalf);

    left = round(left - popWidthHalf);
    left = (left < 0)? 20 : left;
    left = (left > (window.innerWidth - popWidth - 20))? (window.innerWidth - popWidth - 40) : left;

    const dataExtend = {
      xy : {
        x: left,
        y: round(top),
        width: popWidth,
        thumbW: thumbW > thumbH ? thumbW : thumbH,
      },
      ...data
    }

    x.current = true;
    timer = setTimeout(() => {
      console.log('timer', timer, x.current);
      if(x.current && openModal){
        openModal(dataExtend);
      }
    }, 400);
  }
  const onMouseLeave = () => {
    x.current = false;
    clearTimeout(timer);
  }

  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);

  return (
    <div  
    ref={thumbOuterRef}
    className="group col-span relative movieCard" onMouseEnter={onHoverHandler} onMouseLeave={onMouseLeave}>
      <div className='movieCardTop movieCardTopV2'>
        <div className='number'><SvgNumbers item={number} /></div>
        <div className='img relative'>
          {/* {(!data?.allowed)?<Locked/>:null} */}
          {(data?.allowed)?<PurchaseBadge data={data}/>:null} 
          <img onClick={redirectToWatch} src={portrait ? data.thumbnailPotrait : data.thumbnailUrl } alt="Movie" draggable={false} className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
           
            delay-300
            w-full
            h-[12vw]
          " />
        </div>
      </div>
      {/* <MovieCardPopOver
        data={data}
        autoplay={autoplay}
        parentRef={thumbOuter}
        isMouseActive={isMouseActive}
        popScale={(portrait)?0.2:0.2}
        /> */}
    </div>
  )
}

export default MovieCardTop;
