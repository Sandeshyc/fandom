import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import useListMovies from '@/hooks/useListMovies';
import { Info } from '@mui/icons-material';
import useIsMobile from "@/hooks/useIsMobile";
import useClientLocaion from "@/hooks/useClientLocaion";
import Preloader from '@/modules/skeletons/Preloader';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
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
      <div className="pt-16 lg:pt-28 min-h-[80vh] bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]"
      style={{
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
          {/* </div> */}
      </div>
      </>):(<div className='container mx-auto max-w-[2400px]'><Preloader/></div>)}
      {(error)?<><ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error}/></>:null}
    </>
  )
}

export default Home;

const NoMovies = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[450px] max-w-full bg-gray-600 p-8 rounded-md">
      <Info className="w-[100px] h-[100px] text-yellow-500 mb-4" />
      <p className="text-white text-2xl">No movies found!</p>
    </div>
  )
}