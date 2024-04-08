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
const logoSrc = '/images/logonew.png';

const NavigationHome = () => {
  const router = useRouter();  
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  const isLoginUser = useCheckAuthentication();
  console.log('isLoginUser', isLoginUser);
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
    <div className={`mainHeader mainNavbar w-full py-4 border-b border-white/40 fixed z-50 top-0 left-0 bg-gradient-to-b ${(scrollPosition>60)?'from-black from-100%':'from-black/40 from-70%'} to-transparent to-100%`}>
        <div className='px-4'>
            <div className='flex items-center justify-between flex-wrap'>
              <div className='flex items-center justify-between'>
                <div className='mr-4 xl:mr-8'>
                  <img 
                  src={logoSrc} 
                  className="h-[60px] cursor-pointer" 
                  alt="iWantTFC Ticket" onClick={() => router.push('/')} />
                </div>
                <div className='ml-4 xl:ml-8'>
                  <div className='flex flex-row items-center gap-4 xl:gap-8'>
                    {/* {isLoginUser.toString()} */}
                    {(Array.isArray(navItemLists)) && navItemLists.map((item, index) => (
                        (!item?.auth || (item?.auth && isLoginUser))?
                        <NavItem key={stableKeys[index]} label={item?.label} route={item?.route} activeRoute={item?.activeRoute} />
                        :null
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end'>
                  <div className='pl-4'>
                    <div className='flex flex-row items-center'>
                      <div className='mr-3 xl:mr-6 relative'>
                        <SearchBox/>
                      </div>
                      {(isLoginUser)?<Notification />:null}                      
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