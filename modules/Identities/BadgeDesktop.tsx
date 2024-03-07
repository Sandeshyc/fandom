import React from 'react';
type Props = {
    text?: string;
    theme?: 'blue' | 'orange' | 'unset';
    className?: string;
    style?: React.CSSProperties;
}
const BadgeDesktop = ({
    text="My Tickets",
    theme="blue",
    className, 
    style
}:Props) => {
    const themeClass = {
        blue: 'bg-gradient-to-l from-blue-700 to-blue-500 text-white shadow-indigo-500/40',
        orange: 'bg-gradient-to-l from-orange-700 to-orange-500 text-white shadow-orange-500/40',
        unset: ''
    }
    return (
        <p className={`text-center min-w-[100px] text-[11px] lg:text-xs py-1 px-2 lg:px-4 w-auto absolute top-0 right-0 z-20 rounded-bl-xl rounded-tr-md shadow-lg  ${themeClass[theme]} ${className}`}
        style={style}>
            {text}
        </p>
    )
}
export default BadgeDesktop