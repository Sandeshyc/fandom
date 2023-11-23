import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import useProfile from '@/hooks/useProfile';
import useUpdateProfile from '@/hooks/useupdateProfile';
import SideBar from '@/components/SideBar'
import ProfileHead from '@/components/ProfileHead'
import ProfileName from '@/components/ProfileName';
import ProfileEmail from '@/components//ProfileEmail';
import ProfileMobile from '@/components/ProfileMobile';
import ProfileGender from '@/components/ProfileGender';
import ProfileBirthday from '@/components/ProfileBirthday';
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';
import { set } from 'lodash';



const MyProfile = () => {
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(true);
  const [userid, setUserid] = React.useState('');
  const [userIdToken, setUserIdToken] = React.useState('');
  const [isUpdateMode, setIsUpdateMode] = React.useState(false);
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+91');
  const [gender, setGender] = React.useState('');
  const [birthday, setBirthday] = React.useState<Date | null>(null);
  const [profileExpanded, setProfileExpanded] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);


  const { data: profile, isLoading } = useProfile(userid);
  // console.log('profile: ', profile);

  const updateProfile = (flag:boolean) => {
    setIsUpdateMode(flag);  
  }
  const toggleProfile = () => {
    setProfileExpanded(!profileExpanded);
  }

  useEffect(() => {
    if(profile?.hasOwnProperty('phone')){
      setMobile(profile?.phone);    
    }
    if(profile?.hasOwnProperty('birthday')){
      setBirthday(profile?.birthday);    
    }
    if(profile?.hasOwnProperty('firstName')){
      setName(profile?.firstName);    
    }
    if(profile?.hasOwnProperty('lastName')){
      setLastName(profile?.lastName);    
    }
    if(profile?.hasOwnProperty('email')){
      setEmail(profile?.email);    
    }
    if(profile?.hasOwnProperty('gender')){
      setGender(profile?.gender);
    }
      
  }, [profile]);
  
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
        setEmail(userInfoObj.email);
        setUserid(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
    setIsReady(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);
  }, []);

  // start Formik
  const schema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string(),
    userPhone: Yup.string().required("Mobile is required"),
    userCountryCode: Yup.string(),
    userGender: Yup.string(),
    userBirthday: Yup.string() || Yup.date(),
    userEmail: Yup.string().email("Invalid email").required("Email is required"),
  });
  const formiks = useFormik({
    initialValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      userEmail: profile?.email || email || '',      
      userPhone: profile?.phone || '',      
      userCountryCode: '',      
      // userPhone: (profile?.phone?.length > 3)?profile?.phone?.slice(3) || '' : '',
      // userCountryCode: (profile?.phone?.length > 3)?profile?.phone?.substr(0, 3) || '' : '',    
      userGender: profile?.gender || '',
      userBirthday: profile?.birthday || '',
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
        // console.log('userPhone: ', userPhone);
      const headers = {
        'Content-Type': 'application/json',
      };      
      const data = {
        "userId":userid,
        "email":userEmail,
        "firstName":firstName,
        "lastName":lastName,
        "gender":userGender,
        "phone":userPhone,
        "birthday":userBirthday?.split('T')[0], 
      };
      // console.log('data: ', data);
      // setIsUpdating(false);
      await axios.post(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/profile`, data, { headers })
          .then(response => {
          if(response.status === 200) {
            setIsSuccess(true);
            setIsError(false);
            setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
          }
          setIsUpdating(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsUpdating(false);
          setIsSuccess(false);
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
      }); 
      
    },
    enableReinitialize: true,
  });
  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formiks;

  return (<>
      {(isReady && !isLoading)?<>
      <SideBar />
      <div className="py-16 bg-gradient-to-r from-[#210424] from-10% via-[#4B0F5A] via-30% to-[#271055] to-85% min-h-full">
        <form onSubmit={handleSubmit} method="POST"  className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="container mx-auto max-w-[996px]">
            <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-4 lg:pl-6">My Account</p>
            <div className="lg:pl-6">
              <div className={`text-white max-w-[996px]`}>
                <h4 className="text-white text-[18px] mb-2">Profile</h4>
                <div className={`p-4 border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[22%]`}>                
                  <ProfileHead
                    profileExpanded={profileExpanded}
                    toggleProfile={toggleProfile}
                  />
                  <div className={`mt-2 flex flex-wrap ${(!profileExpanded)?'hidden':'flex'}`}>
                    <div className={`${(isUpdateMode)?'md:w-[100%] lg:w-[66%]':'md:w-[33%]'} w-full  md:pr-2`}>
                      <ProfileName 
                        isUpdateMode={isUpdateMode}
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleChange={handleChange} 
                      />
                    </div>
                    <div className={`mb-3 ${(isUpdateMode)?'md:w-[50%] md:pr-3 lg:w-[33%] lg:pr-0':'md:w-[33%] md:pl-2'} w-full`}>
                      <ProfileEmail
                        isUpdateMode={isUpdateMode}
                        errors={errors.userEmail}
                        touched={touched.userEmail}
                        values={values.userEmail}
                        handleChange={handleChange}  
                      />
                    </div>
                    <div className={`mb-3 w-full ${(isUpdateMode)?'md:w-[50%] md:pr-2 md:pl-1 lg:w-[33%] lg:pr-3':'md:w-[33%] md:pr-4'}`}>
                      <ProfileMobile
                        isUpdateMode={isUpdateMode}
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleChange={handleChange} 
                      />
                    </div>
                    <div className={`mb-3 ${(isUpdateMode)?'w-[50%] pl-1 pr-2 lg:w-[33%] lg:pr-2':'w-[50%] pr-2 md:w-[33%] md:pr-4'}`}>
                      <ProfileGender
                        isUpdateMode={isUpdateMode}
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleChange={handleChange} />
                    </div>
                    <div className={`mb-3 ${(isUpdateMode)?'w-[50%] pl-1 pr-0 md:pr-2 lg:w-[33%] lg:pl-0 lg:pr-0':'w-[50%] pl-2 md:w-[33%] md:pr-4'}`}>
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
                    
                    <div className={`mt-4 w-full flex flex-wrap ${(isUpdateMode)?'justify-end':null}`}>
                      {(isUpdateMode)?<button  
                        onClick={()=>updateProfile(false)}
                        className="bg-transparent border text-white w-[48%] sm:w-auto sm:min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px] mr-[2%] sm:mr-[10px]">Cancel</button>:null}
                      
                      {(isUpdateMode)?<><button type='submit' 
                        disabled={isUpdating}
                        onClick={()=>handleSubmit()}
                        className={`bg-[#2D45F2] ${(isUpdating)?'cursor-not-allow':''} text-white w-[48%] ml-[2%] sl:ml-[0px] sm:w-auto sm:min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px]`}>{(isUpdating)?'Updaing...':'Save'}</button></>:<><span onClick={()=>updateProfile(true)}
                        className={`bg-[#2D45F2] text-white cursor-pointer w-full sm:w-auto sm:min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px]`}>Edit Profile</span></>}
                    </div>
                    {
                      (isSuccess)?<p className="text-green-900 w-full rounded-md text-[14px] mt-2 px-2 py-1 bg-green-100 text-center">Profile updated successfully</p>:null
                    }
                    {
                      (isError)?<p className="text-[#FF0000] text-[14px] mt-2">Something went wrong</p>:null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div></>:<SkeletonMyProfile/>}
  </>)
}

export default MyProfile;