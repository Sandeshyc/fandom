import React, { use, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProfile } from "@/services/api";
import useProfile from "@/hooks/useProfile";
import Navigation from "@/modules/components/Navigation";
import Header from "@/modules/elements/Header";
import Footer from "@/components/Footer";
import BottomNavigation from "@/modules/elements/Navigation/BottomNavigation";
import ProfileHead from "@/components/ProfileHead";
import ProfileName from "@/components/ProfileName";
import ProfileEmail from "@/components//ProfileEmail";
import ProfileMobile from "@/components/ProfileMobile";
import ProfileGender from "@/components/ProfileGender";
import ProfileBirthday from "@/components/ProfileBirthday";
import SkeletonMyProfile from "@/components/Skeleton/SkeletonMyProfile";
import useIsMobile from "@/hooks/useIsMobile";
import ParentalControls from "@/modules/components/ParentalControls";
import CommunicationDetails from "@/modules/components/CommunicationDetails";
import DeleteAccount from "@/modules/elements/DeleteAccount";
import { getSession } from "@/utils/cognitoAuth";
import MembershipDetails from "@/modules/components/MembershipDetails";

const bgImage = 'url("/images/new-bg.png")';

const MyProfile = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(true);
  const [userid, setUserid] = React.useState("");
  const [userIdToken, setUserIdToken] = React.useState("");
  const [isUpdateMode, setIsUpdateMode] = React.useState(false);
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+91");
  const [gender, setGender] = React.useState("");
  const [birthday, setBirthday] = React.useState<Date | null>(null);
  const [profileExpanded, setProfileExpanded] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = React.useState(false);

  const { data: profile, isLoading } = useProfile(userid);
  // console.log('profile: ', profile);

  const updateProfileHandle = (flag: boolean) => {
    setIsUpdateMode(flag);
  };
  const toggleProfile = () => {
    setProfileExpanded(!profileExpanded);
  };

  useEffect(() => {
    if (profile?.hasOwnProperty("phone")) {
      setMobile(profile?.phone);
    }
    if (profile?.hasOwnProperty("birthday")) {
      setBirthday(profile?.birthday);
    }
    if (profile?.hasOwnProperty("firstName")) {
      setName(profile?.firstName);
    }
    if (profile?.hasOwnProperty("lastName")) {
      setLastName(profile?.lastName);
    }
    if (profile?.hasOwnProperty("email")) {
      setEmail(profile?.email);
    }
    if (profile?.hasOwnProperty("gender")) {
      setGender(profile?.gender);
    }
  }, [profile]);

  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
        setEmail(userInfoObj.email);
        setUserid(userInfoObj.sub);
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
    const _getSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setIsReady(true);
        } else {
          router.replace(`/login`);
        }
      } catch (error) {
        console.error("Error:", error);
        router.replace(`/login`);
      }
    };
    _getSession();
  }, []);

  // start Formik
  const schema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string(),
    // userPhone: Yup.number().typeError("Phone number must be a number"),
    // userCountryCode: Yup.string().when('userPhone', {
    //   is: (val:string) => (val && val.length > 0 ? true : false),
    //   then: (schema) => schema.required("Country Code is required"),
    //   otherwise: (schema) => schema
    // }),
    userPhone: Yup.string(),
    userCountryCode: Yup.string(),

    userGender: Yup.string(),
    userBirthday: Yup.string() || Yup.date(),
    userEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  });
  const formiks = useFormik({
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      userEmail: profile?.email || email || "",
      userPhone: profile?.phone || "",
      userCountryCode: profile?.countryCode || "",
      userGender: profile?.gender || "",
      userBirthday: profile?.birthday || "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({
      firstName,
      lastName,
      userEmail,
      userPhone,
      userCountryCode,
      userGender,
      userBirthday,
    }) => {
      setIsUpdating(true);
      const data = {
        userId: userid,
        email: userEmail,
        firstName: firstName,
        lastName: lastName,
        gender: userGender,
        phone: userPhone,
        countryCode: userCountryCode || "+1",
        birthday: userBirthday?.split("T")[0],
      };
      const _updateProfile = async () => {
        const response = await updateProfile(data);
        // console.log('response: ', response);
        if (response?.status === "success") {
          setIsSuccess(true);
          setIsError(false);
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
          setIsUpdating(false);
        } else {
          setIsUpdating(false);
          setIsSuccess(false);
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
      };
      _updateProfile();
    },
    enableReinitialize: true,
  });
  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formiks;

  return (
    <>
      {isReady && !isLoading ? (
        <>
          <Navigation />
          <div
            className="py-16 lg:pt-28 min-h-[100vh] bg-[#FAFAFA]"
            style={{
              // backgroundImage: bgImage,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% auto",
              backgroundPosition: "right " + 30 + "%",
            }}
          >
            <form
              onSubmit={handleSubmit}
              method="POST"
              className={`px-4 md:px-12 mb-[2vw]`}
            >
              <div className="container mx-auto max-w-[996px]">
                <p className="text-[#11355E] text-xl md:text-2xl lg:text-[2rem] font-semibold  mb-6">
                  My Account
                </p>
                <div>
                  <div className={`max-w-[996px]`}>
                    {/* <h4 className="text-white text-[18px] mb-2">Profile</h4> */}
                    <div
                      className={`p-4 border border-[#C6BCC6] rounded-md bg-[#FFF] bg-opacity-[22%]`}
                    >
                      <ProfileHead
                        profileExpanded={profileExpanded}
                        toggleProfile={toggleProfile}
                      />
                      <div
                        className={`mt-8 flex flex-wrap ${
                          !profileExpanded ? "hidden" : "flex"
                        }`}
                      >
                        <div
                          className={`${
                            isUpdateMode
                              ? "md:w-[100%] lg:w-[66%]"
                              : "md:w-[33%]"
                          } w-full  md:pr-2`}
                        >
                          <ProfileName
                            isUpdateMode={isUpdateMode}
                            errors={errors}
                            touched={touched}
                            values={values}
                            handleChange={handleChange}
                          />
                        </div>
                        <div
                          className={`mb-3 ${
                            isUpdateMode
                              ? "md:w-[50%] md:pr-3 lg:w-[33%] lg:pr-0"
                              : "md:w-[66%] md:pl-2"
                          } w-full`}
                        >
                          <ProfileEmail
                            isUpdateMode={isUpdateMode}
                            errors={errors.userEmail}
                            touched={touched.userEmail}
                            values={values.userEmail}
                            handleChange={handleChange}
                          />
                        </div>
                        <div
                          className={`mb-3 ${
                            isUpdateMode
                              ? "w-[50%] pl-1 pr-2 lg:w-[33%] lg:pr-2"
                              : "w-[50%] pr-2 md:w-[33%] md:pr-4"
                          }`}
                        >
                          <ProfileGender
                            isUpdateMode={isUpdateMode}
                            errors={errors}
                            touched={touched}
                            values={values}
                            handleChange={handleChange}
                          />
                        </div>
                        <div
                          className={`mb-3 ${
                            isUpdateMode
                              ? "w-[50%] pl-1 pr-0 md:pr-2 lg:w-[33%] lg:pl-0 lg:pr-0"
                              : "w-[50%] pl-2 md:w-[33%] md:pr-4"
                          }`}
                        >
                          <ProfileBirthday
                            isUpdateMode={isUpdateMode}
                            birthday={birthday}
                            setBirthday={setBirthday}
                            errors={errors}
                            touched={touched}
                            values={values}
                            handleChange={handleChange}
                          />
                        </div>

                        <div
                          className={`mt-4 w-full flex flex-wrap ${
                            isUpdateMode ? "justify-end" : null
                          }`}
                        >
                          {isUpdateMode ? (
                            <button
                              onClick={() => updateProfileHandle(false)}
                              className="bg-transparent border border-[#1B82F2] text-[#1B82F2] w-[48%] sm:w-auto sm:min-w-[176px] px-8 py-2 rounded-[50px] "
                            >
                              Cancel
                            </button>
                          ) : null}

                          {isUpdateMode ? (
                            <>
                              <button
                                type="submit"
                                disabled={isUpdating}
                                onClick={() => handleSubmit()}
                                className={`bg-[#1B82F2] ${
                                  isUpdating ? "cursor-not-allow" : ""
                                } text-white w-[48%] ml-[2%] sl:ml-[0px] sm:w-auto sm:min-w-[176px] px-8 py-2 rounded-[50px]`}
                              >
                                {isUpdating ? "Updating..." : "Save"}
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-wrap items-center">
                              <span
                                onClick={() => updateProfileHandle(true)}
                                className={`bg-[#1B82F2] text-white cursor-pointer text-center w-full sm:w-auto sm:min-w-[176px] px-8 py-2 rounded-[50px]`}
                              >
                                Edit Profile
                              </span>
                              <div className="sm:ml-8 mt-4 sm:mt-0 w-full sm:w-auto">
                                <span
                                  onClick={() => setOpenDeleteAccount(true)}
                                  className="text-red-600 cursor-pointer"
                                >
                                  Delete My Account
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        {isSuccess ? (
                          <p className="text-green-900 w-full rounded-md text-[14px] mt-2 px-2 py-1 bg-green-100 text-center">
                            Profile updated successfully
                          </p>
                        ) : null}
                        {isError ? (
                          <p className="text-[#FF0000] text-[14px] mt-2">
                            Something went wrong
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {openDeleteAccount && (
                  <DeleteAccount
                    open={openDeleteAccount}
                    setOpen={setOpenDeleteAccount}
                  />
                )}
              </div>
            </form>
            <div className="px-4 md:px-12 mb-[2vw]">
              <div className="container mx-auto max-w-[996px]">
                <CommunicationDetails profileData={profile} />
              </div>
            </div>
            <MembershipDetails />
          </div>
          <Footer />
        </>
      ) : (
        <SkeletonMyProfile />
      )}
    </>
  );
};

export default MyProfile;
