import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileDropDown from "@/components/navbar/ProfileDropDown";
import useIsMobile from "@/hooks/useIsMobile";
import Header from "@/modules/elements/Header";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";
const logoSrc = "/images/join-now.png";

const NavigationHome = () => {
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
        className={`mainHeader px-6 sm:px-[72px] mainNavbar w-full fixed z-50 top-0 left-0 bg-[#11355E]`}
      >
        <div className="max-w-[2400px] mx-auto">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center justify-between">
              <div className="mr-4 xl:mr-8 my-3 flex items-center gap-2">
                <img
                  src={logoSrc}
                  className="w-[64px] h-[30px] sm:w-[102px] sm:h-[48px] cursor-pointer"
                  alt="Bini"
                  onClick={() => window.location.replace("/bini")}
                />
                <p className="font-inter font-extrabold sm:text-xl leading-normal italic text-white">
                  Fandom
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="pl-4">
                <div className="flex flex-row items-center">
                  <ProfileDropDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationHome;
