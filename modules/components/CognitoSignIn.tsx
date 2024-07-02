import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, getCurrentUser, resendSignUp } from "@/utils/cognitoAuth";
import useUserInfo from "@/hooks/useUserInfo";
import useUserInfoLoggedIn from "@/hooks/useUserInfoLoggedIn";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff, CalendarMonth } from "@mui/icons-material";
import VerifyMail from "@/modules/elements/VerifyMail";

import useRecaptchaV3 from "@/hooks/useRecaptchaV3";
import {
  reChapchaTokenVerify
} from "@/services/api";

type Props = {
  setAuthLoading: any;
};

// Main Component
const CognitoSignIn = ({ setAuthLoading }: Props) => {
  const router = useRouter();
  const { checkUser } = useUserInfoLoggedIn();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isVerifingEmail, setIsVerifingEmail] = useState(false);

  const executeRecaptcha = useRecaptchaV3(process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY as string);
  // console.log('executeRecaptcha', executeRecaptcha);
  // const { data, error, isLoading } = useVerifyReChaptcha();
  // console.log('Saim::::data', data, 'error', error, 'isLoading', isLoading);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const schema = Yup.object().shape({
    userEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    usesrPassword: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      usesrPassword: "",
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ userEmail, usesrPassword }) => {
      setAuthLoading(true);
      setIsSubmitting(true);
      try {
        let isRechapthaVerified = false;
        const _checkingRecaptcha = async () => {
          try {
            const tokenx = await executeRecaptcha('login');
            // console.log('token::::', tokenx);
            if(tokenx){
              const response = await reChapchaTokenVerify(tokenx);
              // console.log('response', response);
              if(response.status === 'success'){
                console.log('ReCaptcha Verified');
                isRechapthaVerified = true;
              }else {
                console.log('ReCaptcha Failed');
                isRechapthaVerified = false;
              }
            }
            // setIsRechapthaVerified(false);
          } catch (error) {
            console.error('Error:', error);
            isRechapthaVerified = false;
          }
        }
        await _checkingRecaptcha();
        if(isRechapthaVerified){
          // return false;
          // console.log("Email:", userEmail, "password", usesrPassword);
          const response = (await signIn(userEmail, usesrPassword)) as any;
          // console.log("response", response);
          if (response) {
            setIsSuccess(true);
            setIsLoginFail(false);
            const user = (await getCurrentUser()) as any;
            // console.log("user", user);
            if (user) {
              const { email, email_verified } = user;
              // console.log("email", email, "isVerified", email_verified);
              if (email_verified) {
                setIsVerifingEmail(false);
                // return false;
                const userData = {
                  userid: userEmail,
                  providerId: userEmail,
                  email: userEmail,
                  providerName: "cognito",
                  emailVerified: true,
                  accessToken: response?.accessToken?.jwtToken,
                };
                const userResponse = await checkUser(userData) as any;
                if (userResponse === 200) {
                  setIsSuccess(true);
                  setIsLoginFail(false);
                  let redirectUrl = localStorage.getItem("redirectUrl");
                  if (!redirectUrl) {
                    redirectUrl = "/bini";
                  }
                  localStorage.removeItem("redirectUrl");
                  window.location.replace(redirectUrl);
                  console.log("success");
                } else {
                  setAuthLoading(false);
                  setIsSuccess(false);
                  setIsLoginFail(true);
                  window.location.replace("/login");
                  // console.log("failed");
                }
              } else {
                setAuthLoading(false);
                setIsVerifingEmail(true);
              }
            }
          } else {
            setIsSuccess(false);
            setIsLoginFail(true);
            setMessage("Incorrect Email Or Password");
          }
        }else{
          setIsSuccess(false);
          setIsLoginFail(true);
          setAuthLoading(false);
          setMessage("ReCaptcha Verification Failed");
        }
      } catch (err: any) {
        // console.log("err", err);
        if (err.code === "UserNotConfirmedException") {
          setIsVerifingEmail(true);
          setIsSuccess(true);
          setIsLoginFail(false);
          setMessage("Please verify your email");
        } else {
          setIsSuccess(false);
          setIsLoginFail(true);
          setMessage(err.message);
          setAuthLoading(false);
        }
      }
      setIsSubmitting(false);
    },
  });
  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  useEffect(() => {
    if (isVerifingEmail) {
      const _reSendVerificationCode = async () => {
        const response = await resendSignUp(values.userEmail);
        // console.log("response", response);
      };
      _reSendVerificationCode();
    }
  }, [isVerifingEmail]);
  return (
    <>
      {isVerifingEmail ? (
        <VerifyMail email={values.userEmail} password={values.usesrPassword} />
      ) : null}
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="text-left max-w-[368px] mx-auto"
      >
        <div className="mb-4">
          <div className="relative">
            <input
              placeholder="Email Address"
              type="email"
              name="userEmail"
              autoFocus={true}
              autoComplete="off"
              value={values.userEmail}
              onChange={handleChange}
              className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
            />
          </div>
          {errors.userEmail && touched.userEmail ? (
            <p className="text-[#FF3636] text-[14px] py-1">
              {errors.userEmail}
            </p>
          ) : null}
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type={!isShowPassword ? "password" : "text"}
              placeholder="Password"
              name="usesrPassword"
              value={values.usesrPassword}
              autoComplete="off"
              onChange={handleChange}
              className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
            />
            <div className="absolute top-[8px] right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
              {!isShowPassword ? (
                <span onClick={togglePassword}>
                  <VisibilityOff
                    sx={{
                      fontSize: 18,
                      color: "#5F576F",
                      cursor: "pointer",
                    }}
                  />
                </span>
              ) : (
                <span onClick={togglePassword}>
                  <Visibility
                    sx={{
                      fontSize: 18,
                      color: "#5F576F",
                      cursor: "pointer",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
          {errors.usesrPassword && touched.usesrPassword ? (
            <p className="text-[#FF3636] text-[14px] py-1">{errors.usesrPassword}</p>
          ) : null}
          <div className="w-full flex justify-end text-[#93767A] my-4">
            <Link
              href="/auth/forget-password"
              className="text-[#11355E] cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        {isLoginFail && (
          <p className="text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center">
            {message}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center">
            Login Success,{" "}
            {isVerifingEmail ? "please verify email" : "Please wait..."}
          </p>
        )}
        <button
          type="submit"
          className="h-[40px] py-2 text-[#fff] rounded-[50px] w-full transition bg-[#1B82F2] active:opacity-65"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
};
export default CognitoSignIn;
