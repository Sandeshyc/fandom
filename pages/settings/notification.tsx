import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavigationHome from '@/modules/elements/NavigationHome';
import Footer from '@/components/Footer';
import { set } from 'lodash';
import Buttons from '@/components/identites/Buttons';
const bgImage = 'url("/images/new-bg.png")';
const NotificationSettings = (props:any) => {
  return (
    <>
      <NavigationHome />
      <div className="py-16 pt-24 lg:pt-32 min-h-[80vh]"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className="container max-w-[1300px] mx-auto px-4">
            <div className='text-white flex justify-between'>
                <div className='w-[70%]'>
                    <h1 className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-4">Notification Settings</h1>
                    <p className='text-base lg:text-lg'>
                    Stay up to date on the latest iWantTFC content, news and updates. Customize your notifications settings to only receive notifications that matters to you.
                    </p>
                </div>
                <div className='transition w-[50px] h-[50px] rounded-full p-[3px] bg-gradient-to-tl from-[#3600FF] to-[#72AAFF]'>
                    <img src="/images/pp.jpeg" alt="Name" className='w-full h-full rounded-full'/>
                </div>
            </div>
            <div className='bg-gray-800 ring-2 text-white p-4 py-8 rounded-md mt-8 lg:mt-12'>
                <div className='flex justify-between mb-4 last:mb-0'>
                    <div className='w-[150px] grow pr-4'>
                        <h3 className='text-lg font-medium'>New Releases</h3>
                        <p className='text-sm text-white/70'>New releases on iWantTFC exclusive to our platform. Stay up to date with what your favorite star is up to.</p>
                    </div>
                    <div className='w-[50px]'>
                        <ToggleButton/>
                    </div>
                </div>
                <div className='flex justify-between mb-4 last:mb-0'>
                    <div className='w-[150px] grow pr-4'>
                        <h3 className='text-lg font-medium'>New Episodes</h3>
                        <p className='text-sm text-white/70'>Get updates on the latest episodes of shows you have watched within minutes of release</p>
                    </div>
                    <div className='w-[50px]'>
                        <ToggleButton/>
                    </div>
                </div>
                <div className='flex justify-between mb-4 last:mb-0'>
                    <div className='w-[150px] grow pr-4'>
                        <h3 className='text-lg font-medium'>App Notifications</h3>
                        <p className='text-sm text-white/70'>Can we send you push notifications on the latest iWantTFC news, announcements and updates?</p>
                    </div>
                    <div className='w-[50px]'>
                        <ToggleButton/>
                    </div>
                </div>
            </div>
            <div className='flex justify-center flex-col'>
                <Buttons 
                className='mt-8 mx-auto max-w-full h-[56px] w-[500px] bg-gradient-to-l from-blue-700 to-blue-400'
                onClick={() => {}}>Save</Buttons>
                <button 
                className='mt-4 text-blue-500 text-lg'
                onClick={() => {}}
                >
                    Cancel
                </button>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default NotificationSettings;

type ToogleButtonProps = {
    isOn: boolean;
    setIsOn: () => void;
}
const ToggleButton = () => {
    const [isOn, setIsOn] = React.useState(true);
    return(<>
    <button 
    onClick={() => setIsOn(!isOn)}
    className={`relative w-full block rounded-full h-[18px] ${(isOn)?'bg-blue-500':'bg-gray-500'}`}>
        <span className={`z-10 scale-150 rounded-full absolute w-[18px] h-[18px] top-0 bg-[#E6E6E6] ${(isOn)?'right-0':'left-0'}`}></span>
    </button>
    </>);
}