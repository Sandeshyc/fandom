import React, { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    sendPasswordResetEmail,

} from 'firebase/auth';
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmailIcon } from "@/utils/CustomSVGs";
import { set } from "lodash";
import { useRouter } from "next/router";
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const imgLogBG = '/images/loginbgnew.png';

const ForgetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailSentError, setIsEmailSentError] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);
    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
      });
    const formik = useFormik({
        initialValues: {
          email: "",
        },
    
        // Pass the Yup schema to validate the form
        validationSchema: schema,
    
        // Handle form submission
        onSubmit: async ({ email }) => {
            setOnSubmit(true);
            await sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('email verification sent');
                setOnSubmit(false);
                setIsEmailSent(true);
                setIsEmailSentError(false);
            })
            .catch((error) => {
                console.log('error: ', error);
                setOnSubmit(false);
                setIsEmailSent(false);
                setIsEmailSentError(true);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode: ', errorCode);
                console.log('errorMessage: ', errorMessage);
            });
        },
      });
    
      // Destructure the formik object
      const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
            <>
            <div className="w-full p-2 fixed left-0 top-0 flex items-center z-10">
                <img src="/images/logonew.png" className="h-[60px] sm:h-[80px] lg:h-[90px] xl:h-[100px] mr-2" alt="Logo" />
                <p className='text-white font-semibold text-xl xl:text-2xl'>iWantTFC Tickets</p>
            </div>
            <div className="relative h-full w-full bg-gradient-to-tl to-[#000000] to-[75%] from-[#4E0558] xl:flex xl:flex-wrap">                
                <div className="w-full xl:w-1/2 ">            
                    <div className="flex flex-wrap justify-center h-full">
                        <div className="w-full max-w-[315px] sm:max-w-[448px] self-center">
                            <h1 className='text-white text-[18px] sm:text[24px] xl:text-[30px] mb-4 sm:mb-8 font-semibold  text-center '>Password Recovery</h1>
                            <p className='text-white text-[14px] sm:text-[16px] xl:text-[18px] mb-2'>Enter your email address.</p>
                            <form onSubmit={handleSubmit} method="POST">
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
                                    {errors.email && touched.email && <span className='text-red-500 w-full text-xs text-left block'>{errors.email}</span>}
                                </div>
                                <button type='submit' className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 text-[#fff] rounded-md w-full transition bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] hover:from-[#1D82FC] hover:to-[#1D82FC]'>{(onSubmit)?'Send...':'Continue'}</button>
                                {(isEmailSent)?<p className='text-green-400 leading-6 text-[14px] sm:text-[16px] xl:text-[18px] mt-4'>We have sent an email to your email address. Please verify your email to continue.</p>:''}
                                {(isEmailSentError)?<p className='text-red-400 leading-6 text-[14px] sm:text-[16px] xl:text-[18px] mt-4'>Sorry, we couldn't find an account with that email address. Please try again or create a new account.</p>:''}
                            </form>
                            <p className="flex flex-wrap justify-center text-white mt-8">
                                <span
                                    onClick={() => router.push('/auth')}
                                    className='text-white text-[14px] cursor-pointer hover:underline'
                                >Back Login</span>
                            </p>
                        </div>
                    </div>
            </div>
            <div className='hidden xl:block xl:w-1/2 h-full'>
                <img src={imgLogBG} className="h-full w-full object-cover object-left-bottom" alt="Logo" />
            </div>
        </div>
    </>
    )
}
export default ForgetPassword;