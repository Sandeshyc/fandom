import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import useMovieDetails from '@/hooks/useMovieDetails';
import useIsMobile from '@/hooks/useIsMobile';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import SkeletonDetails from '@/components/Skeleton/SkeletonDetails';

const bgImage = 'url("/images/new-bg.png")';

const Details = () => {
  const [isReady, setIsReady] = React.useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const { movieId } = router.query;
  const [userIdToken, setUserIdToken] = React.useState('');
  const { data: movieDetails, isLoading, error} = useMovieDetails(movieId as string, userIdToken, (isMobile)?'mobile':'web'); // Need to upate
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
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        // setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);


  return (<>
    {(isReady && !isLoading && movieDetails)?<>
      <div className="text-white" 
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
    {error && <ErrorPopUp message={'Sorry, Something went wrong!'}/>}
  </>
  )
}

export default Details;
