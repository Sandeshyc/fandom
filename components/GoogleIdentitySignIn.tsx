import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  getAuth
} from 'firebase/auth';
import { EmailIcon, LockIcon, EyeSlashIcon } from "@/utils/CustomSVGs";
import {
  EyeIcon
} from '@heroicons/react/20/solid';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const GoogleIdentitySignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleSignIn = async () => {
    setIsSubmitting(true);
    if(!email || !password || !isEmailValid(email)) {
      return;
    }
    setOnSubmit(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      const user = userCredential.user;
      // console.log('Success ',user);
      const userInfo = {
        sub: user.uid,
        email: user.email,
        preferred_username: user.email,
        name: user.displayName,
        uid: user.uid,
      };    
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.localStorage.setItem('googleIndentityAccessToken', user?.accessToken);
      window.location.href = '/';
      // setOnSubmit(false);
    } catch (err) {
      // console.log('Error', err);
      setIsLoginFail(true);
      setOnSubmit(false);
    }
  };

  return (
    <div className="text-left">
      <div className='mb-4'>
        <div className="relative">
          <input 
            placeholder="Email Address"
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full text-white text-[14px] lg:text-[16px] px-2 py-1 pl-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%]'/>
          <div className="absolute top-0 left-2 flex justify-center items-center h-full">
          <EmailIcon/>
          </div>
        </div>
        {(isSubmitting && !email)?<p className='text-red-500 w-full text-xs'>Email is required</p>:(isSubmitting && !isEmailValid(email)) && <p className='text-red-500 w-full text-xs'>Incorrect Email</p>}
      </div>
      <div className='mb-4'>
        <div className="relative">
          <div className="absolute top-0 left-2 flex justify-center items-center h-full">
            <LockIcon/>
          </div>
          <input 
            type={(!isShowPassword)?'password' : 'text'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {(isSubmitting && !password) && <p className='text-red-500 w-full text-xs'>Password is required</p>}
        <div className='w-full flex justify-end text-white my-1'>
          <p className='text-white text-sm cursor-pointer hover:underline'>Forgot Password?</p>
        </div>
      </div>
      {(isEmailValid(email) && password)?<>{(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>Incorrect Email Or Password</p>}<button onClick={handleSignIn} className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#fff] rounded-[50px] w-full transition bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] hover:from-[#1D82FC] hover:to-[#1D82FC]'>{(onSubmit)?'Loading...':'Continue'}</button></>:<><button className='bg-transparent h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#F6F6F6]/50 border-2 border-[#F6F6F6]/40 rounded-[50px] w-full cursor-not-allowed' disabled>Continue</button></>}
    </div>
  );
};

export default GoogleIdentitySignIn;
