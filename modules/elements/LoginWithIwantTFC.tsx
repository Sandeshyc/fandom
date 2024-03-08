import React, {use, useEffect, useState} from 'react';
const LoginWithIwantTFC = () => {
    const handleLoginWithIwantTFC = () => {
        const redirectUrl = process.env.NEXT_PUBLIC_IWANTTFC_LOGIN_URI as string;
        const callBackUrl = process.env.NEXT_PUBLIC_IWANTTFC_CALLBACK_URI as string;
        const callBackUrlEncoded = encodeURIComponent(callBackUrl);
        const url = `${redirectUrl}?redirectUrl=${callBackUrlEncoded}`;        
        console.log('url', url);
        window.location.assign(url);
    }
    // useEffect(() => {
    //     const urlSearchParams = new URLSearchParams(window.location.search);
    //     const params = Object.fromEntries(urlSearchParams.entries());
    //     const accessToken = params.iwanttfc_access_token;
    //     const refreshToken = params.iwanttfc_refresh_token;
    //     const provider = params.iwanttfc_provider;

    // }, []);
    return (
        <div className='mt-2 mb-4'>
            <button className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 rounded-[50px] w-full transition active:opacity-65 bg-gradient-to-tl to-[#3A45AC] to-[75%] from-[#192457] border border-[#3A45AC]'
                onClick={handleLoginWithIwantTFC}>
                <span className='text-white'>Login with iWantTFC</span>
            </button>        
        </div>
    )
}
export default LoginWithIwantTFC;