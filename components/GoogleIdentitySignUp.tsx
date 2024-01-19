import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  getAuth, 
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import useUserInfo from '@/hooks/useUserInfo';
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmailIcon, LockIcon, EyeSlashIcon } from "@/utils/CustomSVGs";
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import VerifyMail from '@/modules/elements/VerifyMail';

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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('oops! something went wrong');
  const [isVerifingEmail, setIsVerifingEmail] = useState(false);
  const router = useRouter();
  const {checkUser} = useUserInfo();
  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Password must contain at least 1 uppercase, 1 lowercase and 1 number'
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), ''], 
      'Passwords are not matched'
    ).required('Confirm Password is required'),
    tnc: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required'),
    marketing: Yup.boolean(),
  });

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  }
  const toggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      tnc: false,
      marketing: false,
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ email, password, confirmPassword, tnc, marketing }) => {
      // Make a request to your backend to store the data
      setIsSubmitting(true);
      setOnSubmit(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        const user = userCredential.user;
        // console.log('user ', user);
        if(user !== null && user !== undefined) {
          await checkUser(
            user?.uid,
            user?.uid,
            user?.email || '',
            user?.providerId,
            user?.emailVerified,
            '',
            'testData',
            false,
            tnc,
            marketing
          );           
          const isEmailVerified = user?.emailVerified;
          if(isEmailVerified){ 
            const userInfo = {
              sub: user?.uid,
              email: user?.email,
              uid: user?.uid,
              providerName: user?.providerId,
              emailVerified: user?.emailVerified,
            }
            window.localStorage.setItem('provider', user?.providerId);
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
            window.localStorage.setItem('googleIndentityAccessToken', 'testData');// Need to Update            
            router.replace('/');
          }else{
            setIsLoginFail(false);
            setIsVerifingEmail(true);
            await sendEmailVerification(user);
          }       
        }else{
          setIsLoginFail(true);
          setOnSubmit(false);
          console.log('failed');
        }
      } catch (err: any) {
        setIsLoginFail(true);
        setOnSubmit(false);
        if(err.code === 'auth/email-already-in-use') {
          setErrorMessage('Email address already exists.');
        }
        if(err.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email');
        }
        if(err.code === 'auth/weak-password') {
          setErrorMessage('Weak password');
        }
        if(err.code === 'auth/operation-not-allowed') {
          setErrorMessage('Operation not allowed');
        }
        if(err.code === 'auth/unknown') {
          setErrorMessage('Unknown error');
        }
      }
    },
    
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
    {(isVerifingEmail)?<VerifyMail
    email={values.email}
    />:null}
    <form onSubmit={handleSubmit} method="POST" className="text-left">
      <div className='mb-4'>
        <div className="relative">
          <input
            placeholder="Email Address"
            type="text"
            name='email'
            autoFocus={true}
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
              <VisibilityOff
                sx={{
                  fontSize: 18,
                  color: '#fff',
                }}
              />
            </span></>:<><span
              onClick={togglePassword}>
            <Visibility
              sx={{
                fontSize: 18,
                color: '#fff',
              }}
            />
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
              <VisibilityOff
                sx={{
                  fontSize: 18,
                  color: '#fff',
                }}
              />
            </span></>:<><span
              onClick={toggleConfirmPassword}>
            <Visibility
              sx={{
                fontSize: 18,
                color: '#fff',
              }}
            />
            </span></>}
          </div>
        </div>
        {errors.confirmPassword && touched.confirmPassword && <span className='text-red-500 w-full text-xs'>{errors.confirmPassword}</span>}
      </div>
      <div className='mb-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-start'>
            <input type="checkbox" className='mr-2 w-6 h-6 mt-1'
              id='agree'
              name='tnc'
              checked={values.tnc}
              onChange={handleChange}
            />
            <label htmlFor="agree" className='text-white/90 text-[14px]'>By clicking on this you agree to the <a href='/terms-condition' className='underline' target='_blank'>Terms and Condition</a> and <a href='/privacy' className='underline' target='_blank'>Privacy Policy</a>
            </label>
          </div>
        </div>
      </div>
      <div className='mb-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-start'>
            <input type="checkbox" className='mr-2 w-6 h-6 mt-1' id='isMarketing'
              name='marketing'
              checked={values.marketing}
              onChange={handleChange}
            />
            <label htmlFor="isMarketing" className='text-white/90 text-[14px]'>I agree to receive marketing communications (until I unsubscribe).</label>
          </div>
        </div>
      </div>
      {(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>{errorMessage}</p>}
      {(isSubmitting && !isLoginFail && isVerifingEmail) && <p className='text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center'>Registration Successfully, Please verify email</p>} 
      {(values.tnc)?<>     
      <button type='submit' className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#fff] rounded-[50px] w-full transition bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] hover:from-[#1D82FC] hover:to-[#1D82FC]'>{(onSubmit)?'Loading...':'Continue'}</button></>:
      <><button className='bg-transparent h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#F6F6F6]/50 border-2 border-[#F6F6F6]/40 rounded-[50px] w-full cursor-not-allowed' disabled>Continue</button></>}
    </form>
    </>
  );
};

export default GoogleIdentitySignUp;
