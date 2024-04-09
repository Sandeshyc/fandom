import React, { useEffect } from 'react';
import DeviceDetails from '@/modules/components/DeviceDetails';
import useIsMobile from '@/hooks/useIsMobile';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';

const bgImage = 'url("/images/new-bg.png")';

const MyProfile = () => {
  const isMobile = useIsMobile();
  return (<>
      {(1)?<>
      {isMobile?<Header/>:<Navigation/>}
      <div className="py-16 lg:pt-28 min-h-[80vh]"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        
        <div className="container mx-auto max-w-[996px]">
          <div className='mb-2'>
            <DeviceDetails/>
          </div>
        </div>
      </div>
    {isMobile?<BottomNavigation/>:<Footer/>}
  </>:null}
  </>)
}

export default MyProfile;