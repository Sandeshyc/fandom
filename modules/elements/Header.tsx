import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Notification from '@/modules/elements/Notification';
import SearchBox from '@/components/navbar/SearchBox';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';

const logoSrc = '/images/logonew.png';
const Header = () => {
  const router = useRouter();
  const {isLoginUser, isLoadingUserCheck} = useCheckAuthentication();

  return (
    <>
    <div 
      className={`mainHeader mainNavbar fixed top-0 left-0 z-40 w-full pt-2 bg-gradient-to-b from-black/80 from-50% via-black/50 via-70% to-black/10 to-100%`}>
        <div className='px-4 flex items-center justify-between relative'>
          <div className='flex items-center absolute top-0 h-full w-full left-0 justify-center z-10'>
            <p
              className='text-white font-medium text-[20px]'>Tickets</p>
          </div>
          <div className='flex items-center flex-wrap relative z-20'>
            <div className='mr-4'>
                <img 
                src={logoSrc} 
                className="h-[35px] sm:h-[40px] cursor-pointer" 
                alt="Logo" onClick={() => router.push('/')} />
            </div>
          </div>
          <div className='flex flex-row items-center relative z-20'>
            <div className='relative'>
              <SearchBox/>
            </div>
            {/* {(isLoginUser)&&<Notification/>}*/}
          </div>
        </div>
    </div>
    </>
  )
}

export default Header;