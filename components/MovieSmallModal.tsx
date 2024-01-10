import React, { use, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
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
import {CloseOutlined} from '@mui/icons-material';

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
  const [userId, setUserId] = React.useState('');
  
  const { data } = useMoviePopupStore();
  const redirectToWatch = useCallback(() => {
    handleClose(null);
    router.push(`/details/${data?._id}?viewPlan=true`);
  }, [router, data?._id]);

  const removeContinueWatch = useCallback(() => {
    // Remove Box from Continue Watching List
    const removeContinueWatchItem = () => {
      const headers = {
        'Content-Type': 'application/json',
      };      
      const dataBody = {
        itemCode: data?._id,
      };
      let result;
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/playerEvent`, { headers, data: dataBody })
        .then(response => {
          console.log('response: ', response);
          if(response.status === 200) {
            result = response.data;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        }); 
    }
    console.log('data Remove:', data);
    if(!userId){
      const userInfo = window.localStorage.getItem('userInfo');
      if(userInfo) {
        const userInfoObj = JSON.parse(userInfo);
        if(userInfoObj.sub) {
          setUserId(userInfoObj.sub);
        }
      }
      removeContinueWatchItem();
    }else{
      removeContinueWatchItem();
    }
    
  }, [data?._id]);

  let zoomScale = 1;
  if(data?.xy?.width && data?.xy?.thumbW && data?.xy?.width>0 && data?.xy?.thumbW > 0){
    zoomScale = data?.xy?.thumbW / data?.xy?.width;
  }
  // console.log('zoomScale', zoomScale);

  // console.log('region', region);
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  useEffect(() => {
    const moveLayers = (e) => {
      if(isVisible){
        if(e.target.closest('.movieSmallModal') || e.target.classList.contains('movieSmallModal')){
          console.log('This is ');
        }else{
          console.log('This is not');
          setIsVisible(false);
          setTimeout(() => {
            onClose();
          }, 10);
        }
      }
      
    }
    window.addEventListener('mousemove', moveLayers);
    return () => {
      window.removeEventListener('mousemove', moveLayers);
    }
  }, [isVisible]);
  // console.log('xy ', data?.xy);
  
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);

  const handleClose = useCallback((e) => {
    // if(e.target.dataset?.button !== 'close') return;

    // console.log('close');

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 10);
  }, [onClose]);

  const toggleMute = () => {
    setIsMute(!isMute);
  }

  if (!visible) {
    return null;
  }
  
  

  return (
    <div ref={thumbRef} onMouseLeave={handleClose} className={`movieSmallModal group z-50 transition-all duration-300 absolute inset-0`} data-button="close" style={
      {
        left: data?.xy?.x ?? 20, 
        top: data?.xy?.y ?? 20,
        width: data?.xy?.width ?? 400,
        transition: 'all 1.3s ease-in-out',
      }
    }>
      <div className="relative w-full ">
        <div className={`rounded-md overflow-hidden transition-all relative flex-auto bg-zinc-900 drop-shadow-md !scale-100 opacity-100 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        style={{
          // transform: `scale(${zoomScale})`,
        }}>

        <div className='relative'>
          <AudioMute 
          isMute={isMute}
          toggleMute={toggleMute}
          />
          <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player cursor-pointer"
          style={{backgroundImage: `url(${data?.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
          onClick={redirectToWatch}>
            {data?.videoUrl ? <div className='relative h-0 w-full pt-[56.56%]'>
              <div className='absolute top-0 left-0 w-full h-full'>
                <ReactVideoPlayer 
                videoURL={data?.videoUrl} 
                control={false} 
                poster={data?.thumbnailUrl}
                isMute={isMute}
                play={true}
                className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out delay-1000'
              />
              </div>
            </div> : <div className='aspect-[16/9]'></div>}             
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
            <p className="text-3xl mb-1">{data?.title || "upcoming..."}</p>
            {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0 text-white/80">
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
            {(data?.currentTime)?<button title='Remove from Row' onClick={removeContinueWatch} className={`cursor-pointer group/item w-8 h-8 ${(0)?'border-white':'border-white/60'} border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300`}>
                <CloseOutlined className={`text-white group-hover/item:text-neutral-300 w-6`} />
              </button>:null}
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
