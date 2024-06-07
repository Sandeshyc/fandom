import React, { useState, forwardRef } from "react";
import { signUp, getCurrentUser } from "@/utils/cognitoAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isDate, isEmpty } from "lodash";
import useUserInfo from "@/hooks/useUserInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff, CalendarMonth } from "@mui/icons-material";
import VerifyMail from "@/modules/elements/VerifyMail";
import { isItDate, getDayWithSuffix, showDate } from "@/utils/dataTimeChecking";

type Props = {
  setAuthLoading: any;
};

// Main Component
const CognitoSignUp = ({ setAuthLoading }: Props) => {
  const { checkUser } = useUserInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifingEmail, setIsVerifingEmail] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [birthday, setBirthday] = React.useState<Date | null>(null);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "oops! something went wrong"
  );

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
        "Password must contain at least 1 uppercase, 1 lowercase and 1 number and 1 special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords are not matched")
      .required("Confirm Password is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userBirthday: Yup.string().required("Birthday is required"),
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
      firstName: "",
      lastName: "",
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
      firstName,
      lastName,
      userBirthday,
      mobileNumber,
      tnc,
      marketing,
    }) => {
      setAuthLoading(true);
      setIsSubmitting(true);
      setOnSubmit(true);
      try {
        let response = {} as any;
        response = await signUp(email, password, []);
        console.log("Response::", response);
        if (response && response?.username && response?.userDataKey) {
          setIsVerifingEmail(true);
          setIsLoginFail(false);
          const userData = {
            userid: response?.username,
            providerId: response?.username,
            email: response?.username,
            providerName: "cognito",
            emailVerified: false,
            accessToken: "",
            isLogin: false,
            tnc: tnc,
            marketing: marketing,
            firstName: firstName,
            lastName: lastName,
            birthDate: userBirthday,
            phoneNumber: mobileNumber,
          };
          const userCheckRes = await checkUser(userData);
          if (userCheckRes === 200) {
            setIsVerifingEmail(true);
          }
        } else {
          setIsLoginFail(true);
          setOnSubmit(false);
          console.log("failed");
        }
      } catch (err: any) {
        console.log("err", err);
        setIsLoginFail(true);
        setOnSubmit(false);
        setErrorMessage(err.message);
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
        autoComplete="off"
        className="text-left max-w-[368px] mx-auto"
      >
        <div className="mb-4">
          <div className="relative">
            <input
              placeholder="Email Address"
              type="text"
              name="email"
              autoFocus={true}
              autoComplete="off"
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
              autoComplete="off"
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
                        fontSize: 18,
                        color: "#5F576F",
                        cursor: "pointer",
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
              autoComplete="off"
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
                        fontSize: 18,
                        color: "#5F576F",
                        cursor: "pointer",
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
        <div className="flex flex-wrap mx-[-5px]">
          <div className="mb-4 w-1/2 px-[5px]">
            <div className="relative">
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                autoComplete="off"
                value={values.firstName}
                onChange={handleChange}
                className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
              />
            </div>
            {errors.firstName && touched.firstName && (
              <span className="text-red-500 w-full text-xs">
                {errors.firstName}
              </span>
            )}
          </div>
          <div className="mb-4 w-1/2 px-[5px]">
            <div className="relative">
              <input
                placeholder="Last Name"
                type="text"
                autoComplete="off"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]"
              />
            </div>
            {errors.lastName && touched.lastName && (
              <span className="text-red-500 w-full text-xs">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4 customDatePicker">
          <div className="relative w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] border border-[#C1C0C0] bg-[#fff] text-left">
            <div className="w-full absolute top-0 left-0 h-full z-20">
              <DatePicker
                name="userBirthday"
                dropdownMode="select"
                maxDate={maxDate}
                minDate={minDate}
                onChange={handelDataChange}
                // onChange={(date) => setSelectedDate(date)}
                placeholderText={isEmpty(values.userBirthday) ? "Birthday" : ""}
                dateFormat="yyyy-MM-dd"
                selected={birthday}
                isClearable
                customInput={<ExampleCustomInput />}
                showYearDropdown
                showMonthDropdown
              />
            </div>
            {isEmpty(values.userBirthday) && (
              <>
                <p className="absolute top-0 left-0 text-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-1 h-[36px] xl:h-[40px] flex items-center z-10">
                  Birth Date
                </p>
                <div className="absolute top-[8px] z-10 right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
                  <CalendarMonth
                    sx={{
                      fontSize: 18,
                      color: "#5F576F",
                    }}
                  />
                </div>
              </>
            )}
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
              placeholder="Mobile No. (Optional)"
              type="text"
              name="mobileNumber"
              autoComplete="off"
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
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <input
                type="checkbox"
                className="mr-2 mt-1 cursor-pointer"
                id="agree"
                name="tnc"
                checked={values.tnc}
                onChange={handleChange}
              />
              <label htmlFor="agree" className="text-[#686868] ">
                I confirm that I have read and agree to
                <a
                  href="https://www.abs-cbn.com/terms"
                  className="underline text-[#011F4B] "
                  target="_blank"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="https://www.abs-cbn.com/privacyinternational"
                  className="underline text-[#011F4B]"
                  target="_blank"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <input
                type="checkbox"
                className="mr-2 mt-1 cursor-pointer"
                id="isMarketing"
                name="marketing"
                checked={values.marketing}
                onChange={handleChange}
              />
              <label htmlFor="isMarketing" className="text-[#686868] ">
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
              className="h-[40px] py-1 text-[#fff] font-semibold rounded-[50px] w-full transition bg-[#1B82F2]"
            >
              {onSubmit ? "Loading..." : "Create Account"}
            </button>
          </>
        ) : (
          <>
            <button
              className="h-[40px] py-1 text-[#fff] font-semibold rounded-[50px] w-full transition bg-[#1B82F2]/50 cursor-not-allowed"
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
export default CognitoSignUp;

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button
    type="button"
    className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[36px] xl:h-[40px] text-left"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));
