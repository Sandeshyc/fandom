import React, { useState, useEffect } from 'react';
import Episode from '@/modules/elements/Episode';
import Cast from '@/modules/elements/Cast';
// @ts-ignore
import ScrollSpy from 'react-scrollspy-navigation';

const ScrollSpyComponent = () => {
  const [mainNavHeight, setMainNavHeight] = useState(0);
  const [navbarTop, setNavbarTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const mainNavbar = document.querySelector('.mainNavbar');
      if(mainNavbar) {
        const mainNavbarBound = mainNavbar?.getBoundingClientRect();
        setMainNavHeight(mainNavbarBound?.height);
      }

      const navBar = document.querySelector('.ScrollSpyNav');
      if(navBar) {
        const navBarBound = navBar?.getBoundingClientRect();
        setNavbarTop(navBarBound?.top);
        console.log('navBarBound: ', mainNavHeight, 'navbarTop: ', navbarTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <div className={`ScrollSpyNav`}>
        <div className={`mb-8 ${(mainNavHeight > navbarTop) ? 'z-50 fixed w-full left-0 bg-black' : ''}`}
        style={{top: `${mainNavHeight}px`}}
        >
          <div className='container mx-auto border-b border-gray-600 flex lg:pt-4 text-base overflow-x-auto'>
          <ScrollSpy>
              <a href="#section1" className='block py-3 px-4 min-w-[120px] lg:min-w-[160px] text-center border-b-4 border-transparent whitespace-nowrap' ref={React.createRef()}>Episodes (7)</a>            
              <a href="#section2" className='block py-3 px-4 min-w-[120px] lg:min-w-[160px] text-center border-b-4 border-transparent whitespace-nowrap' ref={React.createRef()}>Cast & Crew </a>
              <a href="#section3" className='block py-3 px-4 min-w-[120px] lg:min-w-[160px] text-center border-b-4 border-transparent whitespace-nowrap' ref={React.createRef()}>Ratings</a>
              <a href="#section4" className='block py-3 px-4 min-w-[120px] lg:min-w-[160px] text-center border-b-4 border-transparent whitespace-nowrap' ref={React.createRef()}>More Info</a>
          </ScrollSpy>
          </div>
        </div>
        <div id="section1" className='mb-8 border-b border-gray-600'>
          <div className='max-w-[1000px] mx-auto'>
              <h3 className='text-xl mb-4'>Episodes (7)</h3>
              {
                  Array.from({length: 8}, (_, i) => {
                      return <Episode key={i}/>
                  })
              }
          </div>
        </div>
        <div id="section2" className='mb-8 border-b border-gray-600 pb-8'>
          <h3 className='text-xl mb-4'>Cast & Crew</h3>
            <p className="mb-1 md:mb-2 last:mb-0 text-gray-300">
              <span className="text-white">Cast: </span>
              Angel Locsin, Angelica Panganiban, Dingdong Dantes, Zanjoe Marudo
            </p>
            <p className="mb-1 md:mb-2 last:mb-0 text-gray-300">
              <span className="text-white">Director: </span>
              Vince McMahon
            </p>
        </div>
        <div id="section3" style={{ height: '30vh', backgroundColor: 'black' }} className='mb-8 border-b border-gray-600'>
          <h3 className='text-xl mb-4'>Rating & Review</h3>
        </div>
        <div id="section4" className='mb-8 pb-8 border-b border-gray-600'>
          <h3 className='text-xl mb-4'>More Info</h3>
          <p className='text-white/80 text-sm asFooterMenuWrap'>Genre: 
              <span className='inline-flex items-center px-2 py-1 text-blue-500'>Adventure</span>
              <span className='inline-flex items-center px-2 py-1 text-blue-500'>Drama</span>
          </p>
          <p className='text-white/80 text-sm'>Released: 2006</p>
          <p className='text-white/80 text-sm'>Rating: TV-PG</p>
          <p className='text-white/80 text-sm'>Studio: CBS</p>
          <p className='text-white/80 text-sm'>Language: English</p>
        </div>
      </div>
    </>
  );
};

export default ScrollSpyComponent;
