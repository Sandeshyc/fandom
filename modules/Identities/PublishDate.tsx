import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
interface PublishDateProps  {
    publishDate: string,
    short?: boolean,
}

const PublishDate = ({publishDate, short = true} : PublishDateProps) => {
    // GMT to Local Time
    const date = new Date(publishDate);
    // const localDate = date.toLocaleDateString();
    const localDate = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const localTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
        <p className='flex items-center text-sm'><ClockIcon className="text-white w-[16px] h-[16px] mr-1"/>
            {localDate}
            {short ? ("\n") : (" - ")}
            {localTime}
        </p>
    )
}

export default PublishDate