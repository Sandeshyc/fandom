import React, { useEffect, useState } from 'react';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import ReelHeading from '@/modules/elements/ReelHeading';
import useIsMobile from '@/hooks/useIsMobile';

import RollImage from '@/modules/Identities/RollImage';
const bgImage = 'url("/images/new-bg.png")';
const Offers = () => {
    const isMobile = useIsMobile();
    return (
        <div className="pt-16 lg:pt-32 text-white"
        style={{
            backgroundImage: bgImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            backgroundPosition: 'right '+ 30 + '%',
        }}>
        {isMobile?<Header/>:<Navigation/>}
        <div className={`px-4 mb-[3vw] min-h-[75vh] container max-w-[2400px] mx-auto`}>
            <ReelHeading title="Deals and Offers" />
            <div className='flex flex-wrap pb-4 mx-[-15px]'>
                {Array.from({length: 15}, (_, i) => {
                    return (
                    <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-[15px]">
                        <SampleCard/>
                    </div>
                    )
                })}
            </div>
        </div>
        {isMobile?<BottomNavigation/>:<Footer/>}
        </div>
    );
}
export default Offers;

export const SampleCard = () => {
    return (
    <div 
    className={`group bg-zinc-900 rounded-md col-span relative movieCard cursor-pointer aspect-[16/9]`} >
      <div className='img relative h-full w-full'>        
        <div className='absolute z-30 bottom-0 right-0 w-full '>
        </div>  
        <RollImage thumbURl={`https://qa-static2.abs-cbn.com/c/BFFBestFriendsForEver_Thumbnail.png`} title={'Test Name'} />
      </div>
    </div>
    );
}