import React, {use, useEffect, useState} from 'react';
type Props = {
    isLoading: boolean;
}
const LoginWithIwantTFC = ({isLoading}:Props) => {
    const handleLoginWithIwantTFC = () => {
        const redirectUrl = process.env.NEXT_PUBLIC_IWANTTFC_LOGIN_URI as string;
        const callBackUrl = process.env.NEXT_PUBLIC_IWANTTFC_CALLBACK_URI as string;
        const callBackUrlEncoded = encodeURIComponent(callBackUrl);
        const url = `${redirectUrl}?redirectUrl=${callBackUrlEncoded}`;        
        console.log('url', url);
        window.location.assign(url);
    }
    return (
        <div className='mt-2 mb-4'>  
            {(isLoading)?
            <span className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 rounded-[50px] flex justify-center items-center w-full text-white border border-[#3A45AC] cursor-wait'>
                Loading...
            </span>
            :
            <button className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 rounded-[50px] w-full transition active:opacity-65 bg-gradient-to-tl to-[#3A45AC] to-[75%] from-[#192457] border border-[#3A45AC]'
                onClick={handleLoginWithIwantTFC}>
                <span className='text-white'>Login with iWantTFC</span>
            </button>}      
        </div>
    )
}
export default LoginWithIwantTFC;