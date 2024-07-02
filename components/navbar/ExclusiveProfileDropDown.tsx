import React, { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useProfile from "@/hooks/useProfile";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowDropDown,
  CreditCard,
  PaymentsOutlined,
  DevicesOtherOutlined,
} from "@mui/icons-material";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";
import LogoutPopUp from "@/modules/elements/LogoutPopUp";
import { getSession } from "@/utils/cognitoAuth";
import {
  MyTicketsIcon,
  MyListIcon,
  MyAccountIcon,
  HelpCenterIcon,
  LogoutIcon,
} from "@/utils/CustomSVGs";

const ExclusiveProfileDropDown = () => {
  const router = useRouter();
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [userid, setUserid] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const { data: profile, isLoading } = useProfile(userid);
  const { isLoginUser, isLoadingUserCheck } = useCheckAuthentication();
  const [isLogoutPopUp, setIsLogoutPopUp] = useState(false);
  // console.log('profile', profile, isLoading);

  useEffect(() => {
    if (!isLoading) {
      if (
        profile?.hasOwnProperty("firstName") ||
        profile?.hasOwnProperty("lastName")
      ) {
        if (profile?.hasOwnProperty("firstName")) {
          setDisplayName(profile?.firstName);
        }
        if (profile?.hasOwnProperty("lastName")) {
          setDisplayName(profile?.firstName + " " + profile?.lastName);
        }
      } else {
        setDisplayName("Your Name");
      }
    }
  }, [profile]);
  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj?.sub) {
        setUserid(userInfoObj?.sub);
      }
    }
    const _getSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setIsReady(true);
          setIsLogedIn(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    _getSession();
  }, []);
  return (
    <>
      {!isLoadingUserCheck && (
        <>
          {isLogedIn ? (
            <>
              <Menu as="div" className="relative text-left flex">
                <Menu.Button className="inline-flex items-center">
                  <div className="transition w-[40px] h-[40px] rounded-full p-[3px] bg-white border-2 border-[#94B0B3]">
                    <img
                      src="/images/ph_user-fill.png"
                      alt={displayName}
                      className="w-full h-full rounded-full text-[0px]"
                    />
                  </div>
                  <ArrowDropDown
                    sx={{
                      fontSize: 30,
                      color: "#94B0B3",
                    }}
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="fixed sm:absolute text-[16px] top-12 sm:top-9 right-0 sm:right-2 z-20 mt-2 w-full sm:w-[360px] origin-top-right bg-transparent text-[#454545] focus:outline-none">
                    <div className="w-full h-screen relative">
                      <div className="p-4 relative z-20 bg-white shadow rounded-none sm:rounded-md">
                        <div className="flex items-center">
                          <div className="transition w-[64px] min-w-[64px] h-[64px] rounded-full p-[3px] bg-white mr-3 border-2 border-[#94B0B3]/70 flex justify-center items-center overflow-hidden">
                            <img
                              src="/images/ph_user-fill.png"
                              alt={displayName}
                              className="text-[0px]"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-2xl leading-normal m-0">
                              {displayName ?? displayName}
                            </h3>
                            <p className="text-[14px] ">
                              <button
                                className="cursor-pointer hover:underline"
                                onClick={() => router.push("/myprofile")}
                              >
                                Edit Profile
                              </button>
                            </p>
                          </div>
                        </div>
                        <div className="my-[20px] asDivider"></div>
                        <div className="mb-2">
                          <button
                            className={`flex w-full items-center cursor-pointer hover:bg-gray-100 rounded-md p-1 ${
                              router.pathname === "/myprofile" && "bg-gray-100"
                            }`}
                            onClick={() => router.push("/myprofile")}
                          >
                            <span className="mr-2">
                              <MyAccountIcon />
                            </span>
                            <p>Manage Account</p>
                          </button>
                        </div>
                        {/* <div className="mb-2">
                          <button
                            className={`flex w-full items-center cursor-pointer hover:bg-gray-100 rounded-md p-1 ${
                              router.pathname === "/mycard" && "bg-gray-100"
                            }`}
                            onClick={() => router.push("/mycard")}
                          >
                            <span className="mr-2">
                              <CreditCard />
                            </span>
                            <p>Manage Card</p>
                          </button>
                        </div> */}
                        <div className="mb-2">
                          <button
                            className={`flex w-full items-center cursor-pointer hover:bg-gray-100 rounded-md p-1 ${
                              router.pathname === "/billing-details" &&
                              "bg-gray-100"
                            }`}
                            onClick={() => router.push("/billing-details")}
                          >
                            <span className="mr-2">
                              <PaymentsOutlined />
                            </span>
                            <p>Billing Details</p>
                          </button>
                        </div>
                        <div className="my-[15px] asDivider"></div>
                        <div className="mb-2">
                          <button
                            className="flex w-full items-center cursor-pointer hover:bg-gray-100 rounded-md p-1"
                            onClick={() => {
                              window.open(
                                "https://iconnconvergence-support.freshdesk.com/support/home",
                                "_blank"
                              );
                            }}
                          >
                            <span className="mr-2">
                              <HelpCenterIcon />
                            </span>
                            <p>Help Centre</p>
                          </button>
                        </div>
                        <div>
                          <button
                            className="flex w-full items-center cursor-pointer hover:bg-gray-100 rounded-md p-1"
                            onClick={() => setIsLogoutPopUp(true)}
                          >
                            <span className="mr-2">
                              <LogoutIcon />
                            </span>
                            <p>Logout</p>
                          </button>
                        </div>
                      </div>

                      <div className="block sm:hidden relative w-full h-full bg-black/50 z-10"></div>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {isLogoutPopUp && (
                <LogoutPopUp setIsLogoutPopUp={setIsLogoutPopUp} />
              )}
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => {
                localStorage.setItem("callbackAction", "redirect");
              }}
              className="rounded-full min-w-[96px] sm:min-w-[120px] px-3 py-1 flex justify-center items-center bg-white"
            >
              Login
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default ExclusiveProfileDropDown;
