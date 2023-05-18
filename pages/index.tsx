import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import {SideBar, AnimatedRow} from 'imp-design-system';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';

export async function getServerSideProps(context: NextPageContext) {
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
    props: {}
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

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
      if (movieItem.displayType === 'billboard'){
        return;
      }
      if (movieItem.displayType === 'animated'){
        return <AnimatedRow title={movieItem.title} data={movieItem.items} />
      } 
      
      return <MovieList title={movieItem.title} portrait={ movieItem.title === "Fantasy"} data={movieItem.items} />
      
    })

    return rows.filter(item => item)
  }
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      {/* <Navbar /> */}
      <SideBar />
      {getBillboard()}
      <div className="pb-40">
        {getRows()}
      </div>
    </>
  )
}

export default Home;
