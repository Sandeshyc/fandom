import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavItem from '@/components/navbar/NavItem';
import ProfileDropDown from '@/components/navbar/ProfileDropDown';
import SearchBox from '@/components/navbar/SearchBox';
import useIsMobile from '@/hooks/useIsMobile';
// import {useUserStore} from '@/stores/UserStore';
import NavigationHomeMobile from '@/modules/elements/NavigationHomeMobile';
import Header from '@/modules/elements/Header';
import Notification from '@/modules/elements/Notification';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import { stableKeys } from '@/utils/stableKeys';
import navItemLists from '@/services/json/navItemLists.json';
const logoSrc = '/images/logoofbini.png';

const NavigationHome = () => {
  const router = useRouter();  
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  const {isLoginUser, isLoadingUserCheck} = useCheckAuthentication();
  // console.log('isLoginUser', isLoginUser);
  // get scroll position in px
  const getScrollPosition = () => {
    return window?.pageYOffset;
  }

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = getScrollPosition();
      setScrollPosition(scrollPosition);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (<>
    {(isMobile)?(<Header/>):
    <div className={`mainHeader mainNavbar w-full py-4 border-b border-[#E79FAD]/70 fixed z-50 top-0 left-0 bg-white`}>
        <div className='px-4 max-w-[2400px] mx-auto'>
            <div className='flex items-center justify-between flex-wrap'>
              <div className='flex items-center justify-between'>
                <div className='mr-4 xl:mr-8'>
                  <img 
                  src={logoSrc} 
                  className="h-[60px] cursor-pointer" 
                  alt="Bini" onClick={() => router.push('/discover')} />
                </div>
              </div>
              <div className='flex items-center justify-end'>
                  <div className='pl-4'>
                    <div className='flex flex-row items-center'>
                      <ProfileDropDown/>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>}
    </>
  )
}

export default NavigationHome;