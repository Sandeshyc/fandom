import React, { use, useEffect } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import Navbar from '@/components/Navbar';
import BillboardExtended from '@/components/BillboardExtended';
import InfoModal from '@/components/InfoModal';
import MovieList from '@/components/MovieList';
import useUpcomingMovies from '@/hooks/useUpcomingMovies';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import MovieCardUpcoming from '@/components/MovieCardUpcoming';

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

const Home = () => {

  const router = useRouter();
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        // router.push('/');
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);

  const { data: movies = [] } = useUpcomingMovies();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  

  const getRows = () => {
    let i = 0;
    const rows = movies.map(movieItem => {
      if (movieItem.displayType !== 'billboard'){
        return <MovieList title={movieItem.title} portrait={ movieItem.title === "Fantasy"} data={movieItem.items} />
      }
    })
    return rows.filter(item => item)
  }

  useEffect(() => {
    console.log('Movies: ', movies);
  }, [movies])
  return (
    <>
      <SideBar />
      <div className="py-16">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">Up coming Movie</p>
            <div className="flex sm:flex-wrap gap-5 lg:px-6 pb-6 overflow-x-auto">
            {(Array.isArray(movies) && movies.length > 0)?(movies.map((item: any) => <MovieCardUpcoming data={item} portrait={ true} />)):null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
