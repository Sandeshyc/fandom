import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';
import { set } from 'lodash';

const MyProfile = () => {
  const router = useRouter();
  const { productId, userid, transactionId, env } = router.query;
  // console.log('productId:', productId);
  // console.log('userid:', userid);
  // console.log('transactionId:', transactionId);
  const iframeParams = `${process.env.NEXT_PUBLIC_PAYMENT_URI}?userid=${userid}&productId=${productId}&transactionId=${transactionId}&env=${env}`;
  return (<>
      <SideBar />
      <div className="py-16 bg-gradient-to-r from-[#210424] from-10% via-[#4B0F5A] via-30% to-[#271055] to-85% min-h-full">
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
  </>)
}

export default MyProfile;