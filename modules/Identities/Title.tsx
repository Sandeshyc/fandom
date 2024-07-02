import React from 'react';

type TitleProps = {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl',
    children: React.ReactNode,
    className?: string,
    [x:string]: any;
};
const sizes = {
    'xs': 'text-[12px] lg:text-xs',
    'sm': 'text-xs lg:text-sm',
    'md': 'text-sm lg:text-md',
    'lg': 'text-md xl:text-lg',
    'xl': 'text-lg xl:text-xl',
    '2xl': 'text-xl xl:text-2xl',
    '3xl': 'text-2xl xl:text-3xl',
    '4xl': 'text-3xl xl:text-4xl',
    '5xl': 'text-4xl xl:text-5xl',
    '6xl': 'text-5xl xl:text-6xl'
};
const Title = ({ tag, size, children, className, ...restProps }:TitleProps) => {
    const Tag = tag;
    if(className === undefined){
        className = '';
    }
    return (<Tag 
        className={`${sizes[size]} ${className}`} {...restProps}>
            {children}
        </Tag>
    );
};

export default Title;