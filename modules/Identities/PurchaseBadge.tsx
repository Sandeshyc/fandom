import React from 'react';
interface Props  {
    data: any,
}
const PurchaseBadge = ({data} : Props) => {
    return (
        <p className='text-xs py-1 px-4 w-auto absolute top-0 right-0 z-20 text-white rounded-bl-xl rounded-tr-md shadow-lg shadow-indigo-500/40 bg-gradient-to-l from-blue-700 to-blue-500'>
            My Purchase
        </p>
    )
}

export default PurchaseBadge