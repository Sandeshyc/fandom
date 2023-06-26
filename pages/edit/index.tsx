import React, { useCallback, useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import {SideBar} from 'imp-design-system';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import EditInfoModal from '@/components/editLayout/EditPlaylistModal';
import EditChangePlaylistModal from '@/components/editLayout/EditChangePlaylistModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useEditInfoModal from '@/hooks/useEditPlaylistModal';
import useEditChangePlaylistModal from '@/hooks/useEditChangePlaylistModal';
import useSavedPagesStore from '@/hooks/useSavedPagesStore';
import useCurrentPageStore, {layoutType} from '@/hooks/useCurrentPageStore';
import useReorderLayout from '@/hooks/useReorderLayout';  
import BillboardExtended from '@/components/BillboardExtended';
import MovieListTops from '@/components/MovieListTops';
import Animated from '@/components/Animated';
import EditMenu from '@/components/editLayout/EditMenu';
import ReorderLayout from '@/components/editLayout/ReorderLayout';

import { stableKeys } from "@/utils/stableKeys";


export async function getServerSideProps(context: NextPageContext) {
  const region = context.query.region || ""
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
    props: {region}
  }
}

const Home = (props) => {

  const region =  props.region;
  const { data: movieLists = [] } = useMovieList(region);
  const { data: favorites = [] } = useFavorites();
  const {savedPages = [], setSavedPages} = useSavedPagesStore();
  const {currentLayout = {} as layoutType, setCurrentLayout} = useCurrentPageStore();

  const {isOpen, closeModal} = useInfoModalStore();
  const {isOpen: editPlaylistIsOpen, closeModal: editPlaylistCloseModal} = useEditInfoModal();
  const {isOpen: changePlaylistIsOpen, closeModal: changePlaylistCloseModal} = useEditChangePlaylistModal();
  const {isOpen: reorderLayoutIsOpen, closeModal: reorderLayoutCloseModal} = useReorderLayout();

  // const [currentLayout, setCurrentLayout] = useState(movieLists);

  


  const getNavBar = () => {
    const rows = movieLists.map((movieList: any[]) => {
      if (movieList.displayType == 'navigation'){
        if (movieList.title === 'SideBar')
          return <SideBar />
        else
          return <Navbar />
      }
    })

    return rows.filter(item => item)
  }

  /* xx const getBillboard = () => {
    const rows = movieLists.map(movieList => {
      if (movieList.displayType == 'billboard'){
        return <div className='editItem' draggable >
            <Billboard data={movieList.items[Math.floor(Math.random() * movieList.items.length)]} />
          </div>
      }
    })

    return rows.filter(item => item)
  } */

  useEffect(() => {
    const pageData = savedPages.find(pageData => pageData.pageName === 'iwantTFCHome');
    if (pageData){
      setCurrentLayout(pageData);
    }else{
      setCurrentLayout({pageName: 'iwantTFCHome', items: movieLists});
    }
  }, [movieLists.length]);

  const handleUpdateLayout = (newLayout) => {
    setCurrentLayout(newLayout);
  };


  const getRows = () => {
    const rows = Array.isArray(currentLayout.items)
    ? currentLayout.items.map((movieList, index) => {
      console.log('movieList', movieList);
      let row = null;
      switch (movieList.displayType) {
        case 'billboard':
          // break;
          row = <Billboard data={movieList.items[Math.floor(Math.random() * movieList.items.length)]} />
          break;
        case 'animated':
          row = <Animated title={movieList.title} data={movieList} />;
          break;
        case 'roll':
          row = <MovieList title={movieList.title} portrait={ false} data={movieList.items} />
          break;
        case 'extended' :
          row = <BillboardExtended data={movieList} title={movieList.title}/>
          break;
        case 'potrait' :
          row = <MovieList title={movieList.title} portrait={ true} data={movieList.items} />
          break;
        case 'top10' :
          row = <MovieListTops title={movieList.title} data={movieList.items} portrait />         
          break;
        default:
          break;
      }
      if (movieList.hasOwnProperty('visibility')) {
        if(movieList.visibility !== true){
      return row ? (
        <div key={stableKeys[index]} className={`editItem ${movieList.displayType !== 'billboard'? 'relative' : ''}`}>
          <div style={{cursor: "pointer"}} className='absolute z-[2] right-2 top-1 w-100 text-white'>
            <EditMenu currentLayout={currentLayout} playlist={movieList} index={index} visible={reorderLayoutIsOpen} onClose={reorderLayoutCloseModal} setCurrentLayout={handleUpdateLayout} />
          </div>
          {row}
        </div>
      ) : null;}}
      else{
        return row ? (
          <div key={stableKeys[index]} className={`editItem ${movieList.displayType !== 'billboard'? 'relative' : ''}`}>
            <div style={{cursor: "pointer"}} className='absolute z-[2] right-2 top-1 w-100 text-white'>
              <EditMenu currentLayout={currentLayout} playlist={movieList} index={index} visible={reorderLayoutIsOpen} onClose={reorderLayoutCloseModal} setCurrentLayout={handleUpdateLayout} />
            </div>
            {row}
          </div>
        ) : null;
      }
      
      
    }): null

    return rows;
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} region={region}/>
      <EditInfoModal visible={editPlaylistIsOpen} onClose={editPlaylistCloseModal} />
      <EditChangePlaylistModal visible={changePlaylistIsOpen} onClose={changePlaylistCloseModal} region={region}/>
      <ReorderLayout visible={reorderLayoutIsOpen} onClose={reorderLayoutCloseModal} title="Change Layout"/>


      {getNavBar()}
      <div className='layoutEdit pt-40 pb-40  transform origin-top-left scale-90 overflow-hidden'  >
        <div className='editInnter' >
            {/* {getBillboard()} */}
            {getRows()}
        </div>
      </div>
    </>
  )
}

export default Home;
