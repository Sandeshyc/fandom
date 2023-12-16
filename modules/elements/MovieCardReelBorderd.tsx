import React, { useRef, useCallback, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import Locked from '@/components/Locked';

import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
}

const MovieCardReelBorderd: React.FC<MovieCardProps> = ({ data, portrait, gradient }) => {
  const router = useRouter();

  let thumbURl = '';
  let aspectRatio = '384/216';
  if(portrait){
    thumbURl = data?.thumbnailPotrait;
    aspectRatio = '6/9';
  }else{
    thumbURl = data?.thumbnailUrl;
  }

  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);

  return (
    <button 
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
