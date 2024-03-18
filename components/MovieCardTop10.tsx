import React, {useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { round } from 'lodash';
import {
  addToMyList,
  removeFromMyList,
  removeFromWatchingLists,
} from '@/services/api';
import SvgNumbers from '@/utils/SvgNumbers'
import { MovieInterface } from '@/types';
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';
import BadgeMobile from '@/modules/Identities/BadgeMobile';
import CardHeader from '@/modules/elements/CardHeader';
import CardFooter from '@/modules/elements/CardFooter';
import RollImage from '@/modules/Identities/RollImage';

interface MovieCardTopProps {
  data: MovieInterface;
  number?: number;
  portrait?: boolean;
  gradient?: boolean;
  sliderRef?: any;
  setRemovedItem?: any;
}

const MovieCardTop10: React.FC<MovieCardTopProps> = ({ data, portrait, number, gradient, sliderRef, setRemovedItem }) => {
  const router = useRouter();
  const { openModal, updateModal} = useMoviePopupStore();
  const [userId, setUserId] = React.useState('');
  const [isInWatchListTemp, setIsInWatchListTemp] = React.useState(data?.isInWatchList || false);
  const [popupIsLoading, setPopupIsLoading] = React.useState(false);
  const [itemRemoved, setItemRemoved] = React.useState(false);
  const [removeRequest, setRemoveRequest] = React.useState(false);
  const [watchListRequest, setWatchListRequest] = React.useState(false);
  
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

  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);
  const title = data?.title || '';
  let thumbURl = '';
  if(portrait){
    thumbURl = data?.thumbnailPortraitUrl || data?.thumbnailLandscapeUrl || '';
  }else{
    thumbURl = data?.thumbnailLandscapeUrl || data?.thumbnailPortraitUrl || '';
  }

  let progress = 0;
  if(data?.currentTime && data?.videoDuration){
    const duration:number = data?.videoDuration || 1;
    const current:number = data?.currentTime || 1;
    if(current !== 0 && duration !== 0){
      progress =  (current / duration) * 100;
    }
  }

  const handelAddMyList = async (isInLish : boolean) => {
      console.log('handelAddMyList', isInWatchListTemp);
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
    <div  
    ref={thumbOuterRef}
    className="group col-span relative movieCard movieCardTopBadgeWrap" onMouseEnter={onHoverHandler} onMouseLeave={onMouseLeave}>
      <div className='ticketBadge lg:hidden'>
      <CardHeader header={data?.header} />
      </div>
      <div className='movieCardTop movieCardTopV2'>
        <div className='number'><SvgNumbers item={number as number} /></div>
        <div className='img relative bg-zinc-900 rounded-md' onClick={redirectToWatch}>
          <div className='hidden lg:block'>
            <CardHeader header={data?.header} />
          </div> 
          <RollImage thumbURl={thumbURl} title={title}/>
        </div>
      </div>
    </div>
  )
}

export default MovieCardTop10;
