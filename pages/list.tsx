import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import useListMovies from '@/hooks/useListMovies';
import MovieCardList from '@/components/MovieCardList';
import { Info } from '@mui/icons-material';
import { stableKeys } from '@/utils/stableKeys';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkeletonList from '@/components/Skeleton/SkeletonList';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
  const [userIdToken, setUserIdToken] = React.useState('');
  const [isReady, setIsReady] = React.useState(false);
  const router = useRouter();
  const { region, product } =  props; 
  const { data: movies = [], isLoading } = useListMovies(region, 'web', userIdToken);

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
  }, [])
  return (
    <>
      {(isReady && !isLoading) ? (<>
      <div className="py-16 pt-28 min-h-[80vh]"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <Mapper
          modules={movies}
          getComponent = {getComponent}
          isLoading = {isLoading}/> 
      </div>
      <Footer/>
      </>):(<SkeletonList/>)}
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