import React from 'react';
import { useRouter } from 'next/router';

const logoSrc = '/images/logonew.png';
const Header = () => {
  const router = useRouter();

  return (
    <>
    <div 
      className={`fixed top-0 left-0 z-40 w-full pt-2 bg-gradient-to-b from-black/80 from-50% via-black/50 via-70% to-black/10 to-100%`}>
        <div
        className='px-4'>
            <div className='flex items-center justify-center flex-wrap'>
              <div className='mr-4'>
                  <img 
                  src={logoSrc} 
                  className="h-[40px] cursor-pointer" 
                  alt="Logo" onClick={() => router.push('/')} />
              </div>
              <div className='flex items-center'>
                <p
                className='mr-4 text-white font-medium text-xl'>Tickets</p>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header;