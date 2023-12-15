import React, { useRef, useCallback, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { round } from 'lodash';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { 
  yearFromDate, dateToDay  
} from '@/utils/yearFromDate';
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
import EnititlementEndDate from '@/components/Expair';
import PublishDate from '@/modules/Identities/PublishDate';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MovieCardPopOver from '@/modules/elements/MovieCardPopOver';
import ProgressBar from '@/components/elements/ProgressBar';


interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardReel: React.FC<MovieCardProps> = ({ data, portrait }) => {
  // console.log('MovieCardReel: ', data);
  const router = useRouter();
  const { openModal, closeModal} = useMoviePopupStore();
  const [autoplay, setAutoplay] = React.useState(false);
  

  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current as unknown as HTMLElement;
  const [isMouseActive, setIsMouseActive] = React.useState(false);
  const x = useRef(false);
  // let isMouseActive = false;

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

    // clearTimeout(timer);
    // setIsMouseActive(true);
    x.current = true;
    timer = setTimeout(() => {
      console.log('timer', timer, x.current);
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
  let thumbURl = '';
  let aspectRatio = '384/216';
  if(portrait){
    thumbURl = data?.thumbnailPotrait;
    aspectRatio = '6/9';
  }else{
    thumbURl = data?.thumbnailUrl;
  }

  let progress = 0;
  if(data?.currentTime && data?.duration){
    progress =  data?.duration / data?.currentTime;
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
    className={`group bg-zinc-900 col-span relative movieCard aspect-[${aspectRatio}]`} onMouseEnter={onHoverHandler} onMouseLeave={onMouseLeave}>
      {(!data?.allowed)?<Locked/>:null}      
      <div className='img relative h-full w-full'>
        {(data?.publishSchedule)?<div className='absolute bottom-[10px] left-[10px] z-[1] text-white bg-black bg-opacity-80 px-2 py-1 rounded-md'><PublishDate publishDate={data?.publishSchedule} short={true} /></div>:null}
        {(data?.endTime)?<div className='absolute bottom-[10px] left-[10px] z-[1] text-white bg-black bg-opacity-80 px-2 py-1 rounded-md'><EnititlementEndDate endDate={data?.endTime} short={true} /></div>:null}
        <img onClick={redirectToWatch} src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          
          delay-300
          w-full
          h-[12vw]`}/>
          {data?.currentTime ? <ProgressBar done={progress} /> : null}
      </div>
      {/* <MovieCardPopOver
        data={data}
        autoplay={autoplay}
        parentRef={thumbOuter}
        isMouseActive={isMouseActive}
        popScale={(portrait)?1:0.2}
        /> */}
    </div>
  )
}

export default MovieCardReel;
