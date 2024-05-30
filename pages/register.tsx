import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthFrame from "@/modules/Identities/AuthFrame";
import GoogleIdentitySignUp from "@/components/GoogleIdentitySignUp";

const Registration = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        router.push("/discover");
      }
    }
  }, []);
  return (
    <AuthFrame authLoading={authLoading} pageHeading="Create Account">
      <GoogleIdentitySignUp setAuthLoading={setAuthLoading} />
      <div className="w-full flex justify-center text-[#93767A] mt-6 mb-2">
        <p className="m-0">
          <span className="mr-2">Already Have an Account?</span>
          <Link
            href="/login"
            className="text-[#1B82F2] font-semibold  cursor-pointer underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthFrame>
  );
};

export default Registration;
