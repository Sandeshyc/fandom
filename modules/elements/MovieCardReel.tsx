import React, { useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { round, set } from 'lodash';
import axios from 'axios';
import { MovieInterface } from '@/types';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import EnititlementEndDate from '@/components/Expair';
import PublishDate from '@/modules/Identities/PublishDate';
import PublishDateDetails from '@/modules/Identities/PublishDateDetails';
import ProgressBar from '@/components/elements/ProgressBar';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import {Cancel} from '@mui/icons-material';
interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
  sliderRef?: any;
  setRemovedItem?: any;
}

const MovieCardReel: React.FC<MovieCardProps> = ({ data, portrait, gradient, sliderRef, setRemovedItem }) => {
  const router = useRouter();
  const { openModal, closeModal} = useMoviePopupStore();
  const [autoplay, setAutoplay] = React.useState(false); 
  const [userId, setUserId] = React.useState('');
  const [isInWatchListTemp, setIsInWatchListTemp] = React.useState(data?.isInWatchList || false);

  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current as unknown as HTMLElement;
  const [isMouseActive, setIsMouseActive] = React.useState(false);
  const x = useRef(false);

  let timer: any = 0;
  const onHoverHandler = () => {
    let unit = window.innerWidth / 100;
    const widthUnit = 30;
    let thumbW = thumbOuter?.getBoundingClientRect()?.width;
    let thumbH = thumbOuter?.getBoundingClientRect()?.height;
    let top = thumbOuter?.getBoundingClientRect()?.top + window.scrollY + (thumbH / 2);
    let left = thumbOuter?.getBoundingClientRect()?.left + (thumbW / 2);
    // console.log('thumbW', thumbW, thumbH, top, left);
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
      ...data,
      thumbOuter,
      sliderRef,
      setRemovedItem,
      isInWatchListTemp,
      setIsInWatchListTemp,
    }

    x.current = true;
    timer = setTimeout(() => {
      // console.log('timer', timer, x.current);
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
    thumbURl = data?.thumbnailPotrait || data?.thumbnailUrl || '';
    aspectRatio = '240/360';
  }else{
    thumbURl = data?.thumbnailUrl || data?.thumbnailPotrait || '';
  }
  let progress = 0;
  if(data?.currentTime && data?.videoDuration){
    const duration:number = data?.videoDuration || 1;
    const current:number = data?.currentTime || 1;
    if(current !== 0 && duration !== 0){
      progress =  (current / duration) * 100;
    }
  }
  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);  
  const noGradientClass = gradient ? '' : ' bg-black py-1 ';

  const removeContinueWatch = () => {
    // Remove Box from Continue Watching List
    // console.log('data Remove:', data);
    const headers = {
      'Content-Type': 'application/json',
    };      
    const dataBody = {
      watchList: [data?._id],
    };
    let result;
    // Remove from Continue Watching List
    // if(thumbOuter) {
    //   console.log('thumbOuterddd', thumbOuter);
    //   thumbOuter.classList.add('opacity-0');
    //   setTimeout(() => {
    //     thumbOuter.remove();
    //   }, 400);
    // }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/playerEvent`, { headers, data: dataBody })
      .then(response => {
        // console.log('response: ', response);
        if(response.status === 200) {
          result = response.data;
          setRemovedItem(data?._id);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      }); 
  };

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);

  return (
    <div 
    ref={thumbOuterRef}
    className={`group bg-zinc-900 rounded-md col-span relative movieCard cursor-pointer aspect-[${aspectRatio}]`} 
    onMouseEnter={onHoverHandler} 
    onMouseLeave={onMouseLeave}
    onClick={redirectToWatch}
    >
      {/* <p className='absolute z-30 top-0 left-0 m-2 text-white bg-opacity-80 px-2 py-1 rounded-md'>
        {isInWatchListTemp?.toString()}
      </p> */}
      {(data?.allowed)?<PurchaseBadge/>:null}  
      <div className='img relative h-full w-full'>        
        <div className='absolute z-30 bottom-0 left-0 w-full '>
          {(data?.endTime)?<div className={`inline-block mb-2 mx-2 text-white bg-opacity-80 px-2 rounded-md ${noGradientClass}`}><EnititlementEndDate endDate={data?.endTime} short={true} /></div>:null}
          {(data?.publishSchedule && !gradient)?<div className={`inline-block mb-2 mx-2 text-white bg-opacity-80 px-2 py-1 rounded-md ${noGradientClass}`}><PublishDate publishDate={data?.publishSchedule} short={true} /></div>:null}
          {(data?.publishSchedule && gradient)?<div className={`mb-2 mx-2 text-gray-100 px-2 rounded-md ${noGradientClass}`}><PublishDateDetails publishDate={data?.publishSchedule} short={true} /></div>:null}
          {(data?.currentTime || data?.currentTime === 0) ? <div className='m-2 mt-0 flex items-center'>
            <ProgressBar done={progress} />
            <div onClick={(e) => {
            e.stopPropagation();
            // console.log('removeContinueWatch');
            removeContinueWatch();
          }} className={`cursor-pointer lg:hidden`}>
                <Cancel className={`text-white w-4`} />
              </div>
            </div> : null}
        </div>             
        <img src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer object-contain shadow-xl rounded-md w-full h-[12vw] z-10`}/>        
        {gradient? <div className={`jkGradient absolute z-20 bottom-0 left-0 w-full h-full cursor-pointer`}/> : null}
      </div>
    </div>
  )
}

export default MovieCardReel;
