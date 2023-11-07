import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  getAuth
} from 'firebase/auth';

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
  const [onSubmit, setOnSubmit] = useState(false);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      window.localStorage.setItem('googleIndentityAccessToken', user.accessToken);
      window.location.href = '/';
      setOnSubmit(false);
    } catch (err) {
      // console.log('Error', err);
      setIsLoginFail(true);
      setOnSubmit(false);
    }
  };

  return (
    <div className="mt-12 text-left">
      <div className='mb-4'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-1 w-full p-2 rounded-md'
        />
        {(isSubmitting && !email)?<p className='text-red-500 w-full'>Email is required</p>:(isSubmitting && !isEmailValid(email)) && <p className='text-red-500 w-full'>Email is invalid</p>}
      </div>
      <div className='mb-4'>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-1 w-full p-2 rounded-md'
        />
        {(isSubmitting && !password) && <p className='text-red-500 w-full'>Password is required</p>}
      </div>
      <button onClick={handleSignIn} className='bg-white py-3 text-black rounded-md w-full hover:bg-gray-200 transition'>{(onSubmit)?'Loading...':'Sign In'}</button>
      {(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-sm mt-4 p-2 w-full text-center'>Email Or Password is incorrect</p>}
    </div>
  );
};

export default GoogleIdentitySignIn;
