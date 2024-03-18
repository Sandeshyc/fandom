import React, { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import {Notifications, SettingsOutlined, Circle} from '@mui/icons-material';

const Notification = () => {
    const router = useRouter();    
    return (
        <Menu as="div" className="relative text-left flex">
            <Menu.Button className="text-contentColor flex items-center px-2 xl:px-4 py-1 border-2 border-primaryLight rounded-[20px] md:mr-2 xl:mr-6">
                <Notifications
                sx={{
                    fontSize: {xs: 18, sm: 25, md: 18, xl: 25},
                    color: '#fff',
                    marginRight: {xs: 1, sm: 2, md: 1, xl: 2}
                }}/>
                <span
                className='text-sm sm:text-base sm:font-semibold text-ContentColor'>
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
                    className="absolute text-[16px] right-0 z-20 mt-2 w-[440px] max-w-[90vw] origin-top-right rounded-md bg-black/90 text-white focus:outline-none shadow-lg border-white/40 border">
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
    const [isRead, setIsRead] = useState(false);
    return (
    <button 
    onClick={() => setIsRead(true)}
    className={`flex flex-wrap justify-between mb-8 w-full bg-black relative`}>
        <div className='w-[40%]'>
            <img src="https://absprod-static.iwanttfc.com/c/6/images/Enl2NPvzQ1UrsGO12ZePSg.jpg" alt="Movie Name" />
        </div>
        <div className='w-[60%] grow text-left pl-4'>
            <h4 className='text-base font-medium line-clamp-2'>Movie Name</h4>
            <p className='text-xs text-[#A7A7A9] mb-1 line-clamp-2'>Update your iWantTFC App to access new features and get...</p>
            <p className='text-xs text-[#A7A7A9]'>2 Hours ago</p>
        </div>
        {(!isRead)?(<Circle sx={{
            fontSize: 10,
            color: '#007DFB',
            position: 'absolute',
            top: '10px',
            right: '0px'
        }}/>):null}
    </button>
    );
}