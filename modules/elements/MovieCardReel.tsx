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
import PublishDateDetails from '@/modules/Identities/PublishDateDetails';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MovieCardPopOver from '@/modules/elements/MovieCardPopOver';
import ProgressBar from '@/components/elements/ProgressBar';


interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
}

const MovieCardReel: React.FC<MovieCardProps> = ({ data, portrait, gradient }) => {
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

  let thumbURl = '';
  let aspectRatio = '384/216';
  if(portrait){
    thumbURl = data?.thumbnailPotrait;
    aspectRatio = '6/9';
  }else{
    thumbURl = data?.thumbnailUrl;
  }

  let progress = 0;
  if(data?.currentTime && data?.videoDuration){
    // console.log('data?.currentTime', data?.currentTime, data);
    progress =  data?.videoDuration / data?.currentTime;
  }

  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);
  
  const noGradientClass = gradient ? '' : ' bg-black py-1 ';


  return (
    <div 
    ref={thumbOuterRef}
    className={`group bg-zinc-900 col-span relative movieCard cursor-pointer aspect-[${aspectRatio}]`} 
    onMouseEnter={onHoverHandler} 
    onMouseLeave={onMouseLeave}
    onClick={redirectToWatch}
    >
      {(!data?.allowed)?<Locked/>:null}      
      <div className='img relative h-full w-full'>
        
        <div className='absolute z-30 bottom-0 left-0 w-full '>
          
          
          {(data?.endTime)?<div className={`inline-block mb-2 mx-2 text-white bg-opacity-80 px-2 rounded-md ${noGradientClass}`}><EnititlementEndDate endDate={data?.endTime} short={true} /></div>:null}

          {(data?.publishSchedule && !gradient)?<div className={`inline-block mb-2 mx-2 text-white bg-opacity-80 px-2 py-1 rounded-md ${noGradientClass}`}><PublishDate publishDate={data?.publishSchedule} short={true} /></div>:null}

          {(data?.publishSchedule && gradient)?<div className={`mb-2 mx-2 text-gray-100 px-2 rounded-md ${noGradientClass}`}><PublishDateDetails publishDate={data?.publishSchedule} short={true} /></div>:null}

          {data?.currentTime ? <div className='m-2 mt-0'><ProgressBar done={progress} /></div> : null}
        </div>
        
        <img src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer object-cover shadow-xl rounded-md w-full h-[12vw] z-10`}/>
        
        {gradient? <div className={`jkGradient absolute z-20 bottom-0 left-0 w-full h-full cursor-pointer`}/> : null}

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
