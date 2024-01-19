import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import { Poppins } from 'next/font/google';
import {
    CloseOutlined, 
    FacebookOutlined,
    Twitter,
    MailOutlined,
    Reddit,
} from '@mui/icons-material';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    sendEmailVerification,  
} from 'firebase/auth';
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const auth = getAuth(app);


const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
  });
type Props = {
    email: string;
};
const VerifyMail = ({email}:Props) => {
    const [isReSend, setIsReSend] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClose = () => {
        setOpen(true);
    };
    const sentVerifyEmail = async () => {
        try {
            setIsReSend(true);
            const sendResponse = await sendEmailVerification(auth?.currentUser as any);
            console.log('sendResponse', sendResponse);
            setTimeout(() => {
                setIsReSend(false);
            }, 20000);
        }catch (error:any) {
            if(error.code === 'auth/too-many-requests') {
                setErrorMessage('Too many requests. Try again later.');
            }
            if(error.code === 'auth/user-not-found') {
                setErrorMessage('User not found.');
            }
            console.log('error', error);
        }
    }
    return (
        <>
        <Modal
        open={open}
        aria-labelledby="Email Verify Modal"
        aria-describedby="Email Verify Modal"
        onClose={handleClose}
        className={`flex justify-center items-center ${poppins.className}`}>
          <div className='rounded-md w-[90%] max-w-[540px] bg-gray-900 relative text-white border border-white/70'>
            
            <div className="p-4 pt-8">
                <h3 className="text-white text-center text-2xl font-semibold mb-4">
                    Check your email <br/>inbox
                </h3>
                <p className="text-white text-sm md:text-base mb-4">
                    We have sent a confirmation email to <span className="italic">
                    {email}</span>. Please check your email and click the link within 24 hours to complete your registration.
                </p> 
                {(errorMessage)?<p className="text-red-500 text-sm md:text-base mb-4">
                    {errorMessage}
                    </p>:null}               
                {(isReSend)?<button 
                disabled={isReSend}
                className="underline text-blue-500 font-medium cursor-not-allowed disabled">
                    Resent verification link
                </button>:
                <button className="underline text-blue-500 font-medium"
                    onClick={sentVerifyEmail}>
                    Resend verification link
                </button>}
            </div>
        </div>
      </Modal>
        </>
    );
};
export default VerifyMail;