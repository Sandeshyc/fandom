import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import useListMovies from '@/hooks/useListMovies';
import MovieCardList from '@/components/MovieCardList';
import { Info } from '@mui/icons-material';
import { stableKeys } from '@/utils/stableKeys';
import SkeletonList from '@/components/Skeleton/SkeletonList';

const Home = (props) => {
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
      {(isReady && !isLoading) ? (<><SideBar />
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
      </div></>):(<SkeletonList/>)}
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