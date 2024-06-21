import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getEntitlementList } from "@/services/api";
import { getAllowedItems } from "@/utils/getData";
import Preloader from "@/modules/skeletons/Preloader";
import ExclusiveNavigation from "@/modules/components/ExclusiveNavigation";
import ExclusiveFooter from "@/components/ExclusiveFooter";
const contentId = "6641a3eba9e8e0ae2a7786b8";
const currentPageUrl = "/playbill";
const Playbill = () => {
  const router = useRouter();
  const { section } = router.query;
  const [itemUrl, setItemUrl] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [pageDirectory, setPageDirectory] = useState("");
  useEffect(() => {
    if (pageDirectory) {
      const userInfo = window.localStorage.getItem("userInfo");
      if (userInfo) {
        const userInfoObj = JSON.parse(userInfo);
        if (userInfoObj.sub) {
          setUserId(userInfoObj.sub);
          const _getEntitlementList = async () => {
            const resEntitlement = await getEntitlementList(userInfoObj.sub);
            // console.log("Response::::", resEntitlement);
            if (resEntitlement.status === "success") {
              const allowedIds = getAllowedItems(resEntitlement?.data);
              if (Array.isArray(allowedIds) && allowedIds.length > 0) {
                allowedIds.map((allowItem: any) => {
                  if (
                    allowItem?.content?.contentId === contentId &&
                    allowItem?.content?.pageDirectory === pageDirectory
                  ) {
                    setIsReady(true);
                  } else {
                    // console.log("Entitlement Not found!");
                    // router.push(`/` + section);
                    window.location.replace(`/` + section);
                  }
                });
              } else {
                // console.log("Entitlement Not found!");
                // router.push(`/` + section);
                window.location.replace(`/` + section);
              }
            } else {
              //   console.log("Entitlement API found");
              // router.push(`/` + section);
              window.location.replace(`/` + section);
            }
          };
          _getEntitlementList();
        } else {
          //   console.log("User not found::", userInfoObj);
          // router.push(`/` + section);
          window.localStorage.setItem("redirectUrl", itemUrl);
          window.location.replace(`/login`);
        }
      } else {
        // console.log("User not found:", userInfo);
        // router.push(`/` + section);
        window.localStorage.setItem("redirectUrl", itemUrl);
        window.location.replace(`/login`);
      }
    }
  }, [pageDirectory]);
  useEffect(() => {
    if (section) {
      setPageDirectory(section + "/members");
      setItemUrl(`/` + section + `/members/` + currentPageUrl);
    }
  }, [section]);
  return (
    <>
      {isReady ? (
        <div className="relative w-full h-full min-h-screen bg-black/70 backdrop-blur-sm flex flex-col items-center justify-between">
          <ExclusiveNavigation />

          <div className="w-full lg:min-h-screen flex justify-center items-center  ">
            <iframe
              src="https://playerv2.kapamilya.com/api/akamai/getplayer?media=https://ktx.akamaized.net/0896ad4e-3a9a-4c0c-8e7c-05df21a8a291/bini_playbill.ism/manifest(format=mpd-time-csf)&wv=bc8f05ad-5347-4fd5-8981-a0e1afc92c02&type=symmetric&ctype=groups&cvalue=5714ed21-115a-47f0-a868-cb61ef527f44&fp=60d941aa-ee40-4d37-8b43-60c0a2180383"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full lg:w-[1076px] aspect-video "
              allowFullScreen
            ></iframe>
          </div>

          <ExclusiveFooter />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};
export default Playbill;
