import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import { Roboto } from 'next/font/google';
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


const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin']
  });
type Props = {
    email: string;
};
const VerifyMail = ({email}:Props) => {
    const [isReSend, setIsReSend] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const handleClose = () => {
        setOpen(false);
        window.location.href = '/login';
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
        className={`flex justify-center items-center ${roboto.className}`}>
          <div className='rounded-md w-[90%] max-w-[540px] bg-gray-100 relative text-[#5F576F] border border-white/70'> 
              <div className="absolute top-2 right-2 cursor-pointer" onClick={handleClose}>
                    <CloseOutlined 
                    sx={{fontSize: 28}}
                    className="text-red-500"/>
                </div>           
            <div className="p-4 pt-8">
                <h3 className="text-[#5F576F] text-center text-2xl font-semibold mb-4">
                    Check your email <br/>inbox
                </h3>
                <p className="text-[#5F576F] text-sm md:text-base mb-4">
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