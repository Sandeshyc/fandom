import React, { use, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { XMarkIcon } from '@heroicons/react/24/outline';

import {capFirstLetter} from '@/utils/capFirstLetter';
import PlayButton from '@/components/PlayButton';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import FavoriteButton from '@/components/FavoriteButton';
import MovieCardSimple from '@/components/MovieCardSimple';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import useMovieList from '@/hooks/useMovieList';
import { stableKeys } from '@/utils/stableKeys';
import AudioMute from '@/modules/elements/AudioMute';
import ReactVideoPlayer from '@/components/ReactPlayer';
import Buttons from '@/components/identites/Buttons';

interface movieSmallModalProps {
  visible?: boolean;
  onClose: any;
}

const MovieSmallModal: React.FC<movieSmallModalProps> = ({ visible, onClose}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const [isMute, setIsMute] = React.useState(true);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [boxHeight , setBoxHeight] = useState(0);
  
  const { data } = useMoviePopupStore();
  const redirectToWatch = useCallback(() => router.push(`/details/${data?._id}`), [router, data?._id]);

  // console.log('region', region);
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  console.log('xy ', data?.xy);
 

  const handleClose = useCallback((e) => {
    // if(e.target.dataset?.button !== 'close') return;

    console.log('close');

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const toggleMute = () => {
    setIsMute(!isMute);
  }

  if (!visible) {
    return null;
  }
  

  return (
    <div ref={thumbRef} onMouseLeave={handleClose} className={`movieSmallModal z-50 transition duration-300 absolute inset-0`} data-button="close" style={
      {
        width: data?.xy?.width || 400, 
        left: data?.xy?.x || 20, 
        top: data?.xy?.y || 20,
        transition: 'all 0.3s ease-in-out',
      }
    }>
      <div className="relative w-full ">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} rounded-md  overflow-hidden transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

        <div className='relative'>
          <AudioMute 
          isMute={isMute}
          toggleMute={toggleMute}
          />
          <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player cursor-pointer"
          style={{backgroundImage: `url(${data?.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
          onClick={redirectToWatch}>
            {data?.videoUrl ? <ReactVideoPlayer 
              videoURL={data?.videoUrl} 
              control={false} 
              poster={data?.thumbnailUrl}
              isMute={isMute}
              play={true}
            /> : null}             
          </div> 
        </div>     
        <div className="z-10
          bg-zinc-800
          p-2
          lg:p-4
          transition
          shadow-md
          rounded-b-lg">
          <div className='mb'>
            <p className="font-medium text-3xl mb-1">{data?.title || "upcoming..."}</p>
            {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm font-medium mr-2 last:mr-0 text-white/80">
                {capFirstLetter(itemTxt)}
              </span>)}</div>:null}
            {(data?.description) && <p className="font-normal	text-sm mt-2 mb-2 text-white/80 line-clamp-2">{data?.description}</p>}
          </div>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='mb-1'>              
              <div className='flex flex-row items-center gap-2'>
                {(data?.contentRating)?(<p className="leading-normal py-1 px-2 text-xs font-medium text-white/80 rounded-md border border-white/80">{data?.contentRating}</p>):null}
                {(data?.duration)?(<p className="text-sm font-medium text-white/80">{data?.duration}</p>):null}
              </div>           
            </div>
            <div className='flex flex-row items-center gap-2 mb-1'>
              <FavoriteButton movieId={data?._id || '0'} isInWatchList={data?.isInWatchList}/>
              
              
              {data?.allowed? (
                <Buttons onClick={redirectToWatch} type='white'>Play Now</Buttons>
              ) : (
                <Buttons onClick={redirectToWatch}>Rent</Buttons>
              )}

            </div>
          </div>
        </div>

          
        </div>
      </div>
    </div>
  );
}

export default MovieSmallModal;
