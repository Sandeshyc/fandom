import React from 'react';
type Props = {
    text?: string;
    theme?: 'blue' | 'orange' | 'unset';
    className?: string;
    style?: React.CSSProperties;
}
const BadgeMobile = ({
    text="My Tickets",
    theme="blue",
    className, 
    style
}:Props) => {
    const themeClass = {
        blue: 'bg-gradient-to-l from-blue-700 to-blue-500 text-white/90',
        primary: 'bg-gradient-to-l from-blue-700 to-blue-500 text-white/90',
        orange: 'bg-gradient-to-l from-orange-700 to-orange-500 text-white/90',
        Orange: 'bg-gradient-to-l from-orange-700 to-orange-500 text-white/90',
        unset: ''
    }
    return (
        <p className={`rounded-md p-1 text-center text-xs sm:text-sm ${themeClass[theme]} ${className}`}
        style={style}>
            {text}
        </p>
    )
}
export default BadgeMobile