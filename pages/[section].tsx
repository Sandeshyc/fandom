import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import BillboardExtended from '@/components/BillboardExtended';
import MovieListTops from '@/components/MovieListTops';
import Animated from '@/components/Animated';
import SideBar from '@/components/SideBar'

export async function getServerSideProps(context: NextPageContext) {
  const { region = null, product = null } = context.query;
  
  const sectionName = context?.params?.section || '';
  const parts = (context.pathname) || []
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {region, product, sectionName}
  }
}

const Home = (props) => {
  const {region, product, sectionName} =  props;
  const { data: movies = [] } = useMovieList(region, product, sectionName);
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  const getNavBar = () => {
    const rows = movies.map(movieItem => {
      if (movieItem.displayType == 'navigation'){
        if (movieItem.title === 'SideBar')
          return <SideBar />
        else
          return <Navbar />
      }
    })

    return rows.filter(item => item)
  }

  const getBillboard = () => {
    const rows = movies.map(movieItem => {
      if (movieItem.displayType == 'billboard'){
        return <Billboard data={movieItem.items[Math.floor(Math.random() * movieItem.items.length)]} />
      }
    })

    return rows.filter(item => item)
  }

  const getRows = () => {
    const rows = movies.map(movieItem => {

      switch (movieItem.displayType) {
        case 'billboard':
          return;
        case 'animated':
          return <Animated title={movieItem.title} data={movieItem} />;
        case 'roll':
          return <MovieList title={movieItem.title} portrait={ false} data={movieItem.items} />
        case 'extended' :
          return <BillboardExtended data={movieItem} title={movieItem.title}/>
        case 'potrait' :
          return <MovieList title={movieItem.title} portrait={ true} data={movieItem.items} />
        case 'top10' :
          return <MovieListTops title={movieItem.title} data={movieItem.items} portrait />         
        default:
          return <MovieList title={movieItem.title} portrait={ false} data={movieItem.items} />
      }

      if (movieItem.displayType === 'billboard'){
        return;
      }
      if (movieItem.displayType === 'animated'){
        
      } 
      
      
      
    })

    return rows.filter(item => item)
  }
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} region={region}/>
      {getNavBar()}
      {getBillboard()}
      <div className="pb-40">
        {getRows()}
      </div>
    </>
  )
}

export default Home;
