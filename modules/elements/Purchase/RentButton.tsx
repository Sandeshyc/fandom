import React, {useState, useEffect} from "react";
type Props = {
    children: React.ReactNode;
    type?: 'active' | 'disabled';
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg' | 'full';
}
const RentButton = (
    {
        children,
        type = 'active',
        onClick,
        size = 'lg'
    }: Props
) => {
    const buttonClass = {
        'active': 'bg-gradient-to-r from-blue-700 to-blue-500 text-white active:opacity-65',
        'disabled': 'border border-blue-600 text-white/50 cursor-not-allowed'
    };
    const buttonSize = {
        'sm': 'min-w-[75px] xl:min-w-[100px] h-[34px] lg:h-[40px] w-fit',
        'md': 'min-w-[80px] xl:min-w-[120px] h-[34px] lg:h-[40px] text-sm w-fit',
        'lg': 'min-w-[150px] xl:min-w-[180px] h-[34px] lg:h-[40px] w-fit',
        'full': 'w-full h-[34px] lg:h-[40px]'
    };
    return (
        <button 
        onClick={onClick}
        className={`rounded-full py-1 px-3 text-base flex flex-row justify-center items-center transition ${buttonClass[type]}  ${buttonSize[size]}`}>
            {children}
        </button>
    )
}
export default RentButton;