import React from 'react';
type Props = {
    className?: string;
    style?: React.CSSProperties;
}
const PurchaseBadge = ({className, style}:Props) => {
    return (
        <p className={`text-[11px] lg:text-xs py-1 px-2 lg:px-4 w-auto absolute top-0 right-0 z-20 text-white rounded-bl-xl rounded-tr-md shadow-lg shadow-indigo-500/40 bg-gradient-to-l from-blue-700 to-blue-500 ${className}`}
        style={style}>
            My Tickets
        </p>
    )
}
export default PurchaseBadge