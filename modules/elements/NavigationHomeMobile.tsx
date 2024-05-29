import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import MobileBottomNav from '@/modules/elements/Navigation/BottomNavigation';

const logoSrc = '/images/logoofbini.png';
const NavigationHomeMobile = () => {  
  const [userid, setUserid] = useState('');
  const router = useRouter();
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj?.sub) {
        setUserid(userInfoObj?.sub);
      }
    }
  }, []);
  return (
    <>
    <div 
      className={`mainNavbar fixed top-0 left-0 z-40 w-full py-4 bg-gradient-to-b from-black to-transparent`}>
        <div className='px-4'>
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
    {/* {(userid)?<MobileBottomNav/>:null} */}
    </>
  )
}

export default NavigationHomeMobile;