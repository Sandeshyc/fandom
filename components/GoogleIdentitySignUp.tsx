import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/router';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  getAuth, 
  signInWithEmailLink,
  signOut,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  OAuthProvider,
  UserCredential,
  signInWithRedirect,
  getRedirectResult,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  reauthenticateWithRedirect,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
  checkActionCode,
  verifyPasswordResetCode,
  User,
  browserLocalPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence,
  inMemoryPersistence,
  setPersistence,

} from 'firebase/auth';

import { useFormik } from "formik";
import * as Yup from "yup";
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
// const auth = getAuth(app);

const GoogleIdentitySignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Email or Password is incorrect');
  const router = useRouter();
  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords are not matched').required('Confirm Password is required'),
  });


  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  }
  const toggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  }  

  const handleSignUp = async () => {
    setIsSubmitting(true);
    if(!email || !password || !isEmailValid(email)) {
      return;
    }
    setOnSubmit(true);
    // try {
    //   const userCredential = await signInWithEmailAndPassword(
    //     getAuth(),
    //     email,
    //     password
    //   );
    //   const user = userCredential.user;
    //   // console.log('Success ',user);
    //   const userInfo = {
    //     sub: user.uid,
    //     email: user.email,
    //     preferred_username: user.email,
    //     name: user.displayName,
    //     uid: user.uid,
    //   };    
    //   window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    //   window.localStorage.setItem('googleIndentityAccessToken', user?.accessToken);
    //   window.location.href = '/';
    //   // setOnSubmit(false);
    // } catch (err) {
    //   // console.log('Error', err);
    //   setIsLoginFail(true);
    //   setOnSubmit(false);
    // }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[!@#$%^&*]+/)) {
      strength += 1;
    }
    return strength;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ email, password, confirmPassword }) => {
      // Make a request to your backend to store the data
      setIsSubmitting(true);
      setOnSubmit(true);
      
      // await sendEmailVerification(auth.currentUser, {
      //   url: 'http://localhost:3000/',
      //   handleCodeInApp: true,
      // });
      // await sendPasswordResetEmail(getAuth(), email, {
      //   url: 'http://localhost:3000/',
      //   handleCodeInApp: true,
      // })
      // .then(() => {
      //   // Password reset email sent!
      //   // ..
      //   console.log('Password reset email sent!');
      // })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   console.log('errorCode ', errorCode);
      //   console.log('errorMessage ', errorMessage);
      // });


      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      )
      .then((userCredential) => {
        // Signed up 
      const user = userCredential.user;
        // is created user 
        console.log('user ', user);
        if(user) {
          const userInfo = {
            sub: user.uid,
            email: user.email,
            preferred_username: user.email,
            name: user.displayName,
            uid: user.uid,
          };
          window.localStorage.setItem('provider', 'firebaseEmailPassword');
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
          window.localStorage.setItem('googleIndentityAccessToken', user?.accessToken);
          router.push('/auth/verify-email');
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/email-already-in-use') {
          setErrorMessage('Email already in use');
        }
        if(errorCode === 'auth/invalid-email') {
          setErrorMessage('Invalid email');
        }
        if(errorCode === 'auth/weak-password') {
          setErrorMessage('Weak password');
        }
        if(errorCode === 'auth/operation-not-allowed') {
          setErrorMessage('Operation not allowed');
        }
        // console.log('errorCode ', errorCode);
        // console.log('errorMessage ', errorMessage);
        setIsLoginFail(true);
        setOnSubmit(false);
      });


    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;



  return (
    <form onSubmit={handleSubmit} method="POST" className="text-left">
      <div className='mb-4'>
        <div className="relative">
          <input
            placeholder="Email Address"
            type="text"
            name='email'
            value={values.email}
            onChange={handleChange}
            className='w-full text-white text-[14px] lg:text-[16px] px-2 py-1 pl-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%]'/>
          <div className="absolute top-0 left-2 flex justify-center items-center h-full">
          <EmailIcon/>
          </div>
        </div>
        {errors.email && touched.email && <span className='text-red-500 w-full text-xs'>{errors.email}</span>}
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
        {errors.password && touched.password && <span className='text-red-500 w-full text-xs'>{errors.password}</span>}
      </div>
      <div className='mb-4'>
        <div className="relative">
          <div className="absolute top-0 left-2 flex justify-center items-center h-full">
            <LockIcon/>
          </div>
          <input 
            type={(!isShowConfirmPassword)?'password' : 'text'}
            placeholder="Confirm Password"
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            className='w-full text-white text-[14px] lg:text-[16px] py-1 px-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%]'
          />
          <div className="absolute top-[8px] sm:top-[11px] xl:top-[14px] right-0 px-2 flex justify-center items-center h-[24px] border-l border-[#5F576F] text-[10px]">
            {(!isShowConfirmPassword)?<><span 
              onClick={toggleConfirmPassword}>
              <EyeSlashIcon/>
            </span></>:<><span
              onClick={toggleConfirmPassword}>
            <EyeIcon 
              className='text-[#fff] w-4 h-4 text-[14px]'/>
            </span></>}
          </div>
        </div>
        {errors.confirmPassword && touched.confirmPassword && <span className='text-red-500 w-full text-xs'>{errors.confirmPassword}</span>}
      </div>
      <div className='mb-4 px-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-start'>
            <input type="checkbox" className='mr-2 w-6 h-6 mt-1' id='agree'
              name='agree'
              checked={isAgree}
              onChange={(e) => setIsAgree(e.target.checked)}
            />
            <label htmlFor="agree" className='text-white/90 text-[14px]'>By clicking on this you agree to the <span className='font-semibold hover:underline cursor-pointer'>Terms and Condition and Privacy Policy</span></label>
          </div>
        </div>
      </div>
      {(isAgree)?<>{(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>{errorMessage}</p>}<button type='submit' className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#fff] rounded-[50px] w-full transition bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] hover:from-[#1D82FC] hover:to-[#1D82FC]'>{(onSubmit)?'Loading...':'Continue'}</button></>:<><button className='bg-transparent h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#F6F6F6]/50 border-2 border-[#F6F6F6]/40 rounded-[50px] w-full cursor-not-allowed' disabled>Continue</button></>}
    </form>
  );
};

export default GoogleIdentitySignUp;
