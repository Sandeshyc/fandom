import React from "react";

type TextProps = {
    children: React.ReactNode,
    className?: string,
    size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
    clamp?: number,
};
const sizes = {
    'xs': 'text-[10px] lg:text-xs',
    'sm': 'text-xs lg:text-sm',
    'md': 'text-sm lg:text-md',
    'base': 'text-md lg:text-base',
    'lg': 'text-md lg:text-lg',
    'xl': 'text-lg lg:text-xl',
    '2xl': 'text-xl lg:text-2xl',
    '3xl': 'text-2xl lg:text-3xl',
    '4xl': 'text-3xl lg:text-4xl',
};

const clampLines = {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6',
    7: 'line-clamp-7',
    8: 'line-clamp-8',
    9: 'line-clamp-9',
    10: 'line-clamp-10',
};
const Text = ({ children, className, size, clamp=100, ...restProps }:TextProps) => { 
    if(className === undefined) className = '';
    return (
        <p className={`${sizes[size]} ${className} ${clampLines[clamp]}`} {...restProps} >
            {children}
        </p>
    );
};

export default Text;