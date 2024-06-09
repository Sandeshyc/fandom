import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import usePlans from "@/hooks/usePlans";
import Navigation from "@/modules/components/Navigation";
import Header from "@/modules/elements/Header";
import Footer from "@/components/Footer";
import useClientLocaion from "@/hooks/useClientLocaion";
import PlanItem from "@/modules/elements/Purchase/PlanItem";
import { stableKeys } from "@/utils/stableKeys";
import useIsMobile from "@/hooks/useIsMobile";
import useCheckEntitlement from "@/hooks/useCheckEntitlement";
import { getAllowedItemsId } from "@/utils/getData";
import { getAllowedItems } from "@/utils/getData";
import { getAuditEntitlement } from "@/services/api";
const contentId = "6641a3eba9e8e0ae2a7786b8";
const Discover = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  // const {section} = router.query;
  const [auditLoading, setAuditLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [planLists, setPlanLists] = useState([] as any[]);
  const [allowedItemLists, setAllowedItemLists] = useState([] as any[]);
  const [isPending, setIsPending] = useState(false);
  const [pendingTransitionId, setPendingTransitionId] = useState("");
  const { data: clientLocation, error: locationError }: any = useClientLocaion();
  let region = clientLocation?.country?.isoCode;
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
  console.log(
    "Saim:::::EntitlementData",
    entitlementData,
    entitlementLoading,
    entitlementError
  );
  console.log("allowedItemLists", allowedItemLists);
  useEffect(() => {
    if (isReady && !entitlementLoading && !entitlementError) {
      if (entitlementData) {
        console.log("Yes Enttlement", entitlementData);
        const allowedIds = getAllowedItems(entitlementData);
        setAllowedItemLists(allowedIds);
        const _getAuditEntitlement = async () => {
          setAuditLoading(false);
          try {
            let auditEntitlement = await getAuditEntitlement(userId);
            console.log("auditEntitlement::::", auditEntitlement);
            if(auditEntitlement?.status === 'success'){
              auditEntitlement = auditEntitlement.data;
              if (
                Array.isArray(auditEntitlement) &&
                auditEntitlement.length > 0
              ) {
                const myPendingEntitlement = auditEntitlement.filter(
                  (item: any) => {
                    if (
                      item?.status === "pending" &&
                      item?.contentId === contentId
                    ) {
                      return item;
                    }
                  }
                );
                if (myPendingEntitlement.length > 0) {
                  setPendingTransitionId(myPendingEntitlement[0].transactionId);
                  setIsPending(true);
                }
              }
            }
          } catch (error) {
            console.log("error", error);
          }
          setAuditLoading(true);
        }
        _getAuditEntitlement();
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
        className="w-full h-full my-auto text-[#93767A]"
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
                  rentText={"Join Annual Exclusive Membership"}
                  allowedIems={allowedItemLists}
                  isPending={isPending}
                  transactionId={pendingTransitionId}
                  auditLoading={auditLoading}
                  entitlementLoading={!entitlementLoading}
                  planLoader={!isLoading}
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
