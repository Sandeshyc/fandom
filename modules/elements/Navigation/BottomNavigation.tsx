import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {
    HomeOutlined,
    ConfirmationNumberOutlined,
    List,
    MoreHoriz,
} from '@mui/icons-material';
import MobileCollapse from '@/modules/elements/Navigation/MobileCollapse';
import { set } from 'lodash';

const BottomNavigation = () => {
    const router = useRouter();
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);    
    
    useEffect(() => {
        setIsCollapseOpen(false);
    }, [router.asPath]);

    return (
        <>
        {(isCollapseOpen)?<MobileCollapse 
        isCollapseOpen={isCollapseOpen}
        setIsCollapseOpen={setIsCollapseOpen}
        />:null}
        <div className='fixed bottom-0 left-0 w-full z-40 bg-black px-6 py-2 border-t border-gray-800'>
            <div className='flex justify-between'>
                <button className='flex items-center justify-center flex-col px-2 cursor-pointer'
                onClick={() => router.push('/')}>
                    <HomeOutlined
                    className={`${('/' === router.asPath)?'text-[#42AD9B]':'text-white'} text-xl`}/>
                    <span
                    className={`${('/' === router.asPath)?'text-[#42AD9B]':'text-white'} font-regular text-xs mt-1`}>Home</span>
                </button>
                <button className='flex items-center justify-center flex-col px-2 cursor-pointer'
                onClick={() => router.push('/mytickets')}>
                    <ConfirmationNumberOutlined
                    className={`${('/mytickets' === router.asPath)?'text-[#42AD9B]':'text-white'} text-xl`}/>
                    <span
                    className={`${('/mytickets' === router.asPath)?'text-[#42AD9B]':'text-white'} font-regular text-xs mt-1`}>My Tickets</span>
                </button>
                <button className='flex items-center justify-center flex-col px-2 cursor-pointer'
                onClick={() => router.push('/list')}>
                    <List
                    className={`${('/list' === router.asPath)?'text-[#42AD9B]':'text-white'} text-xl`}/>
                    <span
                    className={`${('/list' === router.asPath)?'text-[#42AD9B]':'text-white'} font-regular text-xs mt-1`}>My List</span>
                </button>
                <button className='flex items-center justify-center flex-col px-2 cursor-pointer'
                onClick={() => {
                    setIsCollapseOpen(true);
                }}>
                    <MoreHoriz
                    className={`${('/ddd' === router.asPath)?'text-[#42AD9B]':'text-white'} text-xl`}/>
                    <span
                    className={`${('/ddd' === router.asPath)?'text-[#42AD9B]':'text-white'} font-regular text-xs mt-1`}>More</span>
                </button>
            </div>
        </div>
        </>
    )
};
export default BottomNavigation;
