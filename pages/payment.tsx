import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';
import { set } from 'lodash';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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

  const handleBackBtn = () => {
    router.back();
  };

  return (<>
      <Navbar />
      <div className="pt-28 min-h-full"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <div className="flex flex-row items-center gap-8 mb-6">
              <ArrowLeftIcon onClick={
                () => router.back()
              } className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
              <p className="text-white/80 text-1xl md:text-3xl font-bold cursor-pointer" onClick={handleBackBtn}>
                <span className="font-light">Back</span>
              </p>
              <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold">
                Payment 
            </p>
            </div> 
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