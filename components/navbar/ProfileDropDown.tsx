import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react';
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
import {
    MyTicketsIcon,
    MyListIcon,
    MyAccountIcon,
    PurchaseGiftCardIcon,
    MyPartnerIcon,
    HelpCenterIcon,
    LogoutIcon
} from '@/utils/CustomSVGs';

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
                    className="absolute text-[16px] right-0 z-10 mt-2 w-[360px] origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <div className='my-[20px] asDivider'></div>
                        <div className='mb-1'>
                            <div className='flex items-center cursor-pointer hover:bg-[#F5F5F5] rounded-md p-[5px]'>
                                <span className='mr-2'><MyTicketsIcon/></span>
                                <p>My Tickets</p>
                            </div>  
                        </div> 
                        <div className='mb-2'>
                            <div className='flex items-center cursor-pointer hover:bg-[#F5F5F5] rounded-md p-[5px]'>
                                <span className='mr-2'><MyListIcon/></span>
                                <p>My List</p>
                            </div>  
                        </div>
                        <div className='mb-2'>
                            <div className='flex items-center cursor-pointer hover:bg-[#F5F5F5] rounded-md p-[5px]'>
                                <span className='mr-2'><MyAccountIcon/></span>
                                <p>Manage Account</p>
                            </div>  
                        </div>
                        <div className='mb-2'>
                            <div className='flex items-center cursor-pointer hover:bg-[#F5F5F5] rounded-md p-[5px]'>
                                <span className='mr-2'><PurchaseGiftCardIcon/></span>
                                <p>Purchase a Gift</p>
                            </div>  
                        </div>
                        <div className='my-[15px] asDivider'></div> 
                        <div className='mb-2'>
                            <div className='flex items-center cursor-pointer hover:bg-[#F5F5F5] rounded-md p-[5px]'>
                                <span className='mr-2'><MyPartnerIcon/></span>
                                <p>Partner with Us</p>
                            </div>  
                        </div> 
                        <div className='mb-2'>
                            <div className='flex items-center cursor-pointer hover:bg-[#F5F5F5] rounded-md p-[5px]'>
                                <span className='mr-2'><HelpCenterIcon/></span>
                                <p>Help Centre</p>
                            </div>  
                        </div> 
                        <div className='my-[10px] asDivider'></div> 
                        <div>
                            <div 
                                className='flex items-center cursor-pointer hover:bg-[#F5F5F5] rounded-md p-[5px]'>
                                <span className='mr-2'><LogoutIcon/></span>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    );
}

export default ProfileDropDown;