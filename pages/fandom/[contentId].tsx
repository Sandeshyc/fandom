import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import useIsMobile from '@/hooks/useIsMobile';
import useCheckEntitlement from '@/hooks/useCheckEntitlement';
import { getAllowedItemsId } from '@/utils/getData';
const exclusive = '/images/exclusive.png';
const Fandom = () => {
    const isMobile = useIsMobile();
    const [userId, setUserId] = useState("");
    const router = useRouter();
    const { contentId } = router.query;
    const {data: entitlementData, error: entitlementError, isLoading: entitlementLoading} = useCheckEntitlement(userId);
    console.log('entitlementData', entitlementData, entitlementError, entitlementLoading);
    useEffect(() => {
        if(!entitlementLoading && !entitlementError && entitlementData){
            // console.log('entitlementData', entitlementData);
            const allowedIds = getAllowedItemsId(entitlementData);
            // is in array
            if(!allowedIds.includes(contentId)){
                // redirect to content page
                window.location.replace(`/bini`);
                // console.log('Not allowed');
            }
        }
        // console.log('entitlementData', entitlementData, entitlementError, entitlementLoading);
    }, [entitlementData, entitlementError, entitlementLoading]);
    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
            const userInfoObj = JSON.parse(userInfo);
            if(userInfoObj.sub) {
                setUserId(userInfoObj.sub);
            }
        }
    }, []);
    return (
        <>
        <Navigation/>     
        <div className='w-full h-full min-h-screen bg-gradient-to-t to-[#EFF3F6] to-[75%] from-[#FFE5F1] text-[#93767A]'
        style={{
            paddingTop: isMobile ? "90px" : "140px",
            paddingBottom: isMobile ? "70px" : "90px",
        }}>
            <div className='my-8'>
                <div className='container mx-auto max-w-[1024px] px-4'>
                    <div className='w-full aspect-video'>
                        <iframe src="https://www.youtube.com/embed/QNV2DmBxChQ?si=4zy0Uv2mY7L30UMz" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='w-full h-full'></iframe>
                    </div>
                </div>
            </div>
            <div className='my-8'>
                <div className="container mx-auto">
                    <div className="text-center mx-auto max-w-[600px]">
                        <h1 className="text-3xl font-bold">Exclusive Merch</h1>
                        <p className="text-lg">Lorem ipsum dolor sit amet consectetur. Erat amet mauris lobortis et orci laoreet. Accumsan egestas elit id lacus sagittis mattis.</p>
                    </div>
                    <div className='my-8 text-center'>
                        <img src={exclusive} alt="Exclusive" className='max-w-full w-auto mx-auto'/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}
export default Fandom;