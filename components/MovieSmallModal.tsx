import React, { use, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {capFirstLetter} from '@/utils/capFirstLetter';
import FavoriteButton from '@/modules/Identities/FavoriteButton';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import { stableKeys } from '@/utils/stableKeys';
import AudioMute from '@/modules/elements/AudioMute';
import ReactVideoPlayer from '@/components/ReactPlayer';
import Buttons from '@/modules/Identities/Buttons';
import {CloseOutlined, LoopOutlined} from '@mui/icons-material';
import { _id } from '@next-auth/mongodb-adapter';

interface movieSmallModalProps {
  visible?: boolean;
  onClose: any;
  reelItem?: any;
}

const MovieSmallModal: React.FC<movieSmallModalProps> = ({ visible, onClose, reelItem}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const [isMute, setIsMute] = React.useState(true);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [userId, setUserId] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);  
  const { data } = useMoviePopupStore();

  // const [isInLish, setIsInLish] = React.useState(data?.isInWatchListTemp);
  const redirectToRent = useCallback(() => {
    handleClose(null);
    router.push(`/details/${data?._id}?viewPlan=true`);
  }, [router, data?._id]);
  const redirectToDetails = useCallback(() => {
    handleClose(null);
    router.push(`/details/${data?._id}`);
  }, [router, data?._id]);

  const redirectToWatch = useCallback(() => {
    handleClose(null);
    router.push(`/watch/${data?._id}`);
  }, [router, data?._id]);

  useEffect(() => {
    setIsDeleting(false);
  }, [data]);

  

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
    const moveLayers = (e:any) => {
      if(isVisible){
        if(e.target.closest('.movieSmallModal') || e.target.classList.contains('movieSmallModal')){
          // console.log('This is ');
        }else{
          // console.log('This is not');
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

  
  const handleClose = useCallback((e:any) => {

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 10);
  }, [onClose]);

  const toggleMute = () => {
    setIsMute(!isMute);
  }

  const handleWatchListItemFunc = () => {
    data?.handelAddMyList(!data?.isInWatchListTemp);
  }

  const handelRemoveWatchingListFunc = () => {
    console.log('handelRemoveWatchingListFunc');
    // handleClose(null);
    data?.handelRemoveWatchingList();
  }
  
  useEffect(() => {
    if(data?.itemRemoved){
      handleClose(null);
    }
  }, [data?.itemRemoved]);
  
  useEffect(() => {
    // get the route URL
    const currentPath = window.location.pathname;
    console.log('currentPath', currentPath);
    handleClose(null);
  }, [router.pathname]);

  if (!visible) {
    return null;
  }
  return (
    <div ref={thumbRef} 
      onMouseLeave={handleClose}  
      className={`movieSmallModal group z-50 transition-all duration-300 absolute inset-0`} data-button="close" style={
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
          onClick={redirectToDetails}>
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
          relative
          p-2
          lg:p-4
          transition
          shadow-md
          rounded-b-lg">
          <div className='mb'>
            <p className="text-3xl mb-1">{data?.title || ""}</p>
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

              {(data?.currentTime || data?.currentTime === 0) &&
              <button 
                title='Remove from Row' 
                onClick={handelRemoveWatchingListFunc} 
                className={`cursor-pointer group/item w-8 h-8 border-white/60 border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300 `}> 
                <CloseOutlined className={`text-white group-hover/item:text-neutral-300 w-6`} />
              </button>}

              {(data?._id) && (
                <FavoriteButton isInWatchList={data?.isInWatchListTemp} onClick={handleWatchListItemFunc} />
              )}

              {data?.allowed? (
                <Buttons onClick={redirectToWatch} type='white'>Play Now</Buttons>
              ) : (
                <Buttons onClick={redirectToRent}>Rent</Buttons>
              )}

              {(data?.popupIsLoading)?<div className='absolute inset-0 bg-black/30 flex justify-center items-center cursor-wait'>
                <LoopOutlined
                sx={{
                  animation: 'spin 1s linear infinite',
                  fontSize: 40,
                  color: 'white',
                }}
                />
              </div>:null}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSmallModal;
