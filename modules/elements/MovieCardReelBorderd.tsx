import React, { useRef, useCallback, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import Locked from '@/components/Locked';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';

import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
  isSquare?: boolean;
}

const MovieCardReelBorderd: React.FC<MovieCardProps> = ({ data, portrait, gradient, isSquare }) => {
  const router = useRouter();
  console.log('MovieCardReelBorderd: ', data);

  let thumbURl = '';
  let aspectRatio = '[384/216]';
  if(portrait){
    thumbURl = data?.thumbnailPotrait;
    aspectRatio = '[6/9]';
  }else{
    thumbURl = data?.thumbnailUrl;
  }
  if(isSquare){
    aspectRatio = 'square';
  }

  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);

  return (
    <button 
    onClick={redirectToWatch}
    className={`group col-span relative aspect-${aspectRatio} border-blue-700 border p-[1.8vw] pb-1 rounded-xl w-full transition-all duration-500 hover:border-white min-w-[312px]`} >
      {/* {(!data?.allowed)?<Locked/>:null}   */}
      <div className={`img relative h-full w-full`}>
        {(data?.allowed)?<PurchaseBadge data={data}/>:null}     
        <img  src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer object-cover shadow-xl rounded-md w-full z-10 aspect-${aspectRatio}`}/>
        {/* {gradient? <div className={`jkGradient-black absolute z-20 bottom-[-1px] left-0 w-full h-full cursor-pointer`}/> : null} */}
        <div className={`flex justify-between absolute z-20 bottom-[-1px] left-0 w-full  pb-[1.8vw] pt-[1.8vw] px-4 bg-gradient-to-t from-black from-45% via-black/80 via-75% to-transparent to-98% cursor-pointer`}>
          <p className="text-white text-xl	font-medium mr-2">{data?.title}</p>
          <ArrowRightIcon onClick={() => {}} className="w-4 md:w-8 text-white cursor-pointer transition-all duration-500 group-hover:mr-[-20px] " />
        </div>
      </div>
      
    </button>
  )
}

export default MovieCardReelBorderd;
