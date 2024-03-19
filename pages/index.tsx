import React, {useEffect, useState} from 'react';
import useMovieList from '@/hooks/useMovieList';
import SkeletonHome from '@/components/Skeleton/SkeletonHome';
import useIsMobile from '@/hooks/useIsMobile';
import getLocation from '@/services/api/location';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import getRandomNumber from '@/utils/randomNumber';
import EventRoll from '@/modules/components/EventRoll';

import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';

const bgImage = 'url("/images/new-bg.png")';
// Main Component of Home page
const Home = () => {
  const [isReady, setIsReady] = useState(false);
  const [userIdToken, setUserIdToken] = useState('');
  const [myRegion, setRegion] = useState('PH');
  const randomNumber = useState(getRandomNumber(100000, 900000));
  const isMobile = useIsMobile();

  const _location = async () => {
    const {countryIsoCode} = await getLocation();
    setRegion(countryIsoCode);
  }
  _location();

  const { data: movies = [], isLoading, error } = useMovieList(myRegion, (isMobile)?'mobile':'web', 'home', userIdToken, randomNumber.toString());
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

  return (<>
    <div
    className='bg-[#000000] text-white'
    style={{
      backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
    {(!isLoading && isReady && movies)?<>
      <Mapper
        modules={movies}
        getComponent = {getComponent}
        isLoading = {isLoading}/></> : (<SkeletonHome/>)}
    {(error)?<ErrorPopUp message={'Sorry, Something went wrong!'}/>:null}
    <EventRoll/>
    </div>
    </>) 
}

export default Home;
