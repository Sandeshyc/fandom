import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  getAuth,
  sendEmailVerification,  
} from 'firebase/auth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmailIcon, LockIcon} from "@/utils/CustomSVGs";
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useRouter } from "next/router";
import useUserInfo from '@/hooks/useUserInfo';
import VerifyMail from '@/modules/elements/VerifyMail';
import { set } from 'lodash';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

type Props = {
  setAuthLoading: any;
}

const GoogleIdentitySignIn = ({setAuthLoading}:Props) => {
  const router = useRouter();
  const {checkUser} = useUserInfo();
  const [message, setMessage] = useState('Incorrect Email Or Password');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);  
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [isVerifingEmail, setIsVerifingEmail] = useState(false);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  }
  const goForgetPassword = () => {
    router.push('/auth/forget-password');
  }

  // start Formik
  const schema = Yup.object().shape({
    userEmail: Yup.string().email("Invalid email").required("Email is required"),   
    password: Yup.string().required("Password is required"),
  });
  const formiks = useFormik({
    initialValues: {
      userEmail: '',
      password: '',
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({
      userEmail, 
      password,
      }) => {
        setAuthLoading(true);
        setIsSubmitting(true);
        setOnSubmit(true);
        try {
          const userCredential = await signInWithEmailAndPassword(
            getAuth(),
            userEmail,
            password
          );
          const user = userCredential?.user as any;
          console.log('user', user);
          if(user !== null && user !== undefined) {
            const isEmailVerified = user?.emailVerified;
            if(isEmailVerified){ 
              const userResponse = await checkUser(
                user?.uid,
                user?.uid,
                user?.email || '',
                user?.providerId,
                user?.emailVerified, 
                '',
                user?.accessToken || '',
              );
              if(userResponse === 200) {
                setIsSuccess(true);
                setIsLoginFail(false);
                let redirectUrl = localStorage.getItem('redirectUrl');
                if(!redirectUrl){
                    redirectUrl = '/';
                }
                localStorage.removeItem('redirectUrl');
                router.replace(redirectUrl);
                console.log('success');
              }else{
                setAuthLoading(false);
                setIsSuccess(false);
                setIsLoginFail(true);
                router.replace('/auth');
                console.log('failed');
              }
            }else{
              setIsSuccess(true);
              setIsLoginFail(false);
              setIsVerifingEmail(true);
              const actionCodeSettings = {
                url: `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/auth/reset-password?email=${user?.email}`,
                handleCodeInApp: true,
              };
              await sendEmailVerification(user);
            }         
          }
          setOnSubmit(false);
        } catch (err:any) {
          console.log('Error', err);
          setIsLoginFail(true);
          setAuthLoading(false);
          setIsSuccess(false);
          setOnSubmit(false);
          switch (err.code) {
            case 'auth/invalid-email':
              setMessage('Invalid Email');
              break;
            case 'auth/user-disabled':
              setMessage('This User Is Disabled');
              break;
            case 'auth/user-not-found':
              setMessage('This Email Is Not Registered');
              break;
            case 'auth/too-many-requests':
              setMessage('Too Many Requests, Please Try Again Later');
              break;
            default:
              setMessage('Incorrect Email Or Password');
              break;
          }       
        }      
    },
    enableReinitialize: true,
  });
  const { errors, touched, values, handleChange, handleSubmit } = formiks;

  // useEffect(() => {
  //   let redirectUrl = localStorage.getItem('redirectUrl');
  //   console.log('redirectUrl', redirectUrl);
  // },[]);

  return (
    <>
    {(isVerifingEmail)?<VerifyMail
    email={values.userEmail}
    />:null}    
    <form onSubmit={handleSubmit} method="POST" className="text-left">
      <div className='mb-4'>
        <div className="relative">
          <input 
            placeholder="Email Address"
            type="email" 
            name='userEmail'
            autoFocus={true}
            value={values.userEmail}
            onChange={handleChange}
            className='w-full text-white text-[14px] lg:text-[16px] px-2 py-1 pl-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%] focus:bg-transparent active:bg-transparent'/>
          <div className="absolute top-0 left-2 flex justify-center items-center h-full">
          <EmailIcon/>
          </div>
        </div>
        {(errors.userEmail && touched.userEmail)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userEmail}</p>:null}
      </div>
      <div className='mb-4'>
        <div className="relative">
          <div className="absolute top-0 left-2 flex justify-center items-center h-full">
            <LockIcon/>
          </div>
          <input 
            type={(!isShowPassword)?'password' : 'text'}
            placeholder="Password"
            name='password'
            value={values.password}
            onChange={handleChange}
            className='w-full text-white text-[14px] lg:text-[16px] py-1 px-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%] focus:bg-transparent active:bg-transparent'
          />
          <div className="absolute top-[8px] sm:top-[11px] xl:top-[14px] right-0 px-2 flex justify-center items-center h-[24px] border-l border-[#5F576F] text-[10px]">
            {(!isShowPassword)?<><span 
              onClick={togglePassword}>
              <VisibilityOff
                sx={{
                  fontSize: 18,
                  color: '#fff',
                }}
              />
            </span></>:<><span
              onClick={togglePassword}>
            <Visibility
              sx={{
                fontSize: 18,
                color: '#fff',
              }}
            />
            </span></>}
          </div>
        </div>
        {(errors.password && touched.password)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.password}</p>:null}
        <div className='w-full flex justify-end text-white my-1'>
          <p className='text-white text-sm cursor-pointer hover:underline'>
            <span
            onClick={() => goForgetPassword()}>
              Forgot Password?
            </span>
          </p>
        </div>
      </div>
      {(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>{message}</p>}
      {(isSubmitting && isSuccess) && <p className='text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center'>Login Success, {(isVerifingEmail)?'please verify email':'Please wait...'}</p>}
      <button
      type="submit"
      className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#fff] rounded-[50px] w-full transition bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] hover:from-[#1D82FC] hover:to-[#1D82FC] active:opacity-65'>{(onSubmit)?'Loading...':
      'Continue'}</button>
    </form>
    </>
  );
};

export default GoogleIdentitySignIn;
