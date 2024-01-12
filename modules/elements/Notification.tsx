import React, { use, useCallback, useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import {Notifications, SettingsOutlined, Circle} from '@mui/icons-material';

const Notification = () => {
    const router = useRouter();    
    return (
        <Menu as="div" className="relative text-left flex">
            <Menu.Button className="flex items-center px-4 py-1 border-2 border-blue-500 rounded-[20px] mr-6">
                <Notifications
                sx={{
                    fontSize: 25,
                    color: '#fff',
                    marginRight: '10px'
                }}/>
                <span
                className='font-semibold text-white'>
                    13                          
                </span>
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
                    className="absolute text-[16px] right-0 z-20 mt-2 w-[440px] origin-top-right rounded-md bg-[#101010]/90 text-white focus:outline-none shadow-lg border-white/40 border">
                    <div className="p-4 relative max-h-[600px] overflow-y-auto overflow-x-hidden">
                        <div className='flex flex-wrap justify-between mb-8'>
                            <h4 className='w-32 grow font-medium text-lg'>Notifications</h4>
                            <button className='w-8'
                            onClick={() => router.push('/settings/notification')}
                            >
                                <SettingsOutlined
                                sx={{
                                    fontSize: 20,
                                    color: '#fff',
                                }}/>
                            </button>
                        </div>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default Notification;

const Item = () => {
    return (
    <button className={`flex flex-wrap justify-between mb-8 w-full bg-[#101010] relative ${(1)?'pr-2':''}`}>
        <div className='w-[145px]'>
            <img src="https://absprod-static.iwanttfc.com/c/6/images/Enl2NPvzQ1UrsGO12ZePSg.jpg" alt="Movie Name" />
        </div>
        <div className='w-[145px] grow text-left pl-4'>
            <h4 className='text-base font-medium line-clamp-2'>Movie Name</h4>
            <p className='text-xs text-[#A7A7A9] mb-1 line-clamp-2'>Update your iWantTFC App to access new features and get...</p>
            <p className='text-xs text-[#A7A7A9]'>2 Hours ago</p>
        </div>
        {(1)?(<Circle sx={{
            fontSize: 10,
            color: '#007DFB',
            position: 'absolute',
            top: '10px',
            right: '0px'
        }}/>):null}
    </button>
    );
}