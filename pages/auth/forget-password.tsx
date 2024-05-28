import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import AuthFrame from "@/modules/Identities/AuthFrame";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmailIcon } from "@/utils/CustomSVGs";
import { set } from "lodash";
import { useRouter } from "next/router";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const imgLogBG = "/images/loginbgnew.png";

const ForgetPassword = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailSentError, setIsEmailSentError] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ email }) => {
        setAuthLoading(true);
      setOnSubmit(true);
      await sendPasswordResetEmail(auth, email, {
        url: process.env.NEXT_PUBLIC_SSO_DOMAIN as string,
        handleCodeInApp: true,
      })
        .then(() => {
          console.log("email verification sent");
          setOnSubmit(false);
          setIsEmailSent(true);
          setIsEmailSentError(false);
        })
        .catch((error) => {
          console.log("error: ", error);
          setOnSubmit(false);
          setIsEmailSent(false);
          setIsEmailSentError(true);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode: ", errorCode);
          console.log("errorMessage: ", errorMessage);
        });
        setAuthLoading(false);
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <AuthFrame authLoading={authLoading} pageHeading="Forget Password">
      <p className="text-[#5F576F] text-[14px] sm:text-[16px] xl:text-[18px] mb-2">
        Email address.
      </p>
      <form onSubmit={handleSubmit} method="POST">
        <div className="mb-4">
          <div className="relative">
            <input
              placeholder="Email Address"
              type="text"
              name="email"
              autoFocus={true}
              value={values.email}
              onChange={handleChange}
              className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-1 pr-10 rounded-md h-[36px] xl:h-[40px] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
            />
          </div>
          {errors.email && touched.email && (
            <span className="text-red-500 w-full text-sm text-left block mt-1">
              {errors.email}
            </span>
          )}
        </div>
        {isEmailSent ? (
          <p className="text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center">
            We have sent an email to{" "}
            <span className="italic">{values.email}</span>. <br />
            Please, check your email.
          </p>
        ) : (
          ""
        )}
        {isEmailSentError ? (
          <p className="text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center">
            Sorry, we couldn't find an account with that email address. Please
            try again or create a new account.
          </p>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="h-[36px] py-2 text-[#fff] rounded-[50px] w-full transition bg-[#E79FAD] active:opacity-65"
        >
          {onSubmit ? "Send..." : "Continue"}
        </button>
      </form>
      <p className="flex flex-wrap justify-center text-white mt-8">
        <span
          onClick={() => router.push("/login")}
          className="text-[#5F576F] text-[14px] cursor-pointer hover:underline"
        >
          Back Login
        </span>
      </p>
    </AuthFrame>
  );
};
export default ForgetPassword;
