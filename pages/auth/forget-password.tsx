import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword, confirmPassword } from "@/utils/cognitoAuth";
import AuthFrame from "@/modules/Identities/AuthFrame";
import OTPInput from "@/modules/Identities/OTPInput";
import Text from "@/modules/Identities/Text";
import { Visibility, VisibilityOff, CalendarMonth } from "@mui/icons-material";

const ForgetPassword = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailSentError, setIsEmailSentError] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);

  const [isConfirmingOTP, setIsConfirmingOTP] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [open, setOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isResenting, setIsResenting] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isUpdateFail, setIsUpdateFail] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleOtpChange = (otp: any) => {
    setOtp(otp);
    if (otp.length !== 6) {
      setIsFail(false);
      setIsSuccess(false);
    }
  };

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
      try {
        const response = await forgotPassword(email);
        setIsEmailSent(true);
        setIsEmailSentError(false);
        setEmail(email);
        // console.log("response", response);
      } catch (error) {
        // console.log("error", error);
        setIsEmailSentError(true);
        setIsEmailSent(false);
      }
      setAuthLoading(false);
      setOnSubmit(false);
    },
  });
  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const toggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const schema2 = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\\.,><':;|_~=`=+-])[A-Za-z0-9!@#$%^&*()[\]{}\\.,><':;|_~=`=+-]{8,}$/,
        "Password must contain at least 1 uppercase, 1 lowercase and 1 number and 1 special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords are not matched")
      .required("Confirm Password is required"),
  });
  const formik2 = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema2,

    // Handle form submission
    onSubmit: async ({ password }) => {
      setAuthLoading(true);
      setOnSubmit(true);
      try {
        const response = await confirmPassword(email, otp, password);
        // console.log("response", response);
        setIsUpdateSuccess(true);
        setIsUpdateFail(false);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } catch (error: any) {
        setIsUpdateSuccess(false);
        setIsUpdateFail(true);
        console.log("error", error);
        if (error.code === "CodeMismatchException") {
          setErrorMessage("Incorrect OTP, please try again");
        } else {
          setErrorMessage(error.message);
        }
      }
      setAuthLoading(false);
      setOnSubmit(false);
    },
  });
  // Destructure the formik object
  const {
    errors: errors2,
    touched: touched2,
    values: values2,
    handleChange: handleChange2,
    handleSubmit: handleSubmit2,
  } = formik2;
  return (
    <AuthFrame authLoading={authLoading} pageHeading="Forgot Password">
      {isEmailSent ? (
        <form
          onSubmit={handleSubmit2}
          method="POST"
          className="max-w-[368px] mx-auto"
        >
          <div className="mb-4">
            <OTPInput
              length={6}
              onChange={handleOtpChange}
              isReset={isResenting}
              isFail={isFail}
              isSuccess={isSuccess}
            />
            {isFail && (
              <Text size="md" className="text-red-600 mt-2">
                Incorrect OTP, please try again
              </Text>
            )}
            <div className="mb-6 text-left mt-6">
              <div className="relative">
                <input
                  type={!isShowPassword ? "password" : "text"}
                  placeholder="Password"
                  name="password"
                  value={values2.password}
                  onChange={handleChange2}
                  className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
                />
                <div className="absolute top-[8px] right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
                  {!isShowPassword ? (
                    <>
                      <span onClick={togglePassword}>
                        <VisibilityOff
                          sx={{
                            fontSize: 24,
                            color: "#5F576F",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <span onClick={togglePassword}>
                        <Visibility
                          sx={{
                            fontSize: 24,
                            color: "#5F576F",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </>
                  )}
                </div>
              </div>
              {errors2.password && touched2.password && (
                <span className="text-red-500 w-full text-xs">
                  {errors2.password}
                </span>
              )}
            </div>
            <div className="mb-6 text-left">
              <div className="relative">
                <input
                  type={!isShowConfirmPassword ? "password" : "text"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values2.confirmPassword}
                  onChange={handleChange2}
                  className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
                />
                <div className="absolute top-[8px] right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
                  {!isShowConfirmPassword ? (
                    <>
                      <span onClick={toggleConfirmPassword}>
                        <VisibilityOff
                          sx={{
                            fontSize: 24,
                            color: "#5F576F",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <span onClick={toggleConfirmPassword}>
                        <Visibility
                          sx={{
                            fontSize: 24,
                            color: "#5F576F",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </>
                  )}
                </div>
              </div>
              {errors2.confirmPassword && touched2.confirmPassword && (
                <span className="text-red-500 w-full text-xs">
                  {errors2.confirmPassword}
                </span>
              )}
            </div>
            {isUpdateSuccess && (
              <p className="text-green-500 text-sm md:text-base">
                Password updated successfully, redirecting to login page...
              </p>
            )}
            {isUpdateFail && (
              <p className="text-red-500 text-sm md:text-base">
                {errorMessage}
              </p>
            )}
            {otp?.length < 6 || isConfirmingOTP ? (
              <span className=" h-[40px] flex justify-center items-center py-1 text-[#fff] rounded-[50px] w-full transition bg-[#1B82F2]/50 cursor-not-allowed mt-2">
                {isConfirmingOTP ? "Loading..." : "Update Password"}
              </span>
            ) : (
              <button
                type="submit"
                className="h-[40px] flex justify-center items-center py-1 text-[#fff] rounded-[50px] w-full transition bg-[#1B82F2] mt-2"
              >
                Update Password
              </button>
            )}
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="max-w-[368px] mx-auto"
        >
          <div className="mb-4">
            <div className="relative">
              <input
                placeholder="Email Address"
                type="text"
                name="email"
                autoFocus={true}
                value={values.email}
                onChange={handleChange}
                className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
              />
            </div>
            {errors.email && touched.email && (
              <span className="text-red-500 w-full text-sm text-left block mt-1">
                {errors.email}
              </span>
            )}
          </div>
          {isEmailSentError && (
            <p className="text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center">
              Sorry, we couldn't send the OTP to your email. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="h-[40px] py-2 text-[#fff] rounded-[50px] w-full transition bg-[#1B82F2] active:opacity-65"
          >
            {onSubmit ? "Send..." : "Continue"}
          </button>
        </form>
      )}

      <p className="flex flex-wrap justify-center text-white mt-8">
        {isEmailSent && (
          <button
            onClick={() => {
              setIsEmailSent(false);
            }}
            className="text-[#454545] cursor-pointer underline mr-8"
          >
            Resend OTP
          </button>
        )}
        <Link
          href={"/login"}
          className="text-[#1B82F2] font-semibold cursor-pointer underline"
        >
          Back Login
        </Link>
      </p>
    </AuthFrame>
  );
};
export default ForgetPassword;
