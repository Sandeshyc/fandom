import React from 'react';
type Props = {
    thumbURl: string;
    title: string;
    className?: string;
}
const RollImage = ({thumbURl, title, className}:Props) => {
    if(className === 'undefined') {className = '';}
    className += ' flex justify-center items-center text-center text-gray-500 cursor-pointer object-contain shadow-xl rounded-md z-10';
    return (
        <>
        {(thumbURl)?
            <img src={thumbURl}
            alt={title}
            draggable={false}
            className={`w-full h-[12vw] ${className} `}
            />
            :
            <p
            className={`imgPlaceholder p-2 text-sm lg:text-lg ${className} `} >
                {title}
            </p>
        }
        </>
    );
}
export default RollImage;