import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import GoogleIdentitySignUp from "components/GoogleIdentitySignUp";
import CognitoSignUp from "@/modules/components/CognitoSignUp";
import AuthFrame from "@/modules/Identities/AuthFrame";

const Registration = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        router.push("/bini");
      }
    }
  }, []);
  return (
    <AuthFrame authLoading={authLoading} pageHeading="Create Account">
      {/* <CognitoSignUp /> */}
      <CognitoSignUp setAuthLoading={setAuthLoading} />
      {/* <GoogleIdentitySignUp setAuthLoading={setAuthLoading}/> */}
      <div className="w-full flex justify-center text-[#454545] mt-4 mb-2">
        <p className="m-0">
          <span className=" mr-2">Already Have an Account?</span>
          <Link
            href="/login"
            className=" text-[#1B82F2] font-semibold cursor-pointer underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthFrame>
  );
};

export default Registration;
