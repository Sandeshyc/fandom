import { useCallback, useState, useEffect, use } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import axios from 'axios';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as oidcApi from 'pages/api/auth/oidcApi';
import { nanoid } from 'nanoid'
import GoogleIdentitySignIn from 'components/GoogleIdentitySignIn';


import Input from '@/components/Input';

const imgOneLogin = '/images/oneloginlogo.png';

const Auth = () => {
  const router = useRouter();
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const GoogleIndentityHandler = () => {
    setIsGoogleSignIn(true);
  }
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

  function LoginPage() {
    const nonce = nanoid();
    const state = nonce+'153';
    oidcApi.beginAuth({ state, nonce });
  }
  return (
    <div className="relative h-full w-full bg-[url('/images/loginbg.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-70">
        <div className="flex justify-center align-middle h-full">
          <div className="bg-black text-center bg-opacity-70 px-16 py-16 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
            <img src="/images/logo.png" className="h-32 mx-auto" alt="Logo" />
            <button 
            className="bg-white py-3 text-black rounded-md w-full mt-10 hover:bg-gray-200 transition"
            onClick={() => LoginPage()}>
              Employee Login
              <img src={imgOneLogin} className="h-6 inline-block ml-2" alt="OneLogin" />
            </button> 
            {(isGoogleSignIn)?<GoogleIdentitySignIn />:<button 
            className="bg-white py-3 text-black rounded-md w-full mt-6 hover:bg-gray-200 transition"
            onClick={() => GoogleIndentityHandler()}>
              Ticket Login
            </button>}       
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
