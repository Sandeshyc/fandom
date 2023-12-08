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
import MovieCardPopOver from '@/components/MovieCardPopOver';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardReel: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);
  const redirectToWatch = useCallback(() => router.push(`/details/${data?._id}`), [router, data?._id]);
  let isMouseActive = false;
  let timer: any = 0;
  const onHoverHandler = () => {
    console.log('onHoverHandler', isMouseActive.toString());
    clearTimeout(timer);
    isMouseActive = true;
    timer = setTimeout(() => {
      if(isMouseActive){
        setAutoplay(true);
        console.log('timer', timer);
      }
    }, 1500);
  }
  const onMouseLeave = () => {
    isMouseActive = false;
    setAutoplay(false);
  }
  let thumbURl = '';
  let aspectRatio = '16/9';
  if(portrait){
    thumbURl = data?.thumbnailPotrait;
    aspectRatio = '6/9';
  }else{
    thumbURl = data?.thumbnailUrl;
  }

  // const elementRef = useRef(null);
  // const elementRef2 = useRef(null);

  
  // useEffect(() => {
  //   const element = elementRef.current;
  //   const element2 = elementRef2.current;
  //   if (element2 && autoplay) {
  //     const boundingBox = element2.getBoundingClientRect();
  //     const boundingBox1 = element.getBoundingClientRect();
  //     const leftOffset = boundingBox.left;
  //     const rightOffset = boundingBox.right;

  //     console.log('Left Offset:', leftOffset);
  //     console.log('Right Offset:', rightOffset);
  //     console.log('===|||||===', boundingBox.width);
  //     // if(leftOffset < 100 ){
  //     //   element.style.left = `${0}%`;
  //     //   element.style.transfrom = `translateX(-${0}%)`;
  //     // }
  //     // if(rightOffset < 100 ){
  //     //   element.style.right = `${0}%`;
  //     //   element.style.transfrom = `translateX(-${0}%)`;
  //     // }
  //   }
  // }, [autoplay]);
  // console.log('data', data);
  return (
    <div 
    // ref={elementRef2}
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
        autoplay={autoplay}/>
    </div>
  )
}

export default MovieCardReel;
