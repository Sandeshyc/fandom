import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthFrame from "@/modules/Identities/AuthFrame";
import GoogleIdentitySignIn from "@/components/GoogleIdentitySignIn";

const Auth = () => {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    let redirectUrl = "";
    // query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // console.log('urlParams', urlParams);
    if (urlParams?.get("redirectUrl")) {
      redirectUrl = urlParams?.get("redirectUrl") as string;
      // console.log('redirectUrl', redirectUrl);
      localStorage.setItem("redirectUrl", redirectUrl);
    }

    const userInfo = window.localStorage.getItem("userInfo");
    // console.log("userInfo: ", userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        router.push("/");
      }
    }
  }, []);
  return (
    <AuthFrame authLoading={authLoading} pageHeading="Login Account">
      <GoogleIdentitySignIn setAuthLoading={setAuthLoading} />
      <div className="w-full flex justify-center text-white mt-6 mb-2">
        <p className="m-0">
          <span className="text-[#454545] mr-2">New here?</span>
          <Link
            href="/register"
            className="text-[#1B82F2] font-semibold  cursor-pointer underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </AuthFrame>
  );
};

export default Auth;