import React, {use, useEffect} from 'react';
import { useRouter } from 'next/router';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import useMovieDetails from '@/hooks/useMovieDetails';
import useIsMobile from '@/hooks/useIsMobile';
import getLocation from '@/services/api/location';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import SkeletonDetails from '@/components/Skeleton/SkeletonDetails';

const bgImage = 'url("/images/new-bg.png")';

const Details = () => {
  const [isReady, setIsReady] = React.useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [region, setRegion] = React.useState('PH'); // Need to update
  const { movieId } = router.query;
  const [isError, setIsError] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const _location = async () => {
    const {countryIsoCode} = await getLocation();
    // console.log('countryIsoCode ', countryIsoCode);
    setRegion(countryIsoCode);
  }
  _location();
  const { data: movieDetails, isLoading, error} = useMovieDetails(movieId as string, userIdToken, (isMobile)?'mobile':'web', region); // Need to upate
  console.log('movieDetails', movieDetails);
  console.log('isLoading', isLoading);
  console.log('error', error);
  // const { data: movieDetails, isLoading} = useMovieDetails(movieId as string, userIdToken, (isMobile)?'mobile':'web');
  useEffect(() => {
    setIsReady(true);
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }
    }    
  }, []);

  useEffect(() => {
    console.log('movieId', movieId);
    if(isLoading && !movieId){
      setIsError(true);
    }
  }, [isLoading]);

  useEffect(() => {    
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        // setUserIdToken(userInfoObj.sub);
      }else{
        // router.push('/auth');
      }
    }else{
      // router.push('/auth');
    }
  }, []);

  return (<>
    {(isReady && !isLoading && movieDetails)?<>
      <div className="text-white bg-[#000000] overflow-x-hidden" 
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 50 + 'vh',
      }}>
        <Mapper
        modules={movieDetails}
        getComponent = {getComponent}
        isLoading = {isLoading}/>
      </div>
    </>:<SkeletonDetails/>}
    {(error || isError) && <ErrorPopUp message={'Sorry, Something went wrong!'}/>}
  </>
  )
}

export default Details;
