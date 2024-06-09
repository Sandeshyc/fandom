import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import Text from "@/modules/Identities/Text";
import Preloader from "@/modules/skeletons/Preloader";
import {
    createEntitlement
} from "@/services/api";

const PaymentResponse = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [massage, setMassage] = useState("");
  const [isReady, setIsReady] = useState(false);
  const { productId, userid, transactionId, paymentStatus, paymentId } =
    router.query;
  useEffect(() => {
    const itemCode = window.localStorage.getItem("itemCode");
    const itemUrl = window.localStorage.getItem("itemUrl");
    if (paymentStatus) {
      if (paymentStatus === "success") {
        const _createEntitlement = async () => {
            const data = {
                userID: userid,
                receipt: paymentId,
                sourcePlatform: "web",
                transactionId: transactionId,
                statusFromAPICall: "Charged"
            };
            const response = await createEntitlement( userid as string, data );
            console.log('Response:', response);
            if(response.status === 'success') {
                setMassage("Entitlement created successfully. Please wait...");
            }else {
                setMassage("Got an error while creating entitlement.");               
            }
            if(itemUrl) {
                router.replace(itemUrl);
            }else {
                router.replace(`/`);
            }
        };
        _createEntitlement();
      } else {
        if (itemUrl) {
          router.replace(itemUrl);
        } else {
          router.replace(`/`);
        }
      }
    }else{
        router.replace(`/`);
    }
  }, [paymentStatus]);

  useEffect(() => {
    // is not parent window
    if (window.self !== window.top) {
      window.parent.location.replace(window.location.href);
    }
    setIsReady(true);
    setMassage("Checking entitlement...")
  }, []);

  return (
    <>
      {isReady? (
        <div className="h-screen w-screen relative text-white/80">
            <Preloader/>
            <div className={`absolute ${(isMobile)?'bottom-[60px]':'bottom-0'} left-0 px-4 pb-4 text-center w-full`}>
                <Text size="base">
                    {massage}
                </Text>
            </div>
        </div>
      ):(
        <Preloader/>
      )}
    </>
  );
};

export default PaymentResponse;