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
    // console.log('Width:', thumbOuter?.getBoundingClientRect()?.width, 'Left:', thumbOuter?.getBoundingClientRect()?.left, 'Top:', thumbOuter?.getBoundingClientRect()?.top, 'left offset:', thumbOuter?.offsetLeft, 'Top offset:', thumbOuter?.offsetTop);
    let unit = window.innerWidth / 100;
    const widthUnit = 30;
    let width = thumbOuter?.getBoundingClientRect()?.width;
    let height = thumbOuter?.getBoundingClientRect()?.height;
    let top = thumbOuter?.getBoundingClientRect()?.top + window.scrollY + (height / 2);
    let left = thumbOuter?.getBoundingClientRect()?.left + (width / 2);

    let popWidth = unit * widthUnit;
    popWidth = (popWidth < 400)? 400 : popWidth;
    const widthUnitHalf = popWidth / 2;

    top = round(top - widthUnitHalf);

    left = round(left - widthUnitHalf);
    left = (left < 0)? 20 : left;
    left = (left > (window.innerWidth - popWidth - 20))? (window.innerWidth - popWidth - 40) : left;

    const dataExtend = {
      xy : {
        x: left,
        y: round(top),
        width: popWidth,
      },
      ...data
    }

    clearTimeout(timer);
    setIsMouseActive(true);
    x.current = true;
    timer = setTimeout(() => {
      if(x.current && openModal){
        openModal(dataExtend);
        // setAutoplay(true);
        
        // console.log('timer', timer);
      }
    }, 700);
  }
  const onMouseLeave = () => {
    x.current = false;
    clearTimeout(timer);
  }

  const redirectToWatch = useCallback(() => {
    x.current = false;
    clearTimeout(timer);
    closeModal();
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);

  return (
    <div  
    ref={thumbOuterRef}
    className="group col-span relative movieCard" onMouseEnter={onHoverHandler} onMouseLeave={onMouseLeave}>
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
