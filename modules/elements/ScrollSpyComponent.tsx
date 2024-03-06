import React, { useState, useEffect } from 'react';
import Episode from '@/modules/elements/Episode';
import Cast from '@/modules/elements/Cast';
// @ts-ignore
import ScrollSpy from 'react-scrollspy-navigation';

const ScrollSpyComponent = () => {
  return (
    <>
    <div className='mb-8 border-b border-gray-600 flex flex-wrap ScrollSpyNav'>
        <ScrollSpy>
            <a href="#section1" className='block py-1 px-4 min-w-[160px] text-center border-b-2 border-transparent' ref={React.createRef()}>Episodes (7)</a>            
            <a href="#section2" className='block py-1 px-4 min-w-[160px] text-center border-b-2 border-transparent' ref={React.createRef()}>Cast & Crew </a>
            <a href="#section3" className='block py-1 px-4 min-w-[160px] text-center border-b-2 border-transparent' ref={React.createRef()}>Ratings</a>
            <a href="#section4" className='block py-1 px-4 min-w-[160px] text-center border-b-2 border-transparent' ref={React.createRef()}>More Info</a>
        </ScrollSpy>
      </div>
      <div id="section1" className='mb-8 border-b border-gray-600'>
        <div className='max-w-[1000px] mx-auto'>
            <h3 className='text-xl mb-4'>Episodes (7)</h3>
            {
                Array.from({length: 3}, (_, i) => {
                    return <Episode/>
                })
            }
        </div>
      </div>
      <div id="section2" className='mb-8 border-b border-gray-600 pb-8'>
        <h3 className='text-xl mb-4'>Cast & Crew</h3>
            <div className='flex flex-wrap'>
            {
                Array.from({length: 7}, (_, i) => {
                    return <Cast/>
                })
            }
            </div>
      </div>
      <div id="section3" style={{ height: '30vh', backgroundColor: 'black' }} className='mb-8 border-b border-gray-600'>
        <h3 className='text-xl mb-4'>Rating Comming soon</h3>
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
    </>
  );
};

export default ScrollSpyComponent;
