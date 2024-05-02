import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google';
import {
    ReportProblemOutlined,
} from '@mui/icons-material';


const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
  });
type Props = {
    message: string;
    isRetry?: boolean;
    errorMsg?: any;
};
const ErrorPopUp = ({message, isRetry=true, errorMsg}:Props) => {
    const route = useRouter();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(true);
    };
    
    return (
        <>
        <Modal
        open={open}
        aria-labelledby="Email Verify Modal"
        aria-describedby="Email Verify Modal"
        onClose={handleClose}
        style={{
            backdropFilter: 'blur(15px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        className={`flex justify-center items-center ${poppins.className}`}>
          <div className='rounded-md w-[90%] max-w-[540px] bg-gray-900 relative text-white border border-white/70'>
            <div className="p-4 py-8 text-center">
                <ReportProblemOutlined 
                sx={{
                    color: 'gray',
                    fontSize: '4rem',                
                }}
                />
                <h3 className="text-white/80 text-2xl font-semibold mb-2">
                    oops! 
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-6">{(message)?message:'Sorry, Something went wrong!'}</p> 
                <div className="gap-2 flex justify-center">
                    {(isRetry)?
                    <button
                    className="bg-gray-700 text-white/70 text-sm md:text-base px-4 py-2 rounded-md"
                    onClick={
                        () => {
                            window.location.reload();
                        }
                    }>
                        Try Again
                    </button>:
                    null}
                    {(route.pathname !== '/') && (
                        <button
                        className="text-white/90 text-sm md:text-base px-4 py-2 rounded-md bg-gradient-to-l from-blue-700 to-blue-600"
                        onClick={
                            () => {
                                window.location.replace('/');
                            }
                        }>
                            Back to Home
                        </button>
                    )}
                </div>
                {(errorMsg)&&(
                    <div className="h-[300px] w-full overflow-y-auto">
                        <h4 className="text-red-500/80 text-lg font-semibold mb-2">Error Details for dev test</h4>
                        <pre className="text-white/80 text-xs md:text-sm text-left">{JSON.stringify(errorMsg, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
      </Modal>
        </>
    );
};
export default ErrorPopUp;