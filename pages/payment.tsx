import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';
import { set } from 'lodash';
const bgImage = 'url("/images/new-bg.png")';
const MyProfile = () => {
  const router = useRouter();
  const { productId, userid, transactionId, env } = router.query;
  // console.log('productId:', productId);
  // console.log('userid:', userid);
  // console.log('transactionId:', transactionId);
  const iframeParams = `${process.env.NEXT_PUBLIC_PAYMENT_URI}?userid=${userid}&productId=${productId}&transactionId=${transactionId}&env=${env}`;
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
              <iframe 
                className='w-full h-screen'
                src={iframeParams}       
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