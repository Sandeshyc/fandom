import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import useIsMobile from '@/hooks/useIsMobile';
import checkAuthentication from '@/utils/checkAuth';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  DataUsage
} from '@mui/icons-material';
const bgImage = 'url("/images/new-bg.png")';
const MyProfile = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { productId, userid, transactionId, env } = router.query;
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [itemCode, setItemCode] = useState('');
  const iframeParams = `${process.env.NEXT_PUBLIC_PAYMENT_URI}?userid=${userid}&productId=${productId}&transactionId=${transactionId}&env=${env}`;

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleBackBtn = () => {
    // router.back();
    if(itemCode){
      router.replace(`/details/${itemCode}`);
    }else{
      router.replace('/');
    }
  };
  useEffect(() => {
    if(iframeLoaded){
      const _checkAuthentication = async () => {
        const isAuthenticated = await checkAuthentication();
        console.log('isAuthenticated:', isAuthenticated);
        if(!isAuthenticated){
          handleBackBtn();
        }
      }
      _checkAuthentication();
    }
  },[iframeLoaded]);

  useEffect(() => {    
    const tempItemCode = window.localStorage.getItem('itemCode');
    setItemCode(tempItemCode ? tempItemCode : '');
  },[]);

  return (<>
      {isMobile?<Header/>:<Navigation/>}
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
              <ArrowLeftIcon onClick={handleBackBtn} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
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
                  <DataUsage className='animate-spin w-24 h-24' 
                    sx={{
                      fontSize: 100,
                    }}
                  />
                  <h1 className='text-4xl text-center mt-4'>Loading...</h1>
                </div>
              </div>):null}
              <iframe 
                className='w-full h-[100vh]'
                src={iframeParams}  
                onLoad={handleIframeLoad}     
                >                
              </iframe>
            </div>
          </div>
        </div>
      </div>
      {isMobile?<BottomNavigation/>:<Footer/>}
  </>)
}

export default MyProfile;