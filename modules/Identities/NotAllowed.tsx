import React from 'react';
type Props = {
    message?: string;
}
const NotAllowed = ({message}:Props) => {
    return (
        <p className='text-xs py-1 px-2 lg:px-4 w-auto absolute top-0 right-0 z-20 text-white rounded-bl-xl rounded-tr-md shadow-lg shadow-indigo-500/40 bg-gradient-to-r from-red-700 to-red-500'>
            {(message)?`${message}`:'Not Allowed in your region'}
        </p>
    )
}

export default NotAllowed