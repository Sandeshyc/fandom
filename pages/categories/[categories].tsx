import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import useAllMovie from '@/hooks/useAllMovies';
import useClientLocaion from '@/hooks/useClientLocaion';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import Preloader from "@/modules/skeletons/Preloader";
import useIsMobile from '@/hooks/useIsMobile';

const bgImage = 'url("/images/new-bg.png")';

const Categories = (props:any) => {  
  const [isReady, setIsReady] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  const router = useRouter();
  const isMobile = useIsMobile();
  const { categories } = router.query;
  console.log('categories', categories);

  const {data: clientLocation, error: locationError}:any = useClientLocaion();
  const region = clientLocation?.country?.isoCode;

  const { data, isLoading, error} = useAllMovie(categories as string, userId as string, (isMobile)?'mobile':'web', region);
  console.log('data dddd', data);

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
    setIsReady(true);
  }, []);
  return (<>
    <div
    className='bg-[#000000] text-white bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]'
    style={{
      // backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
    {(!isLoading && isReady && data)?<>
      <Mapper
        modules={data}
        itemCode={categories as string}
        getComponent = {getComponent}
        isLoading = {isLoading}/></> : (<Preloader/>)}
    {(error || locationError)?<ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error}/>:null}
    </div>
    </>) 
}

export default Categories;