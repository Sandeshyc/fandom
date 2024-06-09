import React, { useEffect, useState } from "react";
import {
  signIn,
  getCurrentUser,
  resendSignUp,
  confirmSignUp,
} from "@/utils/cognitoAuth";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import { Roboto } from "next/font/google";
import OTPInput from "@/modules/Identities/OTPInput";
import Text from "@/modules/Identities/Text";
import { CloseOutlined } from "@mui/icons-material";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
type Props = {
  email: string;
  password?: string;
};
const VerifyMail = ({ email, password }: Props) => {
  const router = useRouter();
  const { checkUser } = useUserInfo();
  const [isResenting, setIsResenting] = useState(false);
  const [reSentFail, setReSentFail] = useState(false);
  const [reSentSuccess, setReSentSuccess] = useState(false);
  const [count, setCount] = useState(
    process.env.REACT_APP_OTP_RESEND_TIMEOUT as unknown as number
  );

  const [isConfirmingOTP, setIsConfirmingOTP] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [open, setOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");

  const [withLogin, setWithLogin] = useState(false);

  const handleClose = () => {
    setOpen(false);
    window.location.href = "/login";
  };
  const handleOtpChange = (otp: any) => {
    setOtp(otp);
    if (otp.length !== 6) {
      setIsFail(false);
      setIsSuccess(false);
    }
  };
  const reSendOTP = async () => {
    try {
      setIsResenting(true);
      const response = await resendSignUp(email);
      // console.log("response", response);
      if (response) {
        setIsResenting(false);
        setReSentSuccess(true);
        setReSentFail(false);
      } else {
        setIsResenting(false);
        setReSentFail(true);
        setReSentSuccess(false);
      }
    } catch (error) {
      setIsResenting(false);
      setReSentFail(true);
      setReSentSuccess(false);
    }
  };
  const handleVerify = async () => {
    setIsConfirmingOTP(true);
    try {
      // console.log("otp", otp);
      // console.log("email", email);
      const response = await confirmSignUp(email, otp);
      if (response === "SUCCESS") {
        setIsSuccess(true);
        setIsFail(false);
        if (!password) {
          setTimeout(() => {
            handleClose();
            router.push("/login");
          }, 1000);
        } else {
          setWithLogin(true);
        }
      } else {
        setIsFail(true);
        setIsSuccess(false);
      }
    } catch (error) {
      // console.log("error", error);
      setIsFail(true);
      setIsSuccess(false);
    }
    setIsConfirmingOTP(false);
  };
  useEffect(() => {
    if (withLogin && password) {
      const _signIn = async () => {
        try {
          // console.log("Email:", email, "password", password);
          const response = (await signIn(email, password)) as any;
          // console.log("response", response);
          if (response) {
            const user = (await getCurrentUser()) as any;
            // console.log("user", user);
            if (user) {
              const { email_verified } = user;
              if (email_verified) {
                const userData = {
                  userid: email,
                  providerId: email,
                  email: email,
                  providerName: "cognito",
                  emailVerified: true,
                  accessToken: response?.accessToken?.jwtToken,
                };
                const userResponse = await checkUser(userData);
                if (userResponse === 200) {
                  let redirectUrl = localStorage.getItem("redirectUrl");
                  if (!redirectUrl) {
                    redirectUrl = "/bini";
                  }
                  localStorage.removeItem("redirectUrl");
                  window.location.replace(redirectUrl);
                } else {
                  window.location.replace("/login");
                  // console.log("failed");
                }
              } else {
                window.location.replace("/login");
              }
            } else {
              window.location.replace("/login");
            }
          } else {
            window.location.replace("/login");
          }
        } catch (err: any) {
          // console.log("err", err);
          window.location.replace("/login");
        }
      };
      _signIn();
    }
  }, [withLogin]);
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="Email Verify Modal"
        aria-describedby="Email Verify Modal"
        onClose={handleClose}
        className={`flex justify-center items-center ${roboto.className}`}
      >
        <div className="rounded-md w-[90%] max-w-[540px] bg-white relative text-[#5F576F] border border-white/70">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}
          >
            <CloseOutlined sx={{ fontSize: 28 }} className="text-[#454545]" />
          </div>
          <div className="p-4 pt-8 text-center">
            <h3 className="text-[#5F576F] text-center text-2xl font-semibold mb-2">
              Check your email inbox
            </h3>
            <p className="text-[#5F576F] text-sm md:text-base mb-4">
              A verification OTP was sent to
              <br />
              <span className="italic text-black"> {email}</span> email address.
              <br />
              Input the code below to proceed.
            </p>
            <div className="mb-4">
              <OTPInput
                length={6}
                onChange={handleOtpChange}
                isReset={isResenting}
                isFail={isFail}
                isSuccess={isSuccess}
              />
              {isSuccess && (
                <div className="flex justify-center items-center mt-2">
                  <Text size="md" className="text-green-500 ml-2">
                    OTP Verified, Please wait...
                  </Text>
                </div>
              )}
              {isFail && (
                <Text size="md" className="text-red-600 mt-2">
                  Incorrect OTP, please try again
                </Text>
              )}
              {otp?.length < 6 || isConfirmingOTP ? (
                <button
                  className="h-[40px] py-1 text-[#fff] rounded-[50px] w-full transition bg-[#1B82F2]/50 cursor-not-allowed mt-6"
                  disabled
                >
                  {isConfirmingOTP ? "Loading..." : "Verify"}
                </button>
              ) : (
                <button
                  onClick={handleVerify}
                  className="h-[40px] py-1 text-[#fff] rounded-[50px] cursor-pointer w-full transition bg-[#1B82F2] mt-6"
                >
                  Verify
                </button>
              )}
            </div>
            {isResenting ? (
              <button
                disabled={isResenting}
                className="underline text-blue-500 font-medium cursor-not-allowed disabled"
              >
                Resending OTP
              </button>
            ) : (
              <button
                className="underline text-blue-500 font-medium cursor-pointer"
                onClick={reSendOTP}
              >
                Resend OTP
              </button>
            )}
            {reSentFail && (
              <p className="text-red-500 text-sm md:text-base mt-4">
                Failed to resend OTP
              </p>
            )}
            {reSentSuccess && (
              <p className="text-green-500 text-sm md:text-base">
                OTP resend successfully
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default VerifyMail;
