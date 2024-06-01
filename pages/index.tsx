import React, { useState, useEffect } from 'react';
import usePlans from '@/hooks/usePlans';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import useClientLocaion from "@/hooks/useClientLocaion";
import PlanItem from '@/modules/elements/Purchase/PlanItem';
import { stableKeys } from '@/utils/stableKeys';
import useIsMobile from '@/hooks/useIsMobile';
const contentId = '6641a3eba9e8e0ae2a7786b8';
const Discover = () => {
    const isMobile = useIsMobile();
    const [userId, setUserId] = useState("");
    const [planLists, setPlanLists] = useState([] as any[]);
    const {data: clientLocation, error: locationError}:any = useClientLocaion();
    const region = clientLocation?.country?.isoCode;
    const {data, isLoading, error} = usePlans(
        region,
        "web",
        userId,
        contentId
    );
    // console.log('data', data, 'isLoading', isLoading, 'error', error, 'region', region, 'userId', userId, 'contentId', contentId);
    useEffect(() => {
        if (data) {
            // has object allowedPlansDetails
            if (data?.allowedPlansDetails) {
                let tempObject = [];
                if (Array.isArray(data?.allowedPlansDetails) && data?.allowedPlansDetails?.length > 0) {
                    tempObject = data?.allowedPlansDetails.filter((item: any) => item && item.id);
                }
                setPlanLists(tempObject);
            }
        }
    }, [data]);
    return (
        <>
        <Navigation/>
        <div className='w-full h-full min-h-screen bg-gradient-to-t to-[#EFF3F6] to-[75%] from-[#FFE5F1] text-[#93767A]'
        style={{
            paddingTop: isMobile ? "90px" : "140px",
            paddingBottom: isMobile ? "70px" : "90px",
        }}>
            {(Array.isArray(planLists) && planLists.length > 0)&&(
                <div className='flex flex-wrap justify-center gap-4'>
                    {planLists.map((item: any, index: number) => {
                        return (
                            <PlanItem
                                key={stableKeys[index]}
                                item={item}
                                movieId={contentId}
                                rentText={'Join Annual Membership'}
                                allowedIems={item}
                            />
                        );
                    }
                    )}
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
}
export default Discover;