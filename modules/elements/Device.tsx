import React, { useEffect, useState } from 'react';
const webBrowser = './images/web-browser.png';
const Device = () => {
    return (
        <div className='flex flex-wrap items-center w-full my-1'>
            <div className='p-2 lg:p-4 pl-0 w-[80px] lg:w-[150px]'>
                <img src={webBrowser} alt='web browser' className='w-full rounded-md'/>
            </div>
            <div className='w-[200px] grow p-2 lg:p-4 text-white/80'>
                <p className='text-base lg:text-lg text-[#DACFDA] font-medium'>Web Browser</p>
                <p className='text-sm'>Last Signed In: 09/14/2023</p>
                <p className='text-sm'>Plainsboro, United States</p>
            </div>
            <div className='lg:pl-4 w-[100px]'>
                <button className='text-white/70'>
                    Rename
                </button>
            </div>
        </div>
    );
}
export default Device;