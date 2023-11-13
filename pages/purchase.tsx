import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import usePurchaseMovies from '@/hooks/usePurchaseMovies';
import MovieCardPurchase from '@/components/MovieCardPurchase';
import { Info } from '@mui/icons-material';
import SkeletonPurchase from '@/components/Skeleton/SkeletonPurchase';

const Home = (props) => {
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const router = useRouter();
  const { region, product } =  props; 
  const { data: movies = [], isLoading } = usePurchaseMovies(region, 'web', userIdToken );
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
      {(!isLoading && isReady) ? (<><SideBar />
      <div className="py-16">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">My Purchase</p>
            <div className="lg:px-6 pb-6 flex flex-wrap">
            {((Array.isArray(movies) && movies.length > 0)?(movies.map((item: any) => <MovieCardPurchase data={item} portrait={ true} />)):<NoMovies/>)}
            </div>
          </div>
        </div>
      </div></>) : (<SkeletonPurchase/>)}
    </>
  )
}

export default Home;

const NoMovies = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[450px] max-w-full bg-gray-600 p-8 rounded-md">
      <Info className="w-[100px] h-[100px] text-yellow-500 mb-4 text-xl" />
      <p className="text-white text-2xl">No movies found!</p>
    </div>
  )
}
