import React, { use, useEffect } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import Navbar from '@/components/Navbar';
import BillboardExtended from '@/components/BillboardExtended';
import InfoModal from '@/components/InfoModal';
import MovieList from '@/components/MovieList';
import useListMovies from '@/hooks/useListMovies';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import MovieCardList from '@/components/MovieCardList';
import { Info } from '@mui/icons-material';
import { stableKeys } from '@/utils/stableKeys';

const Home = (props) => {
  const [userIdToken, setUserIdToken] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const { region, product } =  props; 

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        // router.push('/');
        setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);

  const { data: movies = [] } = useListMovies(region, 'web', userIdToken);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, [movies])
  return (
    <>
      <SideBar />
      <div className="py-16">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">My List</p>
            <div className="lg:px-6 pb-6 flex flex-wrap">
            {(!isLoading)?((Array.isArray(movies?.watchList) && movies?.watchList.length > 0)?(movies?.watchList.map((item: any, index) => <MovieCardList 
            data={item} 
            key={stableKeys[index]}
            portrait={ true} />)):<NoMovies/>):null}
            </div>
          </div>
        </div>
      </div>
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