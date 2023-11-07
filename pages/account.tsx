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

const Home = (props) => {
  const [userIdToken, setUserIdToken] = React.useState('');
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
  return (
    <>
      <SideBar />
      <div className="py-16">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">My Account</p>
            <div className={`text-white`}>
              <h4>Profile</h4>
              <div className={`p-4 border border-gray-200 rounded-md`}>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;