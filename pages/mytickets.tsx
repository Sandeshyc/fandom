import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import usePurchaseMovies from '@/hooks/usePurchaseMovies';
import useIsMobile from "@/hooks/useIsMobile";
import useClientLocaion from "@/hooks/useClientLocaion";
import Preloader from "@/modules/skeletons/Preloader";
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
  const [isReady, setIsReady] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const router = useRouter();
  const isMobile = useIsMobile();
  const {data: clientLocation, error: locationError}:any = useClientLocaion();
  const region = clientLocation?.country?.isoCode;

  const { data: movies = [], isLoading, error } = usePurchaseMovies(region, isMobile ? "mobile" : "web", userId );
  // console.log('movies: ', movies);
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }else{
        router.push('/');
      }
    }else{
      router.push('/');
    }
  }, []);
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  return (
    <>
      {(!isLoading && isReady ) ? (<>
      <div className="pt-16 lg:pt-28 min-h-[80vh] bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]" style={{
        // backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        {/* <div className='container mx-auto max-w-[2400px]'> */}
          <Mapper
            modules={movies}
            getComponent = {getComponent}
            isLoading = {isLoading}/>
          {/* </div>      */}
      </div></>) : (<div className='container mx-auto max-w-[2400px]'><Preloader/></div>)}
      {(error)?<><ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error}/></>:null}
    </>
  )
}

export default Home;