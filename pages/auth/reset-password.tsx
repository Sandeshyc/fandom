import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  confirmPasswordReset,
  checkActionCode,
  applyActionCode,
} from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmailIcon, LockIcon, EyeSlashIcon } from "@/utils/CustomSVGs";
import AuthFrame from "@/modules/Identities/AuthFrame";
import {
  Visibility,
  VisibilityOff,
  RotateRightOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const imgLogBG = "/images/loginbgnew.png";

const ResetPassword = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "oops! something went wrong"
  );
  const [oobCode, setOobCode] = useState("");
  const [mode, setMode] = useState("");
  const router = useRouter();
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = useState(
    "oops! something went wrong"
  );
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isVerifingEnd, setIsVerifingEnd] = useState(false);
  // get query params
  useEffect(() => {
    const { oobCode, mode } = router.query;
    setOobCode(oobCode as string);
    setMode(mode as string);
    if (mode === "verifyEmail") {
      const _handleVerification = async () => {
        console.log(
          "auth.currentUser?.emailVerified",
          auth.currentUser?.emailVerified
        );
        if (auth.currentUser?.emailVerified === true) {
          setIsVerifiedEmail(true);
          setTimeout(() => {
            router.replace("/login");
          }, 1000);
        } else {
          try {
            await applyActionCode(auth, oobCode as string);
            setIsVerifiedEmail(true);
            setTimeout(() => {
              router.replace("/login");
            }, 1000);
          } catch (error: any) {
            if (error.code === "auth/expired-action-code") {
              setVerifyEmailErrorMessage("expired");
            }
            if (error.code === "auth/invalid-action-code") {
              setVerifyEmailErrorMessage("This link already used");
            }
            if (error.code === "auth/user-disabled") {
              setVerifyEmailErrorMessage("user disabled");
            }
            if (error.code === "auth/user-not-found") {
              setVerifyEmailErrorMessage("user not found");
            }
            if (error.code === "auth/email-already-in-use") {
              setVerifyEmailErrorMessage("email already in use");
            }
          }
        }
        setIsVerifingEnd(true);
      };
      _handleVerification();
      // router.replace('/auth');
    }
  }, [router.query]);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const toggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const schema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Password must contain at least 1 uppercase, 1 lowercase and 1 number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords are not matched")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ password, confirmPassword }) => {
      // Make a request to your backend to store the data
      setAuthLoading(true);
      setIsSubmitting(true);
      setOnSubmit(true);
      await confirmPasswordReset(auth, oobCode, password)
        .then(() => {
          console.log("email verification sent");
          setOnSubmit(false);
          setIsLoginFail(false);
          setIsSuccess(true);
          setErrorMessage("Success!");
          router.push("/login");
        })
        .catch((error) => {
          console.log("error: ", error);
          setOnSubmit(false);
          setIsLoginFail(true);
          setIsSuccess(false);
          setErrorMessage("oops! something went wrong");
          if (error.code === "auth/expired-action-code") {
            setErrorMessage("The link has expired. ");
          }
          if (error.code === "auth/expired-action-code") {
            setErrorMessage("The link has expired. ");
          }
          if (error.code === "auth/invalid-action-code") {
            setErrorMessage("The link is invalid. ");
          }
          if (error.code === "auth/user-disabled") {
            setErrorMessage(
              "The user corresponding to the given link has been disabled. "
            );
          }
          if (error.code === "auth/user-not-found") {
            setErrorMessage(
              "There is no user corresponding to the given link. "
            );
          }
        });
        setAuthLoading(false);
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <AuthFrame pageHeading={""} authLoading={authLoading}>
        <div className="w-full max-w-[315px] sm:max-w-[448px] self-center">
          {mode === "resetPassword" ? (
            <>
              <h1 className="text-[#5F576F] text-[18px] sm:text[24px] xl:text-[30px] mb-4 sm:mb-8 font-semibold  text-center ">
                Reset Password
              </h1>
              <p className="text-[#5F576F] text-[14px] sm:text-[16px] xl:text-[18px] mb-2">
                New Password
              </p>
              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type={!isShowPassword ? "password" : "text"}
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      autoFocus={true}
                      className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-1 pr-10 rounded-md h-[36px] xl:h-[40px] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
                    />
                    <div className="absolute top-[8px] right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
                      {!isShowPassword ? (
                        <>
                          <span onClick={togglePassword}>
                            <VisibilityOff
                              sx={{
                                fontSize: 18,
                                color: "#5F576F",
                              }}
                            />
                          </span>
                        </>
                      ) : (
                        <>
                          <span onClick={togglePassword}>
                            <Visibility
                              sx={{
                                fontSize: 18,
                                color: "#5F576F",
                              }}
                            />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <span className="text-red-500 w-full text-xs">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type={!isShowConfirmPassword ? "password" : "text"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-1 pr-10 rounded-md h-[36px] xl:h-[40px] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
                    />
                    <div className="absolute top-[8px] right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
                      {!isShowConfirmPassword ? (
                        <>
                          <span onClick={toggleConfirmPassword}>
                            <VisibilityOff
                              sx={{
                                fontSize: 18,
                                color: "#5F576F",
                              }}
                            />
                          </span>
                        </>
                      ) : (
                        <>
                          <span onClick={toggleConfirmPassword}>
                            <Visibility
                              sx={{
                                fontSize: 18,
                                color: "#5F576F",
                              }}
                            />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="text-red-500 w-full text-xs">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
                {isSubmitting && isLoginFail && (
                  <p className="text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center">
                    {errorMessage}
                  </p>
                )}
                {isSubmitting && isSuccess && (
                  <p className="text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="h-[36px] py-1 text-[#fff] rounded-[50px] w-full transition bg-[#E79FAD]"
                >
                  {onSubmit ? "Loading..." : "Continue"}
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
            </>
          ) : null}
          {mode === "verifyEmail" && !isVerifingEnd ? (
            <div className="flex justify-center items-center flex-col">
              <RotateRightOutlined
                className="animate-spin"
                sx={{
                  fontSize: 60,
                  color: "#5F576F",
                }}
              />
              <p className="text-[#5F576F]">Verifing Email...</p>
            </div>
          ) : null}
          {mode === "verifyEmail" && isVerifingEnd && isVerifiedEmail ? (
            <p className="text-green-900 bg-green-200 rounded-md my-2 p-4 w-full text-center">
              Your email has been verified. Please wait...
            </p>
          ) : null}
          {mode === "verifyEmail" && isVerifingEnd && !isVerifiedEmail ? (
            <>
              <p className="text-red-900 bg-red-200 rounded-md my-2 p-4 w-full text-center">
                {verifyEmailErrorMessage}
              </p>
              <p className="flex flex-wrap justify-center text-[#5F576F] mt-8">
                <span
                  onClick={() => router.push("/login")}
                  className="text-[#5F576F] text-[14px] cursor-pointer hover:underline"
                >
                  Back Login
                </span>
              </p>
            </>
          ) : null}
        </div>
      </AuthFrame>
    </>
  );
};
export default ResetPassword;
