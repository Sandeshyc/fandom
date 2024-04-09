import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Device from '@/modules/elements/Device';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
const DeviceDetails = () => {
    const [expanded, setExpanded] = useState(true);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    }
    return (
        <div className={`p-4 border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[22%]`}>  
            <div className="flex justify-between">
                <div className="pr-2">
                    <p className='text-lg lg:text-[22px] text-[#DACFDA] font-medium'>Device Details</p>
                </div>
                <button 
                    type="button"
                    onClick={toggleExpanded}
                    className="w-[25px]">
                    <ChevronDownIcon 
                    className={`active:opacity-65 h-6 w-6 text-white ${(expanded)?'rotate-180':null}`}/>
                </button>
            </div>
            <div className={`text-white/80 bg-gray-700 p-4 rounded-md mt-4 flex flex-wrap ${(!expanded)?'hidden':'flex'}`}>
                <div className='mb-2'>
                    <Title tag="h3" size='xl'>CURRENT DEVICES</Title>
                </div>
                <Device />
            </div>
            <div className={`text-white/80 bg-gray-700 p-4 rounded-md mt-4 flex flex-wrap ${(!expanded)?'hidden':'flex'}`}>
                <div className='mb-2 w-full'>
                    <div className='flex justify-between w-full mb-2'>
                        <Title tag="h3" size='xl'>OTHER DEVICES</Title>
                        <button className='underline text-white'>Sign out all</button>
                    </div>
                    <Text size='lg'>Not seeing all of your devices? Sign out and sign back in on that device to see it below.</Text>
                </div>
                <Device />
                <Device />
                <Device />
                <Device />
            </div>
        </div>
    );
};
export default DeviceDetails;