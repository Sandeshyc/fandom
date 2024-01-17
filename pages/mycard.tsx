import React, { useEffect, useState } from 'react';
import {
  DataUsage
} from '@mui/icons-material';
import Footer from '@/components/Footer';
import NavigationHome from '@/modules/elements/NavigationHome';

const bgImage = 'url("/images/new-bg.png")';

const MyProfile = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [userid, setUserid] = React.useState('');
  const iframeParams = `https://dev-payments.abs-cbn.com/card-management?userid=${userid}`;

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj?.sub) {
        setUserid(userInfoObj?.sub);
      }
    }
  },[])

  return (<>
      <NavigationHome />
      <div className="pt-20 lg:pt-28 min-h-full"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto', 
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <div className="container mx-auto max-w-[1380px]">
              <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-6 lg:pl-6">My Card</p>
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