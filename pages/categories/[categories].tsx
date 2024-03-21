import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import useAllMovie from '@/hooks/useAllMovies';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import SkeletonHome from '@/components/Skeleton/SkeletonHome';
import useIsMobile from '@/hooks/useIsMobile';

const bgImage = 'url("/images/new-bg.png")';

const Categories = (props:any) => {  
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const router = useRouter();
  const isMobile = useIsMobile();
  const { categories } = router.query;

  const { data, isLoading, error} = useAllMovie(categories as string);
  console.log('data', data);

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }
    }
    setIsReady(true);
  }, []);
  return (<>
    <div
    className='bg-[#000000] text-white'
    style={{
      backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
    {(!isLoading && isReady && data)?<>
      <Mapper
        modules={data}
        getComponent = {getComponent}
        isLoading = {isLoading}/></> : (<SkeletonHome/>)}
    {(error)?<ErrorPopUp message={'Sorry, Something went wrong!'}/>:null}
    </div>
    </>) 
}

export default Categories;