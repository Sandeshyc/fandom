import React from 'react';
import Buttons from '@/components/identites/Buttons';
const LoginWithIwantTFC = () => {
    const handleLoginWithIwantTFC = () => {
        console.log('Login with iWantTFC');
    }
    return (
        <div className='my-2'>
            <button className='h-[42px] sm:h-[46px] xl:h-[52px] py-2 rounded-[50px] w-full transition active:opacity-65 bg-gradient-to-tl to-[#3A45AC] to-[75%] from-[#192457] border border-[#3A45AC]'
                onClick={handleLoginWithIwantTFC}
            >
                <span className='text-white'>Login with iWantTFC</span>
            </button>        
        </div>
    )
}
export default LoginWithIwantTFC;