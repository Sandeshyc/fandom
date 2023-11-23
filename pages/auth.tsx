import { useCallback, useState, useEffect, use } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import axios from 'axios';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as oidcApi from 'pages/api/auth/oidcApi';
import { nanoid } from 'nanoid'
import GoogleIdentitySignIn from 'components/GoogleIdentitySignIn';

import OpuAccrodion from 'components/TestAccroding';

const imgOneLogin = '/images/onelogsmall.png';
const imgLogBG = '/images/loginbgnew.png';

const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        router.push('/');
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);

  useEffect(() => {
    // Parse the token from the URL.
    console.log('window.location.hash',  window.location.hash)
    const token = new URLSearchParams(window.location.hash.substr(1)).get('access_token');
    const getAccessToken = async (token:string) => {
      const userInfo = await fetch(`${process.env.NEXT_PUBLIC_SSO_AUTHORITY}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(data => {
          window.localStorage.setItem('oneLogInAccessToken', token);
          window.localStorage.setItem('userInfo', JSON.stringify(data)); 
          router.push('/');
          return data;
      })
      .catch(error => console.log('user info error', error));
    }
    if (token) {
      getAccessToken(token);    
    }

    // get localStorage data 
    const userInfo = localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
  }, []);
  const goRegistration = () => {
    router.push('/registration');
  }
  const goForgetPassword = () => {
    router.push('/auth/forget-password');
  }
  function LoginPage() {
    const nonce = nanoid();
    const state = nonce+'153';
    oidcApi.beginAuth({ state, nonce });
  }
  return (
    <div className="relative h-full w-full bg-gradient-to-tl to-[#000000] to-[75%] from-[#4E0558] xl:flex xl:flex-wrap">
      
      <div className="w-full xl:w-1/2 h-full ">
        <div className="w-full p-2 fixed left-0 top-0 flex items-center">
          <img src="/images/logonew.png" className="h-[60px] sm:h-[80px] lg:h-[90px] xl:h-[100px] mr-2" alt="Logo" />
          <p className='text-white font-semibold text-xl xl:text-2xl'>iWantTFC Tickets</p>
        </div>
        <div className="flex flex-wrap justify-center h-full">
          <div className="w-full max-w-[315px] sm:max-w-[448px] text-center self-center">
            <h1 className='text-white text-[18px] sm:text[24px] xl:text-[30px] mb-4 sm:mb-8 font-semibold'>Welcome to iWantTFC Tickets</h1>
            <GoogleIdentitySignIn />
            <div className='my-4'>
              <p className='text-center text-white/80 text-sm'>or</p>
            </div>
            <button 
            className="h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#222] rounded-[50px] w-full transition bg-[#fff] hover:bg-[#fff]/90"
            onClick={() => LoginPage()}>
              <img src={imgOneLogin} className="h-6 inline-block mr-2" alt="OneLogin" />
              <span>Employee Login</span>
            </button> 
            <div className='w-full flex justify-center text-white mt-4 mb-2'>
              <p className='text-sm m-0'>
                <span className='text-white/60 text-sm mr-2'>New here?</span>
                <span 
                  onClick={() => goRegistration()}
                className='text-white text-sm cursor-pointer hover:underline'>Create Account</span>
              </p>
            </div> 
            {/* <div className='w-full flex justify-center text-white mt-4 mb-2'>
              <p className='text-sm m-0'>
                <span className='text-white text-sm cursor-pointer hover:underline'>Skip Login for Now</span>
              </p>
            </div>  */}
            {/* <div className='w-full flex justify-center text-white mt-4 mb-2'>
              <p className='text-[10px] lg:text-[12px] m-0 text-white/60'>
                This page is <span className='text-white/80'>protected by Google reCAPTCHA</span> to ensure you're not a bot. Learn More
              </p>
            </div>  */}
          </div>
        </div>
      </div>
      <div className='hidden xl:block xl:w-1/2 h-full'>
            <img src={imgLogBG} className="h-full w-full object-cover object-left-bottom" alt="Logo" />
      </div>
    </div>
  );
}

export default Auth;
