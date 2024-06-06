import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@/utils/CustomSVGs";
import { isDate, isEmpty } from "lodash";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import useUserInfo from "@/hooks/useUserInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff, CalendarMonth } from "@mui/icons-material";
import VerifyMail from "@/modules/elements/VerifyMail";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
type Props = {
  setAuthLoading: any;
};
const GoogleIdentitySignUp = ({ setAuthLoading }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [birthday, setBirthday] = React.useState<Date | null>(null);
  const [isAgree, setIsAgree] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "oops! something went wrong"
  );
  const [isVerifingEmail, setIsVerifingEmail] = useState(false);
  const router = useRouter();
  const { checkUser } = useUserInfo();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 13);
  // set min date is today - 100 years
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const birthday2 = new Date(maxDate);
  let setSelectDate = new Date();
  if (birthday2 && isItDate(birthday2)) {
    setSelectDate = birthday2;
  }
  const handelDataChange = (date: Date) => {
    setBirthday(date);
    setSelectDate = date;
    // set select date to values.userBirthday
    // newDate format is YYYY-MM-DD
    let newDate = "";
    if (date) {
      newDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    handleChange({
      target: {
        name: "userBirthday",
        value: newDate || "",
      },
    });
  };
  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\\.,><':;|_~=`=+-])[A-Za-z0-9!@#$%^&*()[\]{}\\.,><':;|_~=`=+-]{8,}$/,
        "Password must contain at least 1 uppercase, 1 lowercase and 1 number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords are not matched")
      .required("Confirm Password is required"),
    fullName: Yup.string().required("Full Name is required"),
    userBirthday: Yup.date().required("Birthday is required"),
    mobileNumber: Yup.string(),
    tnc: Yup.boolean().oneOf([true], "Accept Terms & Conditions is required"),
    marketing: Yup.boolean(),
  });

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const toggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      userBirthday: "",
      mobileNumber: "",
      tnc: false,
      marketing: false,
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({
      email,
      password,
      confirmPassword,
      fullName,
      userBirthday,
      mobileNumber,
      tnc,
      marketing,
    }) => {
      // console.log('userBirthday', userBirthday);
      // return false;
      // Make a request to your backend to store the data
      setAuthLoading(true);
      setIsSubmitting(true);
      setOnSubmit(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        const user = userCredential.user;
        // console.log('user ', user);
        if (user !== null && user !== undefined) {
          const userData = {
            userid: user?.uid,
            providerId: user?.uid,
            email: user?.email || "",
            providerName: user?.providerId,
            emailVerified: user?.emailVerified,
            accessToken: 'testData',
            isLogin: false,
            tnc: tnc,
            marketing: marketing,
            firstName: fullName,
            lastName: '',
            birthDate: userBirthday,
            phoneNumber: mobileNumber,
          };
          await checkUser(userData);     
          // return false;      
          const isEmailVerified = user?.emailVerified;
          if (isEmailVerified) {
            const userInfo = {
              sub: user?.uid,
              email: user?.email,
              uid: user?.uid,
              providerName: user?.providerId,
              emailVerified: user?.emailVerified,
            };
            window.localStorage.setItem("provider", user?.providerId);
            window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.localStorage.setItem(
              "googleIndentityAccessToken",
              "testData"
            ); // Need to Update
            router.replace("/");
          } else {
            setIsLoginFail(false);
            setIsVerifingEmail(true);
            await sendEmailVerification(user);
          }
        } else {
          setIsLoginFail(true);
          setOnSubmit(false);
          console.log("failed");
        }
      } catch (err: any) {
        setIsLoginFail(true);
        setOnSubmit(false);
        if (err.code === "auth/email-already-in-use") {
          setErrorMessage("Email address already exists.");
        }
        if (err.code === "auth/invalid-email") {
          setErrorMessage("Invalid email");
        }
        if (err.code === "auth/weak-password") {
          setErrorMessage("Weak password");
        }
        if (err.code === "auth/operation-not-allowed") {
          setErrorMessage("Operation not allowed");
        }
        if (err.code === "auth/unknown") {
          setErrorMessage("Unknown error");
        }
      }
      setAuthLoading(false);
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      {isVerifingEmail ? <VerifyMail email={values.email} /> : null}
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="text-left max-w-[368px] mx-auto"
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
            <span className="text-red-500 w-full text-xs">{errors.email}</span>
          )}
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type={!isShowPassword ? "password" : "text"}
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
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
              className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
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
        <div className="mb-4">
          <div className="relative">
            <input
              placeholder="Full Name"
              type="text"
              name="fullName"
              autoFocus={true}
              value={values.fullName}
              onChange={handleChange}
              className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
            />
          </div>
          {errors.fullName && touched.fullName && (
            <span className="text-red-500 w-full text-xs">
              {errors.fullName}
            </span>
          )}
        </div>
        <div className="mb-4 w-full fullWidthDatePicker">
          <div className="relative w-full bg-[#fff] rounded-md">
            <DatePicker
              name="userBirthday"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={maxDate}
              minDate={minDate}
              selected={setSelectDate}
              onChange={handelDataChange}
              placeholderText={isEmpty(values.userBirthday) ? "Birthday" : ""}
              className="w-full text-[14px] placeholder-[#C1C0C0] lg:text-[16px] px-4 py-1  h-[36px] xl:h-[40px] bg-traparent border border-[#C1C0C0] rounded-lg focus:bg-[#fff] active:bg-[#fff] relative z-20"
            />
            <p
              className={`absolute top-0 left-0 ${
                values.userBirthday && isDate(birthday)
                  ? "text-[#5F576F]"
                  : "text-[#C1C0C0]"
              } text-[14px] lg:text-[16px] px-4 py-1 h-[36px] xl:h-[40px] flex items-center`}
            >
              {values.userBirthday && isDate(birthday)
                ? `${getDayWithSuffix(
                    birthday.getDate()
                  )} ${birthday.toLocaleString("default", {
                    month: "long",
                  })} ${birthday.getFullYear()}`
                : "Birth Date"}
            </p>
            <div className="absolute top-[8px] z-10 right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
              <span>
                <CalendarMonth
                  sx={{
                    fontSize: 18,
                    color: "#5F576F",
                  }}
                />
              </span>
            </div>
          </div>
          {errors.userBirthday && touched.userBirthday && (
            <p className="text-[#FF3636] text-[14px] py-1">
              {errors.userBirthday}
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              placeholder="Mobile Number (Optional)"
              type="text"
              name="mobileNumber"
              autoFocus={true}
              value={values.mobileNumber}
              onChange={handleChange}
              className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
            />
          </div>
          {errors.mobileNumber && touched.mobileNumber && (
            <span className="text-red-500 w-full text-xs">
              {errors.mobileNumber}
            </span>
          )}
        </div>
        <div className="hidden sm:flex mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <input
                type="checkbox"
                className="mr-2  mt-1"
                id="agree"
                name="tnc"
                checked={values.tnc}
                onChange={handleChange}
              />
              <label htmlFor="agree" className="text-[#93767A] ">
                I confirm that I have read and agree to{" "}
                <a
                  href="/terms-condition"
                  className="underline text-[#011F4B]"
                  target="_blank"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="underline text-[#011F4B]"
                  target="_blank"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <input
                type="checkbox"
                className="mr-2 mt-1"
                id="isMarketing"
                name="marketing"
                checked={values.marketing}
                onChange={handleChange}
              />
              <label htmlFor="isMarketing" className="text-[#93767A] ">
                I agree to receive marketing communications.
              </label>
            </div>
          </div>
        </div>
        {isSubmitting && isLoginFail && (
          <p className="text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center">
            {errorMessage}
          </p>
        )}
        {isSubmitting && !isLoginFail && isVerifingEmail && (
          <p className="text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center">
            Registration Successfully, Please verify email
          </p>
        )}
        {values.tnc ? (
          <>
            <button
              type="submit"
              className="py-2 text-[#fff] rounded-full font-medium w-full transition bg-[#1B82F2]"
            >
              {onSubmit ? "Loading..." : "Continue"}
            </button>
          </>
        ) : (
          <>
            <button
              className="py-2 text-[#fff] rounded-full font-medium w-full transition bg-[#1B82F2] cursor-not-allowed"
              disabled
            >
              Create Account
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default GoogleIdentitySignUp;

const isItDate = (date: any) => {
  return date instanceof Date && !isNaN(date.valueOf());
};

function getDayWithSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}
