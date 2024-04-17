import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Episode from '@/modules/skeletons/elements/Episode';
const Episodes = () => {
    return (
    <>
    <div className='text-white z-10 relative bg-black pt-8'>
        <div className='container mx-auto px-4'>
            <ul className="container mx-auto border-b border-gray-600 flex text-base overflow-x-auto mb-4 pb-1" role="tablist">
               <div className='mr-4 w-[150px]'>
                     <Skeleton baseColor='#333' highlightColor='#666' height={20} borderRadius={4}/>
               </div>
               <div className='mr-4 w-[150px]'>
                     <Skeleton baseColor='#333' highlightColor='#666' height={20} borderRadius={4}/>
               </div>
               <div className='mr-4 w-[150px]'>
                     <Skeleton baseColor='#333' highlightColor='#666' height={20} borderRadius={4}/>
               </div>
            </ul>
            <div className='max-w-[1000px] mx-auto pb-4'>
                {[...Array(4)].map((_, i) => (
                    <Episode key={i}/>
                ))}
            </div>
        </div>
    </div>
    </>
);
}
export default Episodes;