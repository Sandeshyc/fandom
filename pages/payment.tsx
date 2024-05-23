import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import useIsMobile from '@/hooks/useIsMobile';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  DataUsage
} from '@mui/icons-material';
const MyProfile = () => {
  const iframeRef = useRef( null as any );
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isLoginUser, isLoadingUserCheck } = useCheckAuthentication();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [itemCode, setItemCode] = useState('');
  const [itemUrl, setItemUrl] = useState('');
  const [heightx, setHeightx] = useState("0px");
  const { productId, userid, transactionId, env } = router.query;
  const iframeParams = `${process.env.NEXT_PUBLIC_PAYMENT_URI}?userid=${userid}&productId=${productId}&transactionId=${transactionId}&env=${env}`;


  const handleIframeLoad = () => {
    setIframeLoaded(true);
    const iframeRefComp = iframeRef.current;
    // iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
    // const temp = iframe.contentWindow.document.body.scrollHeight + "px";
    // setHeight(temp);
  };

  const handleBackBtn = () => {
    if(itemUrl){
      router.replace(itemUrl);
    }else if(itemCode){
      router.replace(`/details/${itemCode}`);
    }else{
      router.replace('/');
    }
  };

  useEffect(() => {
    if(iframeLoaded){
      const iframeRefComp = iframeRef.current;
      // console.log('window.self', window.self);
      // console.log('window.top', window.top);
      // const tempHeight = iframeRefComp.contentWindow.document.body.scrollHeight + "px";
      // setHeightx(tempHeight);
      // console.log('iframeRefComp', iframeRefComp?.querySelector('body'));
    }
  }, [iframeLoaded]);

  useEffect(() => {    
    const tempItemCode = window.localStorage.getItem('itemCode');
    setItemCode(tempItemCode ? tempItemCode : '');
    const tempItemUrl = window.localStorage.getItem('itemUrl');
    setItemUrl(tempItemUrl ? tempItemUrl : '');
  },[]);

  return (<>
      {isMobile?<Header/>:<Navigation/>}
      <div className="pt-28 min-h-full bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]"
      style={{
        // backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <div className="flex flex-row items-center gap-3 lg:gap-8 mb-6">
              <ArrowLeftIcon onClick={handleBackBtn} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
              <p className="text-white/80 text-1xl md:text-3xl font-bold cursor-pointer" onClick={handleBackBtn}>
                <span className="font-light">Back</span>
              </p>
              <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold">
                Payment
            </p>
            </div> 
            <div className="lg:px-6 pb-6 flex flex-wrap">
              {(!iframeLoaded)&&(<div className='text-white w-full h-screen flex justify-center p-8'>
                <div className='flex flex-col items-center'>
                  <DataUsage className='animate-spin w-24 h-24' 
                    sx={{
                      fontSize: 100,
                    }}
                  />
                  <h1 className='text-4xl text-center mt-4'>Loading...</h1>
                </div>
              </div>)}
              {(isLoginUser)&&(
                <iframe 
                  ref={iframeRef}
                  className='w-full h-[100vh]'
                  // height={height}
                  src={iframeParams}  
                  onLoad={handleIframeLoad}    
                  // scrolling="no" 
                  >                
                </iframe>
              )}
            </div>
          </div>
        </div>
      </div>
      {isMobile?<BottomNavigation/>:<Footer/>}
  </>)
}

export default MyProfile;