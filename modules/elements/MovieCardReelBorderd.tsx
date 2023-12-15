import React, { useRef, useCallback, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { round } from 'lodash';
import { MovieInterface } from '@/types';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import ReelHeading from '@/modules/elements/ReelHeading';
import Locked from '@/components/Locked';
import EnititlementEndDate from '@/components/Expair';
import PublishDate from '@/modules/Identities/PublishDate';
import PublishDateDetails from '@/modules/Identities/PublishDateDetails';
import ProgressBar from '@/components/elements/ProgressBar';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
}

const MovieCardReelBorderd: React.FC<MovieCardProps> = ({ data, portrait, gradient }) => {
  const router = useRouter();
  const { openModal, closeModal} = useMoviePopupStore();
  
  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current as unknown as HTMLElement;
  const x = useRef(false);

  let timer: any = 0;
  const onHoverHandler = () => {
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

    x.current = true;
    timer = setTimeout(() => {
      console.log('timer', timer, x.current);
      if(x.current && openModal){
        openModal(dataExtend);
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
  
  const noGradientClass = gradient ? '' : ' bg-black py-1 ';


  return (
    <button 
    ref={thumbOuterRef}
    onClick={redirectToWatch}
    className={`group col-span relative movieCard aspect-[${aspectRatio}] border-blue-700 border p-[1.8vw] rounded-xl w-full transition-all duration-500 hover:border-white `} >
      {(!data?.allowed)?<Locked/>:null}      
      <div className='img relative h-full w-full'>
        <img  src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer object-cover shadow-xl rounded-md w-full h-[12vw] z-10`}/>
        {gradient? <div className={`jkGradient-black absolute z-20 bottom-[-1px] left-0 w-full h-full cursor-pointer`}/> : null}
      </div>
      <div className={`flex justify-between`}>
        <p className="text-white text-xl	font-medium mr-2">{data?.title}</p>
        <ArrowRightIcon onClick={() => {}} className="w-4 md:w-8 text-white cursor-pointer transition-all duration-500 group-hover:mr-[-20px] " />
      </div>
    </button>
  )
}

export default MovieCardReelBorderd;
