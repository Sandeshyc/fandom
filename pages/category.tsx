import React, {useEffect, useState} from 'react';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import Buttons from '@/modules/Identities/Buttons';
import { VolunteerActivismOutlined } from '@mui/icons-material';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';
import useIsMobile from '@/hooks/useIsMobile';

const bgImage = 'url("/images/new-bg.png")';

const Movies = (props:any) => {
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }
    }
    setIsReady(true);
  }, []);

  return (<>
  {isMobile?<Header/>:<Navigation/>}
    <div
    className='min-h-[85vh] min-w-full text-white'
    style={{
      backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
      

      <div className="w-full overflow-hidden py-24 lg:pt-32">
        <div className="max-w-[2400px] mx-auto pb-[15px]">
          <div className="overflow-hidden movieBoxsInside">

          <div className={` z-10 relative mb-[3vw]`}>
            <div className='px-2'>
              <p className="text-white text-xl lg:text-2xl	font-medium mb-1 lg:mb-4 mr-2">Page Title</p>
            </div>
            <div className={`flex flex-wrap`}>
                {
                  [1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item, index) => (
                    <SampleBox key={index} />
                  ))
                }
            </div>
      </div>

          </div>
        </div>
      </div>


    </div>
    <Footer />
    </>) 
}

export default Movies;


const SampleBox = () => {
  return (
    <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 px-2 mb-4'>
      <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white rounded-md sm:mr-4 justify-between h-full w-full">
        <div className="w-[100%] relative bg-gray-600 rounded-md">
          <img src={'https://qa-static2.abs-cbn.com/c/AllMyLife_Thumbnail.png' } alt={' '} draggable={false} className="
            cursor-pointer
            object-cover
            rounded-md
            w-full
            h-full
            flex
            justify-center
            items-center
            text-white/40" />
          {(0)?<PurchaseBadge/>
          :
          <BadgeDesktop text="Sale" theme="orange"/>
          }
        </div>      
      </div>
    </div>
  )
}
