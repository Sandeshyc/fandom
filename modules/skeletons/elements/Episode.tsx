import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Episode = () => {
    return (
    <>
    <div className='mb-8 flex flex-wrap border-b border-white/40 pb-8 last:border-none'>
        <div className='w-full sm:w-1/2 md:w-1/3 sm:pr-4 mb-2 sm:mb-0'>
            <div className='aspect-[9/6] cursor-pointer rounded-md overflow-hidden relative'>
                <Skeleton baseColor='#333' highlightColor='#666' height='100%'/>
            </div>
        </div>
        <div className='w-full sm:w-1/2 md:w-2/3 lg:w-1/3'>
            <Skeleton baseColor='#333' highlightColor='#666' height={30}/>
            <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70}/>
            </p>
            <div className='w-full'>
                <Skeleton baseColor='#333' highlightColor='#666' height={20} count={4}/>
            </div>
        </div>
        <div className='w-full lg:w-1/3 md:text-center md:pl-2'>
            <div className='w-[150px]'>
                <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
            </div>
        </div>
    </div>
    </>
    );
}
export default Episode;