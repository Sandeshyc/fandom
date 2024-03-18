import React from "react";

type TextProps = {
    children: React.ReactNode,
    className?: string,
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
    clamp?: number,
};
const sizes = {
    'xs': 'text-[10px] lg:text-xs',
    'sm': 'text-xs lg:text-sm',
    'md': 'text-sm lg:text-md',
    'lg': 'text-md lg:text-lg',
    'xl': 'text-lg lg:text-xl',
    '2xl': 'text-xl lg:text-2xl',
    '3xl': 'text-2xl lg:text-3xl',
    '4xl': 'text-3xl lg:text-4xl',
};
const Text = ({ children, className, size, clamp, ...restProps }:TextProps) => { 
    if(className === undefined) className = '';
    if(clamp){
        className += 'line-clamp-'+clamp;
    }
    return (
        <p className={`${sizes[size]} ${className}`} {...restProps} >
            {children}
        </p>
    );
};

export default Text;