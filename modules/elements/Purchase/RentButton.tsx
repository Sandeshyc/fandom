import React, {useState, useEffect} from "react";
type Props = {
    children: React.ReactNode;
    type?: 'active' | 'disabled';
    onClick?: () => void;
}
const RentButton = (
    {
        children,
        type = 'active',
        onClick
    }: Props
) => {
    const buttonClass = {
        'active': 'bg-gradient-to-r from-blue-700 to-blue-500 text-white active:opacity-65',
        'disabled': 'border border-blue-600 text-white/50 cursor-not-allowed'
    };
    return (
        <button 
        onClick={onClick}
        className={`rounded-full py-1 px-3 w-[120px] lg:w-[220px] text-base flex flex-row justify-center items-center transition h-[36px] lg:h-[44px] ${buttonClass[type]}`}>
            {children}
        </button>
    )
}
export default RentButton;