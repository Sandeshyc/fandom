import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import usePlans from "@/hooks/usePlans";
import Navigation from "@/modules/components/Navigation";
import Footer from "@/components/Footer";
import useClientLocaion from "@/hooks/useClientLocaion";
import PlanItem from "@/modules/elements/Purchase/PlanItem";
import { stableKeys } from "@/utils/stableKeys";
import useIsMobile from "@/hooks/useIsMobile";
import useCheckEntitlement from "@/hooks/useCheckEntitlement";
import { getAllowedItems } from "@/utils/getData";
const contentId = "6641a3eba9e8e0ae2a7786b8";
const Discover = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  // const {section} = router.query;
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [planLists, setPlanLists] = useState([] as any[]);
  const [allowedItemLists, setAllowedItemLists] = useState([] as any[]);
  const { data: clientLocation, error: locationError }: any =
    useClientLocaion();
  const region = clientLocation?.country?.isoCode;
  const { data, isLoading, error } = usePlans(region, contentId);
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
  console.log("allowedItemLists", allowedItemLists);
  useEffect(() => {
    if (isReady && !entitlementLoading && !entitlementError) {
      if (entitlementData) {
        const allowedIds = getAllowedItems(entitlementData);
        setAllowedItemLists(allowedIds);
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
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-between bg-[#FAFAFA]">
      <Navigation />
      <div
        className="w-full h-full text-[#93767A]"
        style={{
          paddingTop: isMobile ? "90px" : "110px",
          paddingBottom: "20px",
        }}
      >
        {Array.isArray(planLists) && planLists.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {planLists.map((item: any, index: number) => {
              return (
                <PlanItem
                  key={stableKeys[index]}
                  item={item}
                  movieId={contentId}
                  rentText={"Join Annual Membership"}
                  allowedIems={allowedItemLists}
                  isBlock={true}
                />
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Discover;
