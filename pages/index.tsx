import React, {useEffect} from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import MovieListPurchase from '@/components/MovieListPurchase';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useActivePurchaseMovies from '@/hooks/useActivePurchaseMovies';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import BillboardExtended from '@/components/BillboardExtended';
import MovieListTops from '@/components/MovieListTops';
import Animated from '@/components/Animated';
import SideBar from '@/components/SideBar'
import SkeletonHome from '@/components/Skeleton/SkeletonHome';
import { stableKeys } from '@/utils/stableKeys';

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

const Home = (props) => {
  const router = useRouter();
  const { region, product } =  props;
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');

  const { data: movies = [], isLoading } = useMovieList(region, 'web', 'home', userIdToken);
  const { data: myPurchaseLayout = [] } = useActivePurchaseMovies(region, 'web', userIdToken, '1' );

  useEffect(() => {
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

  // const movies = [];
  // const myPurchaseLayout = [];
  
  // if(userIdToken){
  //   const { data: movies } = useMovieList(region, product, 'home', userIdToken);
  //   const { data: myPurchaseLayout } = usePurchaseMovies(region, 'web', userIdToken );
  // }else{
    
  // }
  // console.log('movies: d', movies);
  // const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  

  const getNavBar = () => {
    const rows = movies?.map((movieItem, index) => {
      if (movieItem?.displayType == 'navigation'){
        if (movieItem?.title === 'SideBar')
          return <SideBar key={stableKeys[index]}/>
        else
          return <Navbar key={stableKeys[index]}/>
      }
    })

    return rows?.filter(item => item)
  }

  const getBillboard = () => {
    const rows = movies?.map((movieItem, index) => {   
      if (movieItem?.displayType == 'billboard' && movieItem?._id){
        return <Billboard 
          data={movieItem?.items[Math.floor(Math.random() * movieItem?.items?.length)]} 
          key={stableKeys[index]}
          />
      }
    })

    return rows?.filter(item => item)
  }

  const getRows = () => {    

    const rows = movies?.map((movieItem, index) => {
      if(Array.isArray(movieItem?.items) && (movieItem?.items?.length > 0 || movieItem?.displayType === 'myPurchase')){
        // console.log('movieItem Yes', movieItem);
        switch (movieItem?.displayType) {
          case 'billboard':
            return;
          case 'animated':
            // return <Animated title={movieItem.title} data={movieItem} />;
            return;
          case 'roll':
            return <MovieList title={movieItem?.title} portrait={ false} data={movieItem.items} key={stableKeys[index]}/>
          case 'extended' :
            return <BillboardExtended data={movieItem} title={movieItem.title} key={stableKeys[index]}/>
          case 'potrait' :
            return <MovieList title={movieItem.title} portrait={ true} data={movieItem.items} key={stableKeys[index]}/>
          case 'top10' :
            return <MovieListTops title={movieItem.title} data={movieItem.items} portrait key={stableKeys[index]}/>  
          case 'myPurchase' :    
            return <MovieListPurchase title={"My Purchases"} data={myPurchaseLayout} key={stableKeys[index]}/>    
          default:
            return <MovieList title={movieItem.title} portrait={ false} data={movieItem.items} key={stableKeys[index]}/>
        }
      } else{
        // console.log('movieItem No', movieItem);
        return;
      }

        if (movieItem.displayType === 'billboard'){
          return;
        }
        if (movieItem.displayType === 'animated'){
          
        } 
    })    
    return rows?.filter(item => item)
  }

  return (
    <>
    {(!isLoading && isReady)? <><InfoModal visible={isOpen} onClose={closeModal} region={region}/>
      {getNavBar()}
      {getBillboard()}
      <div className="pb-40 overflow-hidden">
        {getRows()}
      </div></> : (<SkeletonHome/>)}
    </>
  ) 
}

export default Home;
