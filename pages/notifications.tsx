import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavigationHome from '@/modules/elements/NavigationHome';
import Footer from '@/components/Footer';
import {SettingsOutlined, Circle} from '@mui/icons-material';
const bgImage = 'url("/images/new-bg.png")';
const Notifications = (props:any) => {
    const router = useRouter();
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
            <div className='flex flex-wrap justify-between mb-8'>
                <h4 className='w-32 grow font-medium text-lg text-white'>Notifications</h4>
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
      </div>
      <Footer/>
    </>
  )
}

export default Notifications;

const Item = () => {
    return (
    <button className={`flex flex-wrap justify-between mb-4 bg-[#101010] py-2 w-full relative ${(1)?'pr-2':''}`}>
        <div className='w-[145px]'>
            <img src="https://absprod-static.iwanttfc.com/c/6/images/Enl2NPvzQ1UrsGO12ZePSg.jpg" alt="Movie Name" />
        </div>
        <div className='w-[145px] grow text-left pl-4'>
            <h4 className='text-base font-medium line-clamp-2 text-white'>Movie Name</h4>
            <p className='text-xs text-[#A7A7A9] mb-1 line-clamp-2'>Update your iWantTFC App to access new features and get...</p>
            <p className='text-xs text-[#A7A7A9]'>2 Hours ago</p>
        </div>
        {(1)?(<Circle sx={{
            fontSize: 10,
            color: '#007DFB',
            position: 'absolute',
            top: '10px',
            right: '5px'
        }}/>):null}
    </button>
    );
}