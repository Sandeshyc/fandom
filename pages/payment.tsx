import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navigation from "@/modules/components/Navigation";
import Header from "@/modules/elements/Header";
import useIsMobile from "@/hooks/useIsMobile";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Preloader from "@/modules/skeletons/Preloader";
import { DataUsage } from "@mui/icons-material";
import { getSession } from "@/utils/cognitoAuth";
import Footer from "@/components/Footer";
import FlowerBlackLoader from "@/modules/skeletons/FlowerBlackLoader";

const MyProfile = () => {
  const iframeRef = useRef(null as any);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);
  const { isLoginUser, isLoadingUserCheck } = useCheckAuthentication();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [heightx, setHeightx] = useState("0px");
  const { productId, userid, transactionId, env } = router.query;
  // const iframeParams = `${process.env.NEXT_PUBLIC_PAYMENT_URI}?userid=${userid}&productId=${productId}&transactionId=${transactionId}&env=${env}`;
  const iframeParams = `${process.env.NEXT_PUBLIC_PAYMENT_URI}/payment-gateway?userid=${userid}&productId=${productId}&transactionId=${transactionId}&env=${env}`;

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    const iframeRefComp = iframeRef.current;
    // iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
    // const temp = iframe.contentWindow.document.body.scrollHeight + "px";
    // setHeight(temp);
  };

  const handleBackBtn = () => {
    window.location.replace(`/bini`);
  };

  useEffect(() => {
    if (iframeLoaded) {
      const iframeRefComp = iframeRef.current;
      // console.log('window.self', window.self);
      // console.log('window.top', window.top);
      // const tempHeight = iframeRefComp.contentWindow.document.body.scrollHeight + "px";
      // setHeightx(tempHeight);
      // console.log('iframeRefComp', iframeRefComp?.querySelector('body'));
    }
  }, [iframeLoaded]);

  useEffect(() => {
    const tempItemCode = window.localStorage.getItem("itemCode");
    setItemCode(tempItemCode ? tempItemCode : "");
    const tempItemUrl = window.localStorage.getItem("itemUrl");
    setItemUrl(tempItemUrl ? tempItemUrl : "");

    const _getSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setIsReady(true);
        } else {
          router.replace(`/login`);
        }
      } catch (error) {
        console.error("Error:", error);
        router.replace(`/login`);
      }
    };
    _getSession();
  }, []);

  return (
    <>
      {isReady ? (
        <>
          <Navigation />
          <div
            className="w-full h-full min-h-screen bg-[#FAFAFA] text-[#93767A]"
            style={{
              paddingTop: isMobile ? "90px" : "90px",
              paddingBottom: isMobile ? "70px" : "0",
            }}
          >
            <div className={`px-4 md:px-12`}>
              <div className="movieSliderInner">
                {/* <div className="flex flex-row items-center gap-3 lg:gap-8 mb-6">
                  <ArrowLeftIcon
                    onClick={handleBackBtn}
                    className="w-4 md:w-10 cursor-pointer hover:opacity-80 transition"
                  />
                  <p
                    className="text-[#93767A]/80 text-1xl md:text-3xl font-bold cursor-pointer"
                    onClick={handleBackBtn}
                  >
                    <span className="font-light">Back</span>
                  </p>
                  <p className=" text-xl md:text-2xl lg:text-[2rem] font-semibold">
                    Payment
                  </p>
                </div> */}
                <div className="lg:px-6 pb-6 flex flex-wrap">
                  {!iframeLoaded && (
                    <div className="absolute top-0 left-0 w-full h-full bg-[#FAFAFA] flex justify-center items-center z-10 cursor-wait">
                      <FlowerBlackLoader />
                    </div>
                  )}
                  {isLoginUser && (
                    <iframe
                      ref={iframeRef}
                      className="w-full h-[100vh]"
                      // height={height}
                      src={iframeParams}
                      onLoad={handleIframeLoad}
                      // scrolling="no"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default MyProfile;
