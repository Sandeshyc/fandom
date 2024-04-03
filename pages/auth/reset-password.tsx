import React, { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    confirmPasswordReset,
    checkActionCode,
    applyActionCode,
} from 'firebase/auth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmailIcon, LockIcon, EyeSlashIcon } from "@/utils/CustomSVGs";
import {
  Visibility,
  VisibilityOff,
  RotateRightOutlined
} from '@mui/icons-material';
import { useRouter } from "next/router";
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const imgLogBG = '/images/loginbgnew.png';

const ResetPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoginFail, setIsLoginFail] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('oops! something went wrong');
    const [oobCode, setOobCode] = useState('');
    const [mode, setMode] = useState('');
    const router = useRouter();
    const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = useState('oops! something went wrong');
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const [isVerifingEnd, setIsVerifingEnd] = useState(false);
    // get query params
    useEffect(() => {
        const { oobCode, mode } = router.query;
        setOobCode(oobCode as string);
        setMode(mode as string);
        if(mode === 'verifyEmail') {
            const handleVerification = async () => {
                console.log('auth.currentUser?.emailVerified', auth.currentUser?.emailVerified);
                if(auth.currentUser?.emailVerified === true) {
                    setIsVerifiedEmail(true);
                    setTimeout(() => {
                        router.replace('/');
                    }, 3000);
                }else{
                    try {
                        await applyActionCode(auth, oobCode as string);
                        setIsVerifiedEmail(true);
                        setTimeout(() => {
                            router.replace('/');
                        }, 3000);
                    } catch (error:any) {
                        if(error.code === 'auth/expired-action-code') {
                            setVerifyEmailErrorMessage('expired');
                        }
                        if(error.code === 'auth/invalid-action-code') {
                            setVerifyEmailErrorMessage('This link already used');
                        }
                        if(error.code === 'auth/user-disabled') {
                            setVerifyEmailErrorMessage('user disabled');
                        }
                        if(error.code === 'auth/user-not-found') {
                            setVerifyEmailErrorMessage('user not found');
                        }
                        if(error.code === 'auth/email-already-in-use') {
                            setVerifyEmailErrorMessage('email already in use');
                        }
                    }
                } 
                setIsVerifingEnd(true);              
              };          
              handleVerification();
            // router.replace('/auth');
        }
    }, [router.query]);

    const togglePassword = () => {
        setIsShowPassword(!isShowPassword);
    }
    const toggleConfirmPassword = () => {
        setIsShowConfirmPassword(!isShowConfirmPassword);
    } 

    const schema = Yup.object().shape({
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            'Password must contain at least 1 uppercase, 1 lowercase and 1 number'
          ),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), ''], 
            'Passwords are not matched'
          ).required('Confirm Password is required'),
    });
    const formik = useFormik({
        initialValues: {
          password: "",
          confirmPassword: "",
        },
    
        // Pass the Yup schema to validate the form
        validationSchema: schema,
    
        // Handle form submission
        onSubmit: async ({ password, confirmPassword }) => {
          // Make a request to your backend to store the data
          setIsSubmitting(true);
          setOnSubmit(true);
            await confirmPasswordReset(auth, oobCode, password)
            .then(() => {
                console.log('email verification sent');
                setOnSubmit(false);
                setIsLoginFail(false);
                setErrorMessage('Success!');
                router.push('/auth');
            })
            .catch((error) => {
                console.log('error: ', error);
                setOnSubmit(false);
                setIsLoginFail(true);
                setErrorMessage('oops! something went wrong');
                if(error.code === 'auth/expired-action-code') {
                    setErrorMessage('The link has expired. ');
                }
                if(error.code === 'auth/expired-action-code') {
                    setErrorMessage('The link has expired. ');
                }
                if(error.code === 'auth/invalid-action-code') {
                    setErrorMessage('The link is invalid. ');
                }
                if(error.code === 'auth/user-disabled') {
                    setErrorMessage('The user corresponding to the given link has been disabled. ');
                }
                if(error.code === 'auth/user-not-found') {
                    setErrorMessage('There is no user corresponding to the given link. ');
                }                
            });
    
        },
      });
    
      // Destructure the formik object
      const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
            <>
            <div className="w-full p-2 fixed left-0 top-0 flex items-center z-10">
                <img src="/images/logonew.png" className="h-[60px] sm:h-[80px] lg:h-[90px] xl:h-[100px] mr-2" alt="Logo" />
                <p className='text-white font-semibold text-xl xl:text-2xl'>Tickets</p>
            </div>
            <div className="relative min-h-screen h-full w-full  pt-[100px] xl:pt-0 bg-gradient-to-tl to-[#000000] to-[75%] from-[#4E0558] xl:flex xl:flex-wrap">                
                <div className="w-full xl:w-1/2 ">            
                    <div className="flex flex-wrap justify-center h-full">
                        <div className="w-full max-w-[315px] sm:max-w-[448px] self-center">
                            {(mode === 'resetPassword')?
                            <><h1 className='text-white text-[18px] sm:text[24px] xl:text-[30px] mb-4 sm:mb-8 font-semibold  text-center '>Reset Password</h1>
                            <p className='text-white text-[14px] sm:text-[16px] xl:text-[18px] mb-2'>New Password</p>                            
                            <form onSubmit={handleSubmit} method="POST">
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
                                        autoFocus={true}
                                        className='w-full text-white text-[14px] lg:text-[16px] py-1 px-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%] focus:bg-transparent'
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
                                        className='w-full text-white text-[14px] lg:text-[16px] py-1 px-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%] focus:bg-transparent'
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
                                {(isSubmitting && isLoginFail) && <p className='text-red-900 bg-red-200 rounded-md my-2 p-1 w-full text-center'>{errorMessage}</p>}
                                {(isSubmitting && !isLoginFail) && <p className='text-green-900 bg-green-200 rounded-md my-2 p-1 w-full text-center'>{errorMessage}</p>}
                                <button type='submit' className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#fff] rounded-[50px] w-full transition bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] hover:from-[#1D82FC] hover:to-[#1D82FC]'>{(onSubmit)?'Loading...':'Continue'}</button>
                            </form>
                            <p className="flex flex-wrap justify-center text-white mt-8">
                                <span
                                    onClick={() => router.push('/auth')}
                                    className='text-white text-[14px] cursor-pointer hover:underline'
                                >Back Login</span>
                            </p></>:
                            null}
                            {(mode === 'verifyEmail' && !isVerifingEnd)?
                            <div className="flex justify-center items-center flex-col">
                                <RotateRightOutlined
                                    className="animate-spin"
                                    sx={{
                                        fontSize: 60,
                                        color: '#fff',
                                    }}
                                />
                                <p className="text-white">Verifing Email...</p>
                            </div>:
                            null}
                            {(mode === 'verifyEmail' && isVerifingEnd && isVerifiedEmail)?
                                <p 
                                className="text-green-900 bg-green-200 rounded-md my-2 p-4 w-full text-center">
                                    Your email has been verified. Please wait...
                                </p>:
                            null}
                            {(mode === 'verifyEmail' && isVerifingEnd && !isVerifiedEmail)?
                            <>
                            <p className="text-red-900 bg-red-200 rounded-md my-2 p-4 w-full text-center">
                                {verifyEmailErrorMessage}
                            </p>
                            <p className="flex flex-wrap justify-center text-white mt-8">
                                <span
                                    onClick={() => router.push('/auth')}
                                    className='text-white text-[14px] cursor-pointer hover:underline'
                                >Back Login</span>
                            </p></>:
                            null}
                        </div>
                    </div>
            </div>
            <div className='hidden xl:block xl:w-1/2'>
                <img src={imgLogBG} className="h-full w-full object-cover object-left-bottom" alt="Logo" />
            </div>
        </div>
    </>
    )
}
export default ResetPassword;