import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";
import ExclusiveProfileDropDown from "@/components/navbar/ExclusiveProfileDropDown";
const logoSrc = "/images/bini-logo-allwhite.png";

const ExclusiveNavigation = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  const { isLoginUser, isLoadingUserCheck } = useCheckAuthentication();
  // console.log('isLoginUser', isLoginUser);
  // get scroll position in px
  const getScrollPosition = () => {
    return window?.pageYOffset;
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = getScrollPosition();
      setScrollPosition(scrollPosition);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);

  return (
    <>
      <div
        className={`mainHeader px-6 sm:px-[72px] mainNavbar w-full sticky z-50 top-0 left-0 bg-[#58C9D4]`}
      >
        <div className="max-w-[2400px] mx-auto">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex pt-[6px] pb-4 items-center justify-between">
              <img
                src={logoSrc}
                className="w-[64px] h-[40px] sm:w-[76px] sm:h-[50px] cursor-pointer"
                alt="Bini"
                onClick={() => window.location.replace("/bini")}
              />
            </div>
            <div className="flex items-center justify-end">
              <div className="pl-4">
                <div className="flex flex-row items-center">
                  <ExclusiveProfileDropDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExclusiveNavigation;
