import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as Yup from "yup";
import useProfile from '@/hooks/useProfile';
import SideBar from '@/components/SideBar'
import ProfileHead from '@/components/ProfileHead'
import ProfileName from '@/components/ProfileName';
import ProfileEmail from '@/components//ProfileEmail';
import ProfileMobile from '@/components/ProfileMobile';
import ProfileGender from '@/components/ProfileGender';
import ProfileBirthday from '@/components/ProfileBirthday';
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';



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

  const { data: profile, isLoading } = useProfile(userid);
  // console.log('profile: ', profile);

  const updateProfile = () => {
    setIsUpdateMode(!isUpdateMode);  
  }
  const toggleProfile = () => {
    setProfileExpanded(!profileExpanded);
  }

  const saveUpdateProfile = () => {
    console.log(
      'name: ', name,
      'lastName: ', lastName,
      'email: ', email,
      'mobile: ', mobile,
      'gender:', gender,
      'birthday: ', birthday,      
    )
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
    userCountryCode: Yup.string().required("Country Code is required"),
    userGender: Yup.string(),
    userBirthday: Yup.date(),
    userEmail: Yup.string().email("Invalid email").required("Email is required"),
  });
  const formiks = useFormik({
    initialValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      userEmail: profile?.email || '',
      userPhone: profile?.phone || '', 
      userCountryCode: profile?.countryCode || '',     
      userGender: profile?.gender || '',
      userBirthday: profile?.birthday || '',
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: ({
        firstName, 
        lastName,
        userEmail,
        userPhone,
        userCountryCode,
        userGender,
        userBirthday,
      }) => {
      // Make a request to your backend to store the data
      console.log('formik clicked');
      console.log('fname: ', firstName);
      console.log('lastName: ', lastName);
      console.log('userEmail: ', userEmail);
      console.log('userPhone: ', userPhone);
      console.log('userCountryCode: ', userCountryCode);
      console.log('userGender: ', userGender);
      console.log('userBirthday: ', userBirthday);
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
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">My Account</p>
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
                        />
                    </div>
                    <div className={`mt-4 w-full flex flex-wrap ${(isUpdateMode)?'justify-end':null}`}>
                      {(isUpdateMode)?<button  
                        onClick={updateProfile}
                        className="bg-transparent border text-white w-[48%] sm:w-auto sm:min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px] mr-[2%] sm:mr-[10px]">Cancel</button>:null}
                      
                      {(isUpdateMode)?<><button type='submit' 
                        onClick={()=>handleSubmit()}
                        className={`bg-[#2D45F2] text-white w-[48%] ml-[2%] sl:ml-[0px] sm:w-auto sm:min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px]`}>Save</button></>:<><button onClick={updateProfile} 
                        className={`bg-[#2D45F2] text-white w-full sm:w-auto sm:min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px]`}>Edit Profile</button></>}
                      <button 
                        type='submit'>send</button>
                    </div>
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