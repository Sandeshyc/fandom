import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import useClientLocaion from '@/hooks/useClientLocaion';
import SkeletonWatch from '@/components/Skeleton/SkeletonWatch';
import useMovieWatch from '@/hooks/useMovieWatch';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import useIsMobile from '@/hooks/useIsMobile';

const Watch = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState('');
  const isMobile = useIsMobile();
  const {movieId, trailer } = router.query;
  const {data: clientLocation, error: locationError}:any = useClientLocaion();
  const region = clientLocation?.country?.isoCode;
  const { data, error, isLoading } = useMovieWatch(movieId as string, userId as string, (isMobile)?'mobile':'web', region);
  console.log('isLoading', isLoading, 'data', data, 'error', error);

  useEffect(() => {
    setIsReady(true);
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);
  return (    
    <>
      {(isReady && !isLoading && data)?<>
        <div className="text-white bg-[#000000] overflow-x-hidden bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]">
          <Mapper
          modules={data}
          itemCode = {movieId as string}
          getComponent = {getComponent}
          isLoading = {isLoading}/>
        </div>
      </>:<SkeletonWatch/>}
      {(error || locationError) && <ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error || locationError}/>}
    </>
  )
}

export default Watch;