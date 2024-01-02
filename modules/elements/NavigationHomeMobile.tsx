import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavItem from '@/components/navbar/NavItem';
import ProfileDropDown from '@/components/navbar/ProfileDropDown';
import SearchBox from '@/components/navbar/SearchBox';
import {Notifications, Search} from '@mui/icons-material';

const logoSrc = '/images/logonew.png';
const NavigationHomeMobile = () => {
  const router = useRouter();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  // get scroll position in px
  const getScrollPosition = () => {
    return window?.pageYOffset;
  }

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = getScrollPosition();
      setScrollPosition(scrollPosition);
      if (scrollPosition > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div 
      className={`w-full py-4 bg-gradient-to-b from-black from-70% to-gray-800 to-100%`}>
        <div
        className='px-4'>
            <div className='flex items-center justify-center flex-wrap'>
              <div className='mr-4'>
                  <img 
                  src={logoSrc} 
                  className="h-[60px] cursor-pointer" 
                  alt="Logo" onClick={() => router.push('/')} />
              </div>
              <div className='flex items-center'>
                <p
                className='mr-4 text-white font-medium text-xl'>Tickets</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default NavigationHomeMobile;