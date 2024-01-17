import React from 'react';
import { useRouter } from 'next/router';
import Notification from '@/modules/elements/Notification';
import SearchBox from '@/components/navbar/SearchBox';

const logoSrc = '/images/logonew.png';
const Header = () => {
  const router = useRouter();

  return (
    <>
    <div 
      className={`fixed top-0 left-0 z-40 w-full pt-2 bg-gradient-to-b from-black/80 from-50% via-black/50 via-70% to-black/10 to-100%`}>
        <div className='px-4 flex items-center justify-between'>
          <div className='flex items-center flex-wrap'>
            <div className='mr-4'>
                <img 
                src={logoSrc} 
                className="h-[35px] sm:h-[40px] cursor-pointer" 
                alt="Logo" onClick={() => router.push('/')} />
            </div>
            <div className='flex items-center'>
              <p
              className='mr-4 text-white font-medium text-base sm:text-xl'>Tickets</p>
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <div className='mr-3 sm:mr-6 relative'>
              <SearchBox/>
            </div>
            <Notification/>
          </div>
        </div>
    </div>
    </>
  )
}

export default Header;