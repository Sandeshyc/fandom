import React, { use, useEffect } from 'react'
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import useUpcomingMovies from '@/hooks/useUpcomingMovies';
import MovieCardUpcoming from '@/components/MovieCardUpcoming';
import { stableKeys } from '@/utils/stableKeys';
import SkeletonUpcoming from '@/components/Skeleton/SkeletonUpcoming';

const Home = () => {
  const [isReady, setIsReady] = React.useState(false);
  const router = useRouter();
  
  const { data: movies = [], isLoading } = useUpcomingMovies();

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);

  useEffect(() => {
    setIsReady(true);
  }, [isLoading]);

  return (
    <>
      {(isReady && !isLoading)?(<>
      <SideBar />
      <div className="py-16">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">Up coming Movie</p>
            <div className="flex sm:flex-wrap gap-5 lg:px-6 pb-6 overflow-x-auto">
            {(Array.isArray(movies) && movies?.length > 0)?(movies?.map((item: any, index) => <MovieCardUpcoming 
            data={item} 
            key={stableKeys[index]}
            portrait={ true} />)):null}
            </div>
          </div>
        </div>
      </div>
      </>):<SkeletonUpcoming/>}
    </>
  )
}

export default Home;
