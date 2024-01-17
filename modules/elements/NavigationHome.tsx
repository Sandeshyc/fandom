import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavItem from '@/components/navbar/NavItem';
import ProfileDropDown from '@/components/navbar/ProfileDropDown';
import SearchBox from '@/components/navbar/SearchBox';
import {Notifications, Search} from '@mui/icons-material';
import useIsMobile from '@/hooks/useIsMobile';
import NavigationHomeMobile from '@/modules/elements/NavigationHomeMobile';
import Notification from '@/modules/elements/Notification';
const logoSrc = '/images/logonew.png';
const NavigationHome = () => {
  const router = useRouter();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
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
    <>
    {(isMobile)?(<NavigationHomeMobile/>):
    <div 
      className={`w-full py-4 border-b border-white/40 fixed z-50 top-0 left-0 bg-gradient-to-b ${(scrollPosition>60)?'from-black from-100%':'from-black/40 from-70%'} to-transparent to-100%`}>
        <div
        className='px-4'>
            <div className='flex items-center justify-between flex-wrap'>
              <div className='flex items-center'>
                <div className='mr-8'>
                  <img 
                  src={logoSrc} 
                  className="h-[60px] cursor-pointer" 
                  alt="Logo" onClick={() => router.push('/')} />
                </div>
                <div className='ml-8'>
                  <div className='flex flex-row items-center gap-7'>
                    <NavItem label="Home" route="/" activeRoute={'/'} />
                    <NavItem label="Movies" route="/" activeRoute={''} />
                    <NavItem label="Events" route="/" activeRoute={''} />
                    <NavItem label="My Tickets" route="/mytickets" activeRoute={'/mytickets'} />
                    <NavItem label="My List" route="/list" activeRoute={'/list'} />
                    {/* <NavItem label="Partner With Us" route="/" activeRoute={''} /> */}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end'>
                  <div>
                    <div className='flex flex-row items-center'>
                      <div className='mr-6 relative'>
                        <SearchBox/>
                      </div>
                      <Notification/>
                      <ProfileDropDown/>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default NavigationHome;