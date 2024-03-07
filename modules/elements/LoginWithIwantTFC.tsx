import React from 'react';
import Buttons from '@/components/identites/Buttons';
const LoginWithIwantTFC = () => {
    const handleLoginWithIwantTFC = () => {
        const redirectUrl = 'http://localhost:3000';
        const redirectUrlEncoded = encodeURIComponent(redirectUrl);
        const url = `https://iwanttfc.com/purchase-auth/auth?redirectUrl=${redirectUrlEncoded}`;
        window.location.assign(url);
    }
    return (
        <div className='mt-2 mb-4'>
            <button className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 rounded-[50px] w-full transition active:opacity-65 bg-gradient-to-tl to-[#3A45AC] to-[75%] from-[#192457] border border-[#3A45AC]'
                onClick={handleLoginWithIwantTFC}
            >
                <span className='text-white'>Login with iWantTFC</span>
            </button>        
        </div>
    )
}
export default LoginWithIwantTFC;