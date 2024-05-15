import React, { useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { round, set } from 'lodash';
import {
  addToMyList,
  removeFromMyList,
  removeFromWatchingLists,
} from '@/services/api';
import { MovieInterface } from '@/types';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import ProgressBar from '@/components/elements/ProgressBar';
import RollImage from '@/modules/Identities/RollImage';
import {Cancel} from '@mui/icons-material';
import CardHeaderMobile from '@/modules/elements/CardHeaderMobile';
import CardFooterMobile from '@/modules/elements/CardFooterMobile';
import {
  getThumbnailPortrait
} from '@/utils/getData';
interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
  sliderRef?: any;
  setRemovedItem?: any;
}

const MovieCardReelPortrait: React.FC<MovieCardProps> = ({ data, portrait, gradient, sliderRef, setRemovedItem }) => {
  const router = useRouter();
  const { openModal, updateModal} = useMoviePopupStore();
  const [userId, setUserId] = React.useState('');
  const [isInWatchListTemp, setIsInWatchListTemp] = React.useState(data?.isInWatchList || false);
  const [removeRequest, setRemoveRequest] = React.useState(false);
  const [watchListRequest, setWatchListRequest] = React.useState(false);
  const [popupIsLoading, setPopupIsLoading] = React.useState(false);
  const [itemRemoved, setItemRemoved] = React.useState(false);

  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current as unknown as HTMLElement;
  const x = useRef(false);

  let dataExtend = {
    ...data,
    thumbOuter,
    sliderRef,
    isInWatchListTemp,
    setIsInWatchListTemp,
    setRemoveRequest,
    setWatchListRequest,
    popupIsLoading,
    itemRemoved,
  };

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

    
    dataExtend.xy = {
      x: left,
      y: round(top),
      width: popWidth,
      thumbW: thumbW > thumbH ? thumbW : thumbH,
    };
    dataExtend.handelAddMyList = handelAddMyList;
    dataExtend.handelRemoveWatchingList = handelRemoveWatchingList;

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
  const title = data?.title || '';
  let thumbURl = getThumbnailPortrait(data);
  let aspectRatio = '6/9';
  let progress = 0;
  if(data?.currentTime && data?.videoDuration){
    const duration:number = data?.videoDuration || 1;
    const current:number = data?.currentTime || 1;
    if(current !== 0 && duration !== 0){
      progress =  (current / duration) * 100;
    }
  }
  const redirectToWatch = useCallback(() => {
    if(data?.__typename === 'Series'){
      router.push(`/tvshow/${data?._id}`);
    }else if(data?.__typename === 'Channel'){
      router.push(`/channel/${data?._id}`);
    }else{
      router.push(`/details/${data?._id}`);      
    }
  }, [router, data?._id]);  
  const noGradientClass = gradient ? '' : ' bg-black py-1 ';

  const handelAddMyList = async (isInLish : boolean) => {
      console.log('handelAddMyList', isInWatchListTemp, userId, data?._id);      
      dataExtend.popupIsLoading = true;
      updateModal(dataExtend);
      let response;
      if(!isInLish) {
        response = await removeFromMyList(userId, data?._id);
      }else{
        response = await addToMyList(userId, data?._id);
      }
      console.log('response List: ', response);
      if(response.status === 'success') {
        dataExtend.isInWatchListTemp = isInLish;
        setIsInWatchListTemp(isInLish);
        console.log('isInWatchListTemp: 2 ', isInWatchListTemp);
      }else{
        console.log('Error: ', response);
      }
      dataExtend.popupIsLoading = false;
      updateModal(dataExtend);
      console.log('isInWatchListTemp: 3 ', isInWatchListTemp);
  };

  const handelRemoveWatchingList = async () => {
    console.log('handelRemoveWatchingList');
    dataExtend.popupIsLoading = true;
    updateModal(dataExtend);
    let response;
    response = await removeFromWatchingLists(userId, data?._id);
    console.log('response List: ', response);
    if(response.status === 'success') {
      dataExtend.isInWatchListTemp = false;
      setIsInWatchListTemp(false);
      console.log('isInWatchListTemp: 2 ', isInWatchListTemp);
      dataExtend.popupIsLoading = false;
      dataExtend.itemRemoved = true;
      setTimeout(() => {
        setRemovedItem(data?._id); 
      }, 100);
    }else{
      console.log('Error: ', response);
    }
    updateModal(dataExtend);     
    dataExtend.popupIsLoading = false;
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
    <div className='flex flex-col justify-end relative movieCard'>
      <div className='mb-0'>
        <CardHeaderMobile header={data?.header} />
      </div>
      <div 
      ref={thumbOuterRef}
      className={` w-full group bg-zinc-800 rounded-md col-span relative cursor-pointer aspect-[${aspectRatio}]`} 
      onMouseEnter={onHoverHandler} 
      onMouseLeave={onMouseLeave}
      onClick={redirectToWatch}
      > 
        <div className='img relative h-full w-full'>        
          <div className='absolute z-30 bottom-0 left-0 w-full '>
            <CardFooterMobile footer={data?.footer} />
            {(data?.currentTime || data?.currentTime === 0) ? <div className='m-1 lg:m-2 mt-0 lg:mt-0 flex items-center'>
              <ProgressBar done={progress} />
              <div onClick={(e) => {
              e.stopPropagation();
              handelRemoveWatchingList();
            }} className={`cursor-pointer lg:hidden`}>
                  <Cancel 
                  sx={{
                    fontSize: '1rem',
                  }}
                  className={`text-white h-2`} />
                </div>
              </div> : null}
          </div> 
          <RollImage thumbURl={thumbURl} title={title} />
          {gradient? <div className={`jkGradient absolute z-20 bottom-0 left-0 w-full h-full cursor-pointer`}/> : null}
        </div>
      </div>
    </div>
  )
}

export default MovieCardReelPortrait;
