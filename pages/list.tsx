import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import useListMovies from '@/hooks/useListMovies';
import useIsMobile from "@/hooks/useIsMobile";
import useClientLocaion from "@/hooks/useClientLocaion";
import Preloader from '@/modules/skeletons/Preloader';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
const bgImage = 'url("/images/new-bg.png")';
const List = (props:any) => {
  const router = useRouter();
  const [userId, setUserId] = React.useState("");
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = React.useState(false);
  const [randomNumber, setRandomNumber] = React.useState(Math.floor(100000 + Math.random() * 900000).toString());
  const {data: clientLocation, error: locationError}:any = useClientLocaion();
  const region = clientLocation?.country?.isoCode;

  const { data: movies = [], isLoading, error } = useListMovies(region, isMobile ? "mobile" : "web", userId, randomNumber);

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
  }, [])
  return (
    <>
      {(isReady && !isLoading) ? (<>
      <div className={cssBoxBg}
        style={styleBoxBg}>
          <Mapper
            modules={movies}
            getComponent = {getComponent}
            isLoading = {isLoading}/> 
      </div>
      </>):(<Preloader/>)}
      {(error)?<><ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error}/></>:null}
    </>
  )
}

export default List;

const cssBoxBg = `bg-[#050505] text-white overflow-hidden relative bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]`;
const styleBoxBg = {
  // backgroundImage: bgImage,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% auto",
  backgroundPosition: "right " + 30 + "%",
}
