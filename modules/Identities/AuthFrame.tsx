import React from 'react';
const imgLogBG = '/images/loginbgnew.jpeg';
const biniLogoUrl = '/images/logoofbini.png';
type Props = {
    pageHeading?: string;
    authLoading: boolean;
    children: any;
}
const AuthFrame = ({
    pageHeading,
    authLoading,
    children
}:Props) => {  
  return (
    <>
    {(authLoading)?
    <div className="w-full h-full fixed left-0 top-0 bg-gray-500/50 z-50 cursor-wait">
    </div>:null}
    <div className="relative min-h-screen w-full bg-gradient-to-t to-[#EFF3F6] to-[75%] from-[#FFE5F1] flex flex-wrap items-center justify-center lg:items-stretch">      
      <div className="w-full xl:w-1/2 flex justify-center items-center py-8">        
        <div className="flex flex-wrap justify-center w-full">
          <div className="w-full max-w-[315px] sm:max-w-[448px] lg:max-w-[526px] text-center self-center">
            <img src={biniLogoUrl} className="w-[196px] mx-auto mb-4" alt="Logo of Bini" />
            <h1 className='text-[#93767A] text-[20px] lg:text-[24px] mb-4 sm:mb-8 font-semibold'>{pageHeading}</h1>
            <div className='w-full'>
                {children}
            </div>
          </div>
        </div>
      </div>
      <div className='hidden xl:block xl:w-1/2'>
        <img src={imgLogBG} className="min-h-screen h-full w-full object-cover object-center" alt="Cover of Bini" />
      </div>
    </div>
    </>
  );
}

export default AuthFrame;
