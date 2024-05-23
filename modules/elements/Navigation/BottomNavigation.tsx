import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import checkAuthentication from "@/utils/checkAuth";
import MobileCollapse from "@/modules/elements/Navigation/MobileCollapse";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";
import {
  HomeOutlined,
  ConfirmationNumberOutlined,
  List,
  MoreHoriz,
  AccountCircleOutlined,
} from "@mui/icons-material";

const BottomNavigation = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const { isLoginUser, isLoadingUserCheck } = useCheckAuthentication();

  useEffect(() => {
    setIsCollapseOpen(false);
  }, [router.asPath]);
  useEffect(() => {
    if (isCollapseOpen) {
      document.querySelector("main")?.classList.add("overflow-hidden");
      document.body.style.overflowY = "hidden";
    } else {
      document.querySelector("main")?.classList.remove("overflow-hidden");
      document.body.style.overflowY = "auto";
    }
  }, [isCollapseOpen]);
  useEffect(() => {
    const _checkAuthentication = async () => {
      const isAuthenticated = await checkAuthentication();
      setIsAuthenticated(isAuthenticated);
    };
    _checkAuthentication();
  }, []);
  return (
    <>
      {isCollapseOpen ? (
        <MobileCollapse
          isCollapseOpen={isCollapseOpen}
          setIsCollapseOpen={setIsCollapseOpen}
        />
      ) : null}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black px-6 py-2 border-t border-gray-800">
        <div className={`flex ${(isLoadingUserCheck)?'justify-around':'justify-between'}`}>
          <button
            className="flex items-center justify-center flex-col px-2 cursor-pointer active:opacity-65"
            onClick={() => router.push("/")}
          >
            <HomeOutlined
              className={`${
                "/" === router.asPath ? "text-blue-700" : "text-white"
              } text-xl`}
            />
            <span
              className={`${
                "/" === router.asPath ? "text-blue-500" : "text-white"
              } font-regular text-xs mt-1`}
            >
              Home
            </span>
          </button>
          {(!isLoadingUserCheck)&&(
            <>
            {isLoginUser ? (
            <>
              <button
                className="flex items-center justify-center flex-col px-2 cursor-pointer active:opacity-65"
                onClick={() => router.push("/mytickets")}
              >
                <ConfirmationNumberOutlined
                  className={`${
                    "/mytickets" === router.asPath
                      ? "text-blue-700"
                      : "text-white"
                  } text-xl`}
                />
                <span
                  className={`${
                    "/mytickets" === router.asPath
                      ? "text-blue-500"
                      : "text-white"
                  } font-regular text-xs mt-1`}
                >
                  My Tickets
                </span>
              </button>
              <button
                className="flex items-center justify-center flex-col px-2 cursor-pointer active:opacity-65"
                onClick={() => router.push("/list")}
              >
                <List
                  className={`${
                    "/list" === router.asPath ? "text-blue-700" : "text-white"
                  } text-xl`}
                />
                <span
                  className={`${
                    "/list" === router.asPath ? "text-blue-500" : "text-white"
                  } font-regular text-xs mt-1`}
                >
                  My List
                </span>
              </button>
            </>
          ) : (
            <button
              className="flex items-center justify-center flex-col px-2 cursor-pointer active:opacity-65"
              onClick={() => {
                localStorage.setItem("callbackAction", "redirect");
                router.push("/auth");
              }}
            >
              <AccountCircleOutlined
                className={`${
                  "/auth" === router.asPath ? "text-blue-700" : "text-white"
                } text-xl`}
              />
              <span
                className={`${
                  "/auth" === router.asPath ? "text-blue-500" : "text-white"
                } font-regular text-xs mt-1`}
              >
                Login
              </span>
            </button>
          )}
            </>
          )}
          <button
            className="flex items-center justify-center flex-col px-2 cursor-pointer active:opacity-65"
            onClick={() => {
              setIsCollapseOpen(true);
            }}
          >
            <MoreHoriz
              className={`${
                "/ddd" === router.asPath ? "text-blue-700" : "text-white"
              } text-xl`}
            />
            <span
              className={`${
                "/ddd" === router.asPath ? "text-blue-500" : "text-white"
              } font-regular text-xs mt-1`}
            >
              More
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
export default BottomNavigation;
