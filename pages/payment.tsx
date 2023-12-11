import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';
import { set } from 'lodash';
import {
  DataUsage
} from '@mui/icons-material';
const bgImage = 'url("/images/new-bg.png")';
const MyProfile = () => {
  const router = useRouter();
  const { productId, userid, transactionId, env } = router.query;
  const [iframeLoaded, setIframeLoaded] = useState(false);
  // console.log('productId:', productId);
  // console.log('userid:', userid);
  // console.log('transactionId:', transactionId);
  const iframeParams = `${process.env.NEXT_PUBLIC_PAYMENT_URI}?userid=${userid}&productId=${productId}&transactionId=${transactionId}&env=${env}`;

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (<>
      <Navbar />
      <div className="py-16 min-h-full"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: ' auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}
      >
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-4 lg:pl-6">
                Payment 
            </p>
            <div className="lg:px-6 pb-6 flex flex-wrap">
              {(!iframeLoaded)?(<div className='text-white w-full h-screen flex justify-center p-8'>
                <div className='flex flex-col items-center'>
                  <DataUsage className='animate-spin w-24 h-24'/>
                  <h1 className='text-2xl text-center mt-4'>Loading...</h1>
                </div>
              </div>):null}
              <iframe 
                className='w-full h-screen'
                src={iframeParams}  
                onLoad={handleIframeLoad}     
                >                
              </iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
  </>)
}

export default MyProfile;