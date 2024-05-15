import React, {useEffect, useState} from 'react';
import useMovieList from '@/hooks/useMovieList';
import Preloader from '@/modules/skeletons/Preloader';
import useIsMobile from '@/hooks/useIsMobile';
// import getLocation from '@/services/api/location';
import useClientLocaion from '@/hooks/useClientLocaion';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import getRandomNumber from '@/utils/randomNumber';

import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';

const bgImage = 'url("/images/new-bg.png")';
// Main Component of Upcoming page
const Upcoming = () => {
  const [isReady, setIsReady] = useState(false);
  const [userIdToken, setUserIdToken] = useState('');
  // const [myRegion, setRegion] = useState('PH');
  const randomNumber = useState(getRandomNumber(100000, 900000));
  const isMobile = useIsMobile();

  const {data: clientLocation, error: locationError}:any = useClientLocaion();
  const region = clientLocation?.country?.isoCode;

  const { data: movies = [], isLoading, error } = useMovieList(region, (isMobile)?'mobile':'web', 'upcoming', userIdToken, randomNumber.toString());
  // console.log('Home Page: ', userIdToken, 'isLoading: ', isLoading, 'movies: ', movies, 'error: ', error);

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

  return (
    <div
    className='bg-[#000000] text-white bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]'
    style={{
      // backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
    {(!isLoading && isReady && movies)?<>
      <Mapper
        modules={movies}
        getComponent = {getComponent}
        isLoading = {isLoading}/></> 
      : (<Preloader/>)}
    {(error || locationError)?<ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error}/>:null}
    </div>
    )
}

export default Upcoming;