import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import usePurchaseMovies from '@/hooks/usePurchaseMovies';
import MovieCardPurchase from '@/components/MovieCardPurchase';
import { stableKeys } from '@/utils/stableKeys';
import { Info } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkeletonPurchase from '@/components/Skeleton/SkeletonPurchase';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const router = useRouter();
  const { region, product } =  props; 
  const { data: movies = [], isLoading } = usePurchaseMovies(region, 'web', userIdToken );
  // console.log('Movies:', movies);
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
      {(!isLoading && isReady) ? (<><Navbar/>
      <div className="py-16 pt-28 min-h-[80vh] bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]" style={{
        // backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-4 lg:pl-6">My Tickets</p>
            <div className="lg:px-6 pb-6 flex flex-wrap">
            {((Array.isArray(movies) && movies.length > 0)?(movies.map((item: any, index) => <MovieCardPurchase data={item} portrait={ true} key={stableKeys[index]} />)):<NoMovies/>)}
            </div>
          </div>
        </div>
      </div><Footer/></>) : (<SkeletonPurchase/>)}
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
