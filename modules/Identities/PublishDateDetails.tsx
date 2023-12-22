import React from 'react';
import Image from 'next/image'

import CelendarIcon from 'public/images/calendar.svg';

interface PublishDateDetailsProps  {
    publishDate: string,
    short?: boolean,
}

const PublishDateDetails = ({publishDate, short = true} : PublishDateDetailsProps) => {
    // GMT to Local Time
    const date = new Date(publishDate);
    // const localDate = date.toLocaleDateString();
    const localDate = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const localTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
        <p className='text-sm tracking-wider'>
            <Image src={CelendarIcon} alt="Calendar" width={20} height={20} className="!inline-block mr-1"/> Starting From<br/>
            <span className='font-medium text-white'>{localDate} &#x2022; 
                <span className='whitespace-nowrap'>{localTime}</span>
                {/* <span className='whitespace-nowrap'>{localTime} Onwards</span> */}
            </span>
        </p>
    )
}

export default PublishDateDetails