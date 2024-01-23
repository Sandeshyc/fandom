import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import usePurchaseMovies from '@/hooks/usePurchaseMovies';
import Footer from '@/components/Footer';
import SkeletonPurchase from '@/components/Skeleton/SkeletonPurchase';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const router = useRouter();
  const { region, product } =  props; 
  const { data: movies = [], isLoading, error } = usePurchaseMovies(region, 'web', userIdToken );
  // console.log('movies: ', movies);
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  return (
    <>
      {(!isLoading && isReady) ? (<>
      <div className="py-16 lg:pt-28 min-h-[80vh]" style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <Mapper
          modules={movies}
          getComponent = {getComponent}
          isLoading = {isLoading}/>        
      </div></>) : (<SkeletonPurchase/>)}
      {(error)?<><ErrorPopUp message={error.message}/></>:null}
    </>
  )
}

export default Home;