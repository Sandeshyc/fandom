import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import usePurchaseMovies from '@/hooks/usePurchaseMovies';
import MovieCardPurchase from '@/components/MovieCardPurchase';
import { stableKeys } from '@/utils/stableKeys';
import { Info } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkeletonPurchase from '@/components/Skeleton/SkeletonPurchase';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props) => {
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const [openTab, setOpenTab] = React.useState(0);
  const router = useRouter();
  const { region, product } =  props; 
  const { data: movies = [], isLoading } = usePurchaseMovies(region, 'web', userIdToken );
  // movie sort by title
  const moviesSort = movies?.sort((a, b) => (a.title < b.title) ? 1 : -1);
  console.log('Movies:', movies);
  console.log('Movies new:', moviesSort);
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
      <div className="py-16 pt-28 min-h-[80vh]" style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-4">My Tickets</p>
            <ul className='text-white flex flex-wrap text-center my-8'>
              <li className={`text-white border-2 flex justify-center items-center ${(openTab === 0)?'border-white bg-blue-500':'border-gray-500'} rounded-full h-[40px] py-2 px-4 mr-8 min-w-[160px] cursor-pointer hover:border-white/80`}
              onClick={() => setOpenTab(0)}
              >Active Tickets</li>
              <li className={`text-white border-2 flex justify-center items-center ${(openTab === 1)?'border-white bg-blue-500':'border-gray-500'} rounded-full h-[40px] py-2 px-4 mr-2 min-w-[160px] cursor-pointer hover:border-white/80`}
              onClick={() => setOpenTab(1)}
              >Expired Tickets</li>
            </ul>
            <div className={`pb-6 ${(openTab === 0)?'flex flex-wrap':'hidden'}`}>
            {((Array.isArray(moviesSort) && moviesSort.length > 0)?(moviesSort.map((item: any, index) => <MovieCardPurchase data={item} portrait={ true} key={stableKeys[index]} />)):<NoMovies/>)}
            </div>
            <div className={`pb-6  ${(openTab === 1)?'flex flex-wrap flex-row-reverse justify-end':'hidden'}`}>
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
