import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";
import SkeletonHome from "@/components/Skeleton/SkeletonHome";
import { MaskEmail } from "@/utils/maskEmail";
import { Route } from "@mui/icons-material";
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const sendEmailVerificationFunc = async (auth: any) => {
  await sendEmailVerification(auth?.currentUser, {
    url: process.env.NEXT_PUBLIC_EMAIL_VERIFY_REDIRECT_URI as string,
    handleCodeInApp: true,
  })
    .then(() => {
      console.log("email verification sent");
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  // console.log('sendEmailVerificationFunc');
};
const EmailVerified = () => {
  const  [auth, setAuth] = useState({});
  useEffect(() => {
     setAuth(getAuth());
    // @ts-ignore 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.emailVerified) {
          // console.log('email verified', user?.emailVerified);
          // redirect to home page
          if (window) window.location.href = "/";
        } else {
          // console.log('email not verified', user?.emailVerified);
          sendEmailVerificationFunc(auth);
        }
      } else {
        // User is signed out
        if (window) window.location.href = "/";
      }
    });
  }, [auth]);
  return (
    <>
      <EmailVerifyModal auth={auth} />
    </>
  );
};

export default EmailVerified;

const EmailVerifyModal = (auth: any) => {
  const [email, setEmail] = useState(
    auth?.currentUser?.email ? auth?.currentUser?.email : ""
  );
  useEffect(() => {
    const userInfo = window?.localStorage?.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setEmail(userInfoObj.email);
      }
    }
  }, []);
  return (
    <>
      <div className="z-40 fixed h-full w-full">
        <img
          src="/images/loginbg.png"
          className="h-full w-full object-cover object-right-top"
          alt="all Movies"
        />
        {/* <SkeletonHome /> */}
      </div>
      <div className="flex flex-col items-center justify-center text-gray-300 fixed w-full h-full z-50 p-8 bg-black bg-opacity-60">
        <div className="w-[80%] max-w-[1200px] rounded-md bg-gradient-to-tl to-[#000000] to-[75%] from-[#4E0558] p-4  py-16 text-center border-2 border-[#fff]">
          <h1 className="text-4xl font-bold mb-4">Thank you for signing up!</h1>
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-red-600">Your Email is not verified.</span>{" "}
            <br />
            Please verify your email to continue.
          </h2>
          <p className="text-lg">
            Please check your email{" "}
            <strong className="underline text-white">
              {MaskEmail(email as string)}
            </strong>{" "}
            for a verification link.
          </p>

          <p className="text-lg">
            We have sent an email to your email address. Please verify your
            email to continue.
          </p>
          <p className="text-lg">
            If you have not received the email, please check your spam folder.
          </p>
          <button
            onClick={() => sendEmailVerificationFunc(auth)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Resend Email Verification Link
          </button>
        </div>
      </div>
    </>
  );
};
