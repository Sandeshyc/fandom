import React from 'react';
import Link from 'next/link';
interface LinkRouteProps{
    children: React.ReactNode
    href: string
    type: 'white' | 'primary' | 'unset' | 'outline' | 'hoverOutline',
    className?: string,
    styles?: React.CSSProperties,
    size?: 'sm' | 'md' | 'lg' | 'full'
}
const buttonClass = {
    'primary' : "text-white bg-gradient-to-l from-blue-500 to-blue-600 hover:bg-gradient-to-r",
    'white' : "bg-white text-black hover:bg-neutral-300",
    'outline' : "border border-white text-white hover:bg-white hover:text-black",
    'hoverOutline' : "border border-transparent text-white hover:border-white/50",
    'unset' : "hover:underline min-w-fit xl:min-w-fit"
};
const buttonSize = {
    'sm' : "min-w-[75px] xl:min-w-[100px] h-[30px] lg:h-[34px] w-fit text-sm",
    'md' : "min-w-[80px] xl:min-w-[120px] h-[34px] lg:h-[40px] text-sm w-fit",
    'lg' : "min-w-[150px] xl:min-w-[180px] h-[34px] lg:h-[40px] w-fit",
    'full' : "w-full h-[34px] lg:h-[40px]"
};
const LinkRoute = ({children, href, type, className, styles, size='lg'}:LinkRouteProps) => {
    if(className === undefined) className = '';
    if(styles === undefined) styles = {};
    let commonClass = " cursor-pointer active:opacity-65";
    if(type === 'primary' || type === 'white' || type === 'outline' || type === 'hoverOutline'){
        commonClass += " flex flex-row justify-center items-center text-center rounded-full p-2  transition whitespace-nowrap";
    }

    return(
        <Link 
        href={href}
        className={`${buttonClass[type]} ${buttonSize[size]} ${className} ${commonClass}`}
        style={styles}
        >
            {children} 
        </Link>

    );
}
export default LinkRoute