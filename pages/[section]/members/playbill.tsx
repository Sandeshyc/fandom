import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getEntitlementList } from "@/services/api";
import { getAllowedItems } from "@/utils/getData";
import Preloader from "@/modules/skeletons/Preloader";
const contentId = "6641a3eba9e8e0ae2a7786b8";
const currentPageUrl = "/playbill";
const Playbill = () => {
    const router = useRouter();
    const { section } = router.query;
    const [itemUrl, setItemUrl] = useState('');
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
          setItemUrl(`/` + section + `/members/`+currentPageUrl);
        }
    }, [section]);
    return (
        <>
        {isReady ? (
            <div>
                <h1>PayBill {section}</h1>
            </div>
        ) : (
            <Preloader />
          )}
        </>
    );
};
export default Playbill;