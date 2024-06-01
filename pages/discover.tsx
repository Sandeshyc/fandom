import React, { useState, useEffect, use } from "react";
import usePlans from "@/hooks/usePlans";
import { useRouter } from "next/router";
import Navigation from "@/modules/components/Navigation";
import Header from "@/modules/elements/Header";
import Footer from "@/components/Footer";
import useClientLocaion from "@/hooks/useClientLocaion";
import PlanItem from "@/modules/elements/Purchase/PlanItem";
import { stableKeys } from "@/utils/stableKeys";
import useIsMobile from "@/hooks/useIsMobile";
import { getCurrentUser } from "@/utils/cognitoAuth";
import useCheckEntitlement from "@/hooks/useCheckEntitlement";
import { getAllowedItemsId } from "@/utils/getData";
import Preloader from "@/modules/skeletons/Preloader";
const contentId = "6641a3eba9e8e0ae2a7786b8";
const Discover = () => {
    const isMobile = useIsMobile();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [userId, setUserId] = useState("");
    const [planLists, setPlanLists] = useState([] as any[]);
    const {data: clientLocation, error: locationError}:any = useClientLocaion();
    const region = clientLocation?.country?.isoCode;
    const {data, isLoading, error} = usePlans(
        region,
        contentId
    );
    // console.log('data', data, 'isLoading', isLoading, 'error', error, 'region', region, 'userId', userId, 'contentId', contentId);

  const {
    data: entitlementData,
    error: entitlementError,
    isLoading: entitlementLoading,
  } = useCheckEntitlement(userId);
  console.log(
    "entitlementData",
    entitlementData,
    entitlementError,
    entitlementLoading
  );
  useEffect(() => {
    if (isReady && !entitlementLoading && !entitlementError) {
      if (entitlementData) {
        const allowedIds = getAllowedItemsId(entitlementData);
        if (allowedIds.includes(contentId)) {
          // redirect to content page
          router.push(`/fandom`);
        }
      }
    }
  }, [isReady, entitlementData, entitlementError, entitlementLoading]);
  useEffect(() => {
    if (data) {
      // has object allowedPlansDetails
      if (data?.allowedPlansDetails) {
        let tempObject = [];
        if (
          Array.isArray(data?.allowedPlansDetails) &&
          data?.allowedPlansDetails?.length > 0
        ) {
          tempObject = data?.allowedPlansDetails.filter(
            (item: any) => item && item.id
          );
        }
        setPlanLists(tempObject);
      }
    }
  }, [data]);
  useEffect(() => {
    const _test = async () => {
      try {
        const user = await getCurrentUser();
        console.log("current user::", user);
      } catch (error) {
        console.log("currrnt data: error::", error);
      }
    };
    _test();
  }, []);

  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
    setIsReady(true);
  }, []);

  return (
    <>
      {isReady && !entitlementLoading && !isLoading ? (
        <>
          <Navigation />
          <div
            className="w-full h-full min-h-screen bg-gradient-to-t to-[#EFF3F6] to-[75%] from-[#FFE5F1] text-[#93767A]"
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
        ):(
            <Preloader/>
        )}
        </>
  );
};
export default Discover;
