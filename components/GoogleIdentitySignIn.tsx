import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  getAuth
} from 'firebase/auth';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { EmailIcon, LockIcon, EyeSlashIcon } from "@/utils/CustomSVGs";
import {
  EyeIcon
} from '@heroicons/react/20/solid';
import { useRouter } from "next/router";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);



const GoogleIdentitySignIn = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);

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
        setIsSubmitting(true);
        setOnSubmit(true);
        try {
          const userCredential = await signInWithEmailAndPassword(
            getAuth(),
            userEmail,
            password
          );
          const user = userCredential.user;
          if(user !== null && user !== undefined) {
            const headers = {
              'Content-Type' : 'application/json',
            };     
            const data = {
              "providerId": user?.uid || '',
              "email": user?.email || '',
              "providerName": user?.providerId || '',
            };
            await axios.post(`http://192.168.68.108:9000/user/info`, data, { headers })
            .then(response => {
              // console.log('response', response);
              if(response.data?.status === 200 || response.data?.status === 201) {
                const userInfoData = response.data?.data;
                const userInfo = {
                  sub: userInfoData?.userId,
                  email: userInfoData?.email,
                  uid: userInfoData?.userId,
                  providerName: userInfoData?.providerName,
                  emailVerified: user?.emailVerified,
                }
                window.localStorage.setItem('provider', 'firebase');
                window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.localStorage.setItem('googleIndentityAccessToken', 'testData'); // Need to Update
                window.location.replace('/');
              }else{
                console.log('error', response.data?.message);
                return response.data?.message;
              }
            })
            .catch(error => {
              console.log('error', error);
              return error;
            });
          }
          setOnSubmit(false);
        } catch (err) {
          console.log('Error', err);
          setIsLoginFail(true);
          setOnSubmit(false);
        }
      
    },
    enableReinitialize: true,
  });
  const { errors, touched, values, handleChange, handleSubmit } = formiks;

  return (
    <form onSubmit={handleSubmit} method="POST" className="text-left">
      <div className='mb-4'>
        <div className="relative">
          <input 
            placeholder="Email Address"
            type="text" 
            name='userEmail'
            value={values.userEmail}
            onChange={handleChange}
            className='w-full text-white text-[14px] lg:text-[16px] px-2 py-1 pl-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%]'/>
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
            className='w-full text-white text-[14px] lg:text-[16px] py-1 px-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%]'
          />
          <div className="absolute top-[8px] sm:top-[11px] xl:top-[14px] right-0 px-2 flex justify-center items-center h-[24px] border-l border-[#5F576F] text-[10px]">
            {(!isShowPassword)?<><span 
              onClick={togglePassword}>
              <EyeSlashIcon/>
            </span></>:<><span
              onClick={togglePassword}>
            <EyeIcon 
              className='text-[#fff] w-4 h-4 text-[14px]'/>
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
      {(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>Incorrect Email Or Password</p>}      
      <button
      type="submit"
      className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#fff] rounded-[50px] w-full transition bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] hover:from-[#1D82FC] hover:to-[#1D82FC]'>{(onSubmit)?'Loading...':
      'Continue'}</button>
    </form>
  );
};

export default GoogleIdentitySignIn;
