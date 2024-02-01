import { useCallback, useState, useEffect, use } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import axios from 'axios';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as oidcApi from 'pages/api/auth/oidcApi';
import { nanoid } from 'nanoid'
import GoogleIdentitySignUp from 'components/GoogleIdentitySignUp';

const imgOneLogin = '/images/onelogsmall.png';
const imgLogBG = '/images/registationbg.png';

const Registration = () => {
  const router = useRouter();
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        router.push('/');
      }else{
        router.push('/registration');
      }
    }else{
      router.push('/registration');
    }
  }, []);

  const goBackLogin = () => {
    router.push('/auth');
  }

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

  function LoginPage() {
    const nonce = nanoid();
    const state = nonce+'153';
    oidcApi.beginAuth({ state, nonce });
  }
  return (
    <div className="relative min-h-screen h-full w-full bg-gradient-to-tl to-[#000000] to-[75%] from-[#4E0558] xl:flex xl:flex-wrap">
      <div className='hidden xl:block xl:w-1/2'>
          <img src={imgLogBG} className="h-full w-full object-cover object-right-top" alt="all Movies" />
      </div>
      <div className="w-full p-2 fixed left-0 top-0 flex items-center xl:justify-end">
          <img src="/images/logonew.png" className="h-[60px] sm:h-[80px] lg:h-[90px] xl:h-[100px] mr-2 xl:order-[2]" alt="Logo" />
          <p className='text-white font-semibold text-xl xl:text-2xl xl:order-[3]'>iWantTFC Tickets</p>
        </div>
      <div className="w-full xl:w-1/2 h-srceen">
        
        <div className="flex flex-wrap justify-center h-full  pt-[100px] xl:pt-0">
          <div className="w-full max-w-[315px] sm:max-w-[448px] text-center self-center">
            <h1 className='text-white text-[18px] sm:text[24px] xl:text-[30px] mb-4 sm:mb-8 font-semibold'>Create an Account</h1>
            <GoogleIdentitySignUp />
            <div className='my-4'>
              <p className='text-center text-white/80 text-sm'>or</p>
            </div>
            <button 
            className="h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#222] rounded-[50px] w-full transition bg-[#fff] hover:bg-[#fff]/90 active:opacity-65"
            onClick={() => LoginPage()}>
              <img src={imgOneLogin} className="h-6 inline-block mr-2" alt="OneLogin" />
              <span>Employee Login</span>
            </button> 
            <div className='w-full flex justify-center text-white mt-4 mb-2'>
              <p className='text-sm m-0'>
                <span className='text-white/60 text-sm mr-2'>Already Have an Account?</span>
                <span 
                  onClick={() => goBackLogin()}                
                  className='text-white text-sm cursor-pointer hover:underline'>Login</span>
              </p>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
