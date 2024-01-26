import React, {useEffect, useState} from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import useMovieList from '@/hooks/useMovieList';
import AmazingDeals from '@/modules/components/AmazingDeals';
import SkeletonHome from '@/components/Skeleton/SkeletonHome';
import useIsMobile from '@/hooks/useIsMobile';
import Welcome from '@/modules/elements/Welcome';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';

import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';

export async function getServerSideProps(context: NextPageContext) {
  const region = context.query.region || ""
  const session = await getSession(context);
  const product = context.query.product || "web" 

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/popular',
  //       permanent: false,
  //     }
  //   }
  // }

  return {
    props: {region}
  }
}

const bgImage = 'url("/images/new-bg.png")';

const Home = (props:any) => {
  const router = useRouter();
  const { region, product } =  props;
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const [randomNumber, setRandomNumber] = React.useState(Math.floor(100000 + Math.random() * 900000).toString());

  const isMobile = useIsMobile();
  // console.log('productPlatform: ', isMobile);

  const { data: movies = [], isLoading, error } = useMovieList(region, (isMobile)?'mobile':'web', 'home', userIdToken, randomNumber.toString());
  console.log(userIdToken, 'isLoading: ', isLoading, 'movies: ', movies, 'error: ', error);

  useEffect(() => {
    // console.log('Home: back ', movies);
    setRandomNumber(Math.floor(100000 + Math.random() * 900000).toString());
    const userInfo = window.localStorage.getItem('userInfo');    
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        router.push('/');
        setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
    setIsReady(true);
    
  }, []);

  return (<>
    <div
    className='bg-[#000000] text-white'
    style={{
      backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
    {/* <Welcome/> */}
    {(!isLoading && isReady && movies)?<>
      <Mapper
        modules={movies}
        getComponent = {getComponent}
        isLoading = {isLoading}/></> : (<SkeletonHome/>)}
    {(error)?<ErrorPopUp message={'Sorry, Something went wrong!'}/>:null}
    </div>
    </>) 
}

export default Home;
