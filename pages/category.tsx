import React, {useEffect, useState} from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NavigationHome from '@/modules/elements/NavigationHome';
import Footer from '@/components/Footer';
import {DetailsHeroBanner} from "@/modules/components/DetailsHeroImage";
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import ScrollSpyComponent from '@/modules/elements/ScrollSpyComponent';

import { MovieInterface } from '@/types';
import RemoveListBtn from '@/components/RemoveListButton';
import Buttons from '@/components/identites/Buttons';
import { VolunteerActivismOutlined } from '@mui/icons-material';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';

export async function getServerSideProps(context: NextPageContext) {
  const region = context.query.region || ""
  const session = await getSession(context);
  const product = context.query.product || "web" 
  return {
    props: {region}
  }
}

const bgImage = 'url("/images/new-bg.png")';

const Movies = (props:any) => {
  const router = useRouter();
  const { region, product } =  props;
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const [season, setSeason] = React.useState('Season 14');

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');    
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
    setIsReady(true);
  }, []);

  return (<>
  <NavigationHome />
    <div
    className='min-h-[85vh] min-w-full text-white'
    style={{
      backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
      

      <div className="w-full overflow-hidden py-24 lg:pt-32">
        <div className="max-w-[1600px] mx-auto pb-[15px]">
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
    <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4'>
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white rounded-md sm:mr-4 justify-between h-full w-full">
      <div className="w-[40%] relative bg-gray-600 rounded-md">
        <img src={'https://qa-static2.abs-cbn.com/c/AllMyLife_Thumbnail.png' } alt={' '} draggable={false} className="
          cursor-pointer
          object-contain
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
      <div className="w-[58%] py-1">
        <p
          className="text-white text-base md:text-lg xl:text-xl mb-1 cursor-pointer"
        >{'Movie Title'}</p>    
        {(1)?<p className="text-xs sm:text-sm md:text-base xl:text-md mb-0 md:mb-1 flex items-center"><VolunteerActivismOutlined className="w-[16px] h-[16px] text-white mr-1 pl-[3px]"/>ABS-CBN</p>:null}
        {0? (
          <Buttons  
            onClick={()=>{}}
            type='white'
            className="mt-2 min-w-[90px] text-sm py-1"           
            styles={{width: 'fit-content', height: '34px'}} >Play Now</Buttons>
        ) : (
          <Buttons 
            onClick={()=>{}}
            className="mt-2 min-w-[90px] text-sm py-1"
            styles={{width: 'fit-content', height: '34px'}}>Rent</Buttons>
        )}
      </div>
    </div></div>
  )
}
