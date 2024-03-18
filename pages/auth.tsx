import React, { useCallback, useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import * as oidcApi from 'pages/api/auth/oidcApi';
import { nanoid } from 'nanoid'
import GoogleIdentitySignIn from 'components/GoogleIdentitySignIn';
import useUserInfo from '@/hooks/useUserInfo';
import LoginWithIwantTFC from '@/modules/elements/LoginWithIwantTFC';
import VerifyMail from '@/modules/elements/VerifyMail';
import checkAccessToken from '@/utils/checkAccessToken';
import getConnect from '@/services/api/get_connect';
import reqRefreshToken from '@/services/api/refreshToken';
const imgOneLogin = '/images/onelogsmall.png';
const imgLogBG = '/images/loginbgnew.png';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


const Auth = () => {
  const router = useRouter();
  const {checkUser} = useUserInfo();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const [isVerifyOneLogin, setIsVerifyOneLogin] = useState(false); 
  const [tfcLoading, setTfcLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const _test = async () => {
    await onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const uid = user.uid;
        console.log('user: ', user);
      } else {
        console.log('user: ', 'user is signed out');
      }
    });
  }
  _test();

  useEffect(() => {

    let redirectUrl = '';
    // query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // console.log('urlParams', urlParams);
    if(urlParams?.get('redirectUrl')){
      redirectUrl = urlParams?.get('redirectUrl') as string;
      // console.log('redirectUrl', redirectUrl);
      localStorage.setItem('redirectUrl', redirectUrl);
    }

    const userInfo = window.localStorage.getItem('userInfo');
    console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        router.push('/');
      }else{
        // router.push('/auth');
      }
    }else{
      const urlSearchParams = new URLSearchParams(window.location.search);
      if(urlSearchParams.has('iwanttfc_access_token')){
          setTfcLoading(true);
          setAuthLoading(true);
          const params = Object.fromEntries(urlSearchParams.entries());
          const accessToken = params.iwanttfc_access_token;
          const refreshToken = params.iwanttfc_refresh_token;
          const provider = params.iwanttfc_provider;            
          const _checkAccessToken = async (accessToken:string) => {
              const decode = await checkAccessToken(accessToken);
              if(decode){
                  console.log('decode', decode);
                  const connectResponse = await getConnect(accessToken);
                  if(connectResponse.status === 'success'){
                      const userResponse = await checkUser(
                          connectResponse?.data?.user?.id,
                          'iWantTFC',
                          connectResponse?.data?.user?.contact[0]?.email || 'test@domain.com',
                          provider,
                          true,
                          '',
                          accessToken,
                      );
                      if(userResponse === 200) {
                          // setIsSuccess(true);
                          // setIsLoginFail(false);
                          router.replace('/');
                          console.log('success');
                      }else{
                          // setIsSuccess(false);
                          // setIsLoginFail(true);
                          router.replace('/auth');
                          console.log('failed');
                      }
                  }else{
                    // const data = {
                    //   "token": refreshToken
                    // };
                    // const _reqRefreshToken = async (data:any) => {
                    //   const response = await reqRefreshToken(data);
                    //   console.log('response', response);
                    // }
                    // _reqRefreshToken(data);
                      // router.push('/auth');

                      const userResponse = await checkUser(
                        connectResponse?.data?.user?.id,
                        'iWantTFC',
                        connectResponse?.data?.user?.contact[0]?.email || 'test@domain.com',
                        provider,
                        true,
                        '',
                        accessToken,
                    );
                    if(userResponse === 200) {
                        // setIsSuccess(true);
                        // setIsLoginFail(false);
                        router.replace('/');
                        console.log('success');
                    }else{
                        // setIsSuccess(false);
                        // setIsLoginFail(true);
                        router.replace('/auth');
                        console.log('failed');
                    }
                  }
              }else{
                  router.push('/auth');
              }              
          }
          _checkAccessToken(accessToken);
      }else{
        // router.push('/auth');
      }
    }
  }, []);

  useEffect(() => {
    // Parse the token from the URL.
    // console.log('window.location.hash',  window.location.hash)
    const token = new URLSearchParams(window.location.hash.substr(1)).get('access_token');
    const getAccessToken = async (token:string) => {  
      setAuthLoading(true);    
      const userInfo = await fetch(`${process.env.NEXT_PUBLIC_SSO_AUTHORITY}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(data => {
        // console.log('user info data', data);
          return data;
      })
      .catch(error => console.log('user info error', error));
      // console.log('userInfo', userInfo);
      const userResponse = await checkUser(
        userInfo?.sub,
        userInfo?.sub,
        userInfo?.email,
        'oneLogin',
        true,
        token
      );
      // console.log('userResponse', userResponse);
      if(userResponse === 200) {
        setIsSubmit(true);
        setIsSuccess(true);
        let redirectUrl = localStorage.getItem('redirectUrl');
        if(!redirectUrl){
            redirectUrl = '/';
        }
        localStorage.removeItem('redirectUrl');
        router.replace(redirectUrl);
        console.log('success');
      }else{
        setAuthLoading(false);
        setIsSubmit(true);
        setIsSuccess(false);
        router.push('/auth');
        console.log('failed');
      } 
      setIsVerifyOneLogin(false);     
    }
    if (token) {
      setIsVerifyOneLogin(true);
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
    setAuthLoading(true);
    const nonce = nanoid();
    const state = nonce+'153';
    oidcApi.beginAuth({ state, nonce });
  }
  return (
    <>
    {(authLoading)?
    <div className="w-full h-full fixed left-0 top-0 bg-black/20 z-50 cursor-wait">
    </div>:null}
    <div className="w-full p-2 fixed left-0 top-0 flex items-center z-10">
        <img src="/images/logonew.png" className="h-[60px] sm:h-[80px] lg:h-[90px] xl:h-[100px] mr-2" alt="Logo" />
        <p className='text-white font-semibold text-xl xl:text-2xl'>iWantTFC Tickets</p>
    </div>
    <div className="relative min-h-screen h-full w-full pt-[100px] xl:pt-0 bg-gradient-to-tl to-[#000000] to-[75%] from-[#4E0558] xl:flex xl:flex-wrap">      
      <div className="w-full xl:w-1/2 flex justify-center items-center">        
        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-[315px] sm:max-w-[448px] text-center self-center">
            <h1 className='text-white text-[18px] sm:text[24px] xl:text-[30px] mb-4 sm:mb-8 font-semibold'>Welcome to iWantTFC Tickets</h1>
            <GoogleIdentitySignIn setAuthLoading={setAuthLoading}/>
            <div className='my-4'>
              <p className='text-center text-white/80 text-sm'>or</p>
            </div>
            {(isSubmit && !isSuccess)?<p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>
              Opos! Something went wrong. Please try again.
              </p>:null}
            {(isSubmit && isSuccess)?<p className='text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center'>
              Success! Please wait a moment.
              </p>:null}
            <LoginWithIwantTFC isLoading={tfcLoading}/>
            <button 
            className="h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#222] rounded-[50px] w-full transition bg-[#fff] hover:bg-[#fff]/90 active:opacity-65"
            onClick={() => LoginPage()}>
              <img src={imgOneLogin} className="h-6 inline-block mr-2" alt="OneLogin" />
              <span>{(isVerifyOneLogin)?'Loading...':'Employee Login'}</span>
            </button>
            <div className='w-full flex justify-center text-white mt-4 mb-2'>
              <p className='text-sm m-0'>
                <span className='text-white/60 text-sm mr-2'>New here?</span>
                <span 
                  onClick={() => goRegistration()}
                className='text-white text-sm cursor-pointer hover:underline'>Create Account</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden xl:block xl:w-1/2'>
        <img src={imgLogBG} className="h-full w-full object-cover object-left-bottom" alt="Logo" />
      </div>
    </div>
    </>
  );
}

export default Auth;
