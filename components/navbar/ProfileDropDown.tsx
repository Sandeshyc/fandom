import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react';
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';

const ProfileDropDown = () => {
    return (
        <Menu as="div" className="relative text-left flex">
            <Menu.Button className="inline-flex items-center">
                <div className='transition w-[40px] h-[40px] rounded-full p-[3px] bg-gradient-to-tl from-[#3600FF] to-[#72AAFF]'>
                    <img src="/images/pp.jpeg" alt="Name" className='w-full h-full rounded-full'/>
                </div>
                <ArrowDropDown
                    sx={{
                        fontSize: 30,
                        color: '#fff',
                    }}/>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items 
                    className="absolute right-0 z-10 mt-2 w-[360px] origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4">
                        <div className='flex items-center'>
                            <div className='transition w-[64px] h-[64px] rounded-full p-[3px] bg-gradient-to-tl from-[#3600FF] to-[#72AAFF] mr-[10px]'>
                                <img src="/images/pp.jpeg" alt="Name" className='w-full h-full rounded-full'/>
                            </div>
                            <div>
                                <h3
                                className='font-semibold text-[18px] m-0'>Jhon Dalwan</h3>
                                <p className='text-[14px] text-[#0094FF]'>Edit Profile</p>
                            </div>
                        </div>
                        <div className='mt-[20px]'>
                            {/* Need To Update */}
                            <p>Comming Soon</p>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    );
}

export default ProfileDropDown;