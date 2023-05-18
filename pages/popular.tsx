import React, { use } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import BillboardExtended from '@/components/BillboardExtended';
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
        return <BillboardExtended data={movieItem} />
      }
    })

    return rows.filter(item => item)
  }

  const getRows = () => {
    let i = 0;
    const rows = movies.map(movieItem => {
      if (movieItem.displayType !== 'billboard'){
        return <MovieList title={movieItem.title} portrait={ movieItem.title === "Fantasy"} data={movieItem.items} />
      }
    })

    return rows.filter(item => item)
  }
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      {getBillboard()}
      <div className="pb-40">
        {getRows()}
      </div>
    </>
  )
}

export default Home;
