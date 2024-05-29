import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { initializeApp } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,  
} from 'firebase/auth';
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useRouter } from "next/router";
import useUserInfo from '@/hooks/useUserInfo';
import VerifyMail from '@/modules/elements/VerifyMail';

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
          // console.log('userCredential', userCredential);
          // return false;
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
                    redirectUrl = '/discover';
                }
                localStorage.removeItem('redirectUrl');
                router.replace(redirectUrl);
                console.log('success');
              }else{
                setAuthLoading(false);
                setIsSuccess(false);
                setIsLoginFail(true);
                router.replace('/login');
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
            className='w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-1 rounded-md h-[36px] xl:h-[40px] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]'/>
        </div>
        {(errors.userEmail && touched.userEmail)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userEmail}</p>:null}
      </div>
      <div className='mb-4'>
        <div className="relative">
          <input 
            type={(!isShowPassword)?'password' : 'text'}
            placeholder="Password"
            name='password'
            value={values.password}
            onChange={handleChange}
            className='w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-1 pr-10 rounded-md h-[36px] xl:h-[40px] bg-[#fff] focus:bg-[#fff] active:bg-[#fff]'
          />
          <div className="absolute top-[8px] right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
            {(!isShowPassword)?<><span 
              onClick={togglePassword}>
              <VisibilityOff
                sx={{
                  fontSize: 18,
                  color: '#5F576F',
                }}
              />
            </span></>:<><span
              onClick={togglePassword}>
            <Visibility
              sx={{
                fontSize: 18,
                color: '#5F576F',
              }}
            />
            </span></>}
          </div>
        </div>
        {(errors.password && touched.password)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.password}</p>:null}
        <div className='w-full flex justify-end text-[#93767A] my-1'>
            <Link 
              href='/auth/forget-password' 
              className='text-[#93767A] text-sm cursor-pointer hover:underline'>Forgot Password?</Link>
        </div>
      </div>
      {(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>{message}</p>}
      {(isSubmitting && isSuccess) && <p className='text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center'>Login Success, {(isVerifingEmail)?'please verify email':'Please wait...'}</p>}
      <button
      type="submit"
      className='h-[36px] py-2 text-[#fff] rounded-[50px] w-full transition bg-[#E79FAD] active:opacity-65'>{(onSubmit)?'Loading...':
      'Login'}</button>
    </form>
    </>
  );
};

export default GoogleIdentitySignIn;
