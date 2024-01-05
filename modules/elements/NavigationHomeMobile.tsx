import React from 'react';
import { useRouter } from 'next/router';
import MobileBottomNav from '@/modules/elements/Navigation/MobileBottomNav';

const logoSrc = '/images/logonew.png';
const NavigationHomeMobile = () => {
  const router = useRouter();

  return (
    <>
    <div 
      className={`fixed top-0 left-0 z-40 w-full py-4 bg-gradient-to-b from-black from-50% to-transparent to-100%`}>
        <div
        className='px-4'>
            <div className='flex items-center justify-center flex-wrap'>
              <div className='mr-4'>
                  <img 
                  src={logoSrc} 
                  className="h-[45px] cursor-pointer" 
                  alt="Logo" onClick={() => router.push('/')} />
              </div>
              <div className='flex items-center'>
                <p
                className='mr-4 text-white font-medium text-xl'>Tickets</p>
              </div>
            </div>
        </div>
    </div>
    <MobileBottomNav/>
    </>
  )
}

export default NavigationHomeMobile;