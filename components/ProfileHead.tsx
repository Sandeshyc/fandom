import React, { useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ProfileHead = () => {
    return (
        <div className="flex justify-between">
            <div className="pr-2">
                <p className='text-[16px] text-[#DACFDA] font-medium'>Details</p>
            </div>
            <div className="w-[25px]">
                <ChevronDownIcon className='h-6 w-6 text-white' />
            </div>
        </div>
    );
}
export default ProfileHead;