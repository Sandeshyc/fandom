import { useCallback, useState, useEffect, use } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import axios from 'axios';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as oidcApi from 'pages/api/auth/oidcApi';
import { nanoid } from 'nanoid'


import Input from '@/components/Input';

const imgOneLogin = '/images/onelogin.png';

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   // get localStorage userInfo and set to session
//   if (session) {
//     // console.log('session: saim ', session);
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }

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
    const getAccessToken = async () => {
      const userInfo = await fetch('https://abs-cbn.onelogin.com/oidc/2/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(data => {
          console.log('user info', data);
          window.localStorage.setItem('userInfo', JSON.stringify(data)); 
          router.push('/');
          // sessionStorage.setItem("lastname", "Smith"); 
          // useSession(data); 
          // signIn('credentials', {
          //   email: data.email,
          //   subID: data.sub,
          //   redirect: false,
          //   callbackUrl: '/'
          //   });
          return data;
      })
      .catch(error => console.log('user info error', error));
    }
    if (token) {
      getAccessToken();    
    }

    // get localStorage data 
    const userInfo = localStorage.getItem('userInfo');
    console.log('userInfo: ', userInfo);
  }, []);

  function LoginPage() {
    const nonce = nanoid();
    const state = nonce+'153';
    oidcApi.beginAuth({ state, nonce });
  }
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <div className="flex justify-center align-middle h-full">
          <div className="bg-black text-center bg-opacity-70 px-16 py-16 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
            <img src="/images/logo.png" className="h-32 mx-auto" alt="Logo" />
            <button 
            className="bg-white py-3 text-black rounded-md w-full mt-10 hover:bg-gray-200 transition"
            onClick={() => LoginPage()}>
              Login with 
              <img src={imgOneLogin} className="h-6 inline-block ml-2" alt="OneLogin" />
            </button>           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
