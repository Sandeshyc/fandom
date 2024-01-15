import React, { useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { round } from 'lodash';
import { MovieInterface } from '@/types';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
}

const MovieCardSearch: React.FC<MovieCardProps> = ({ data, portrait, gradient }) => {
  const router = useRouter();
  const { openModal, closeModal} = useMoviePopupStore();
  const [autoplay, setAutoplay] = React.useState(false); 
  const [userId, setUserId] = React.useState('');

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
      thumbOuter,
      ...data
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
    thumbURl = data?.thumbnailPotrait || data?.thumbnailUrl || data?.thumbnailMotionUrl || '';
    aspectRatio = '240/360';
  }else{
    thumbURl = data?.thumbnailMotionUrl || data?.thumbnailUrl || data?.thumbnailPotrait || '';
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
    className={`group bg-gray-800 rounded-md col-span relative movieCard cursor-pointer aspect-[${aspectRatio}]`} 
    onMouseEnter={onHoverHandler} 
    onMouseLeave={onMouseLeave}
    onClick={redirectToWatch}
    >
      {(data?.allowed)?<PurchaseBadge/>:null}  
      <div className='img relative h-full w-full'>            
        <img src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer object-contain shadow-xl rounded-md w-full h-[12vw] z-10`}/>      
      </div>
    </div>
  )
}

export default MovieCardSearch;
