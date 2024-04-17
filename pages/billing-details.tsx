import React, { useEffect, useState } from 'react';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import PaymentHistory from '@/modules/components/PaymentHistory';
import useIsMobile from '@/hooks/useIsMobile';

const bgImage = 'url("/images/new-bg.png")';

const BillingDetails = () => {
    const isMobile = useIsMobile();
    return (
        <>
        {isMobile?<Header/>:<Navigation/>}
        <div
        className='min-h-[85vh] min-w-full text-white bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]'
        style={{
            // backgroundImage: bgImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            backgroundPosition: 'right '+ 30 + '%',
        }}>
            <div className='pt-24 lg:pt-40'>
                <div className="container mx-auto max-w-[1400px] py-4 bg-white/90 rounded-md">
                    <PaymentHistory />
                </div>
            </div>
        </div>
        {isMobile?<BottomNavigation/>:<Footer/>}
        </>
    );
}
export default BillingDetails;