import React from 'react';
type Props = {
    footer: {
        text: string;
        type: string;
    }
}
const CardFooter = ({footer}:Props) => {
    const text = footer?.text;
    const type = footer?.type || 'primary';
    if(!text) return null;
    return (
        <div className={`inline-block mb-2 mx-2 text-white bg-opacity-80 px-2 rounded-md  bg-black py-1`}>
            <p className='flex flex-wrap items-center text-[10px] lg:text-xs'>
            {text}
            </p>
        </div>
    );
}
export default CardFooter;