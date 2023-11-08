import React, { useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
type ProfileHeadProps = {
    profileExpanded: boolean;
    toggleProfile: () => void;
}
const ProfileHead = (
    {
        profileExpanded,
        toggleProfile
    }: ProfileHeadProps
) => {
    return (
        <div className="flex justify-between">
            <div className="pr-2">
                <p className='text-[16px] text-[#DACFDA] font-medium'>Details</p>
            </div>
            <button 
                onClick={toggleProfile}
                className="w-[25px]">
                <ChevronDownIcon 
                className={`h-6 w-6 text-white ${(profileExpanded)?'rotate-180':null}`}/>
            </button>
        </div>
    );
}
export default ProfileHead;