import React from 'react';
import Link from 'next/link';
interface LinkRouteProps{
    children: React.ReactNode
    href: string
    type: 'white' | 'primary' | 'unset' | 'outline' | 'hoverOutline',
    className?: string,
    styles?: React.CSSProperties,
}
const buttonClass = {
    'primary' : "text-white bg-gradient-to-l from-blue-500 to-blue-600 hover:bg-gradient-to-r",
    'white' : "bg-white text-black hover:bg-neutral-300",
    'outline' : "border border-white text-white hover:bg-white hover:text-black",
    'hoverOutline' : "border border-transparent text-white hover:border-white/50",
    'unset' : "hover:underline"
};
const LinkRoute = ({children, href, type, className, styles}:LinkRouteProps) => {
    if(className === undefined) className = '';
    if(styles === undefined) styles = {};
    let commonClass = " cursor-pointer active:opacity-65";
    if(type === 'primary' || type === 'white' || type === 'outline' || type === 'hoverOutline'){
        commonClass += " flex flex-row justify-center items-center w-auto text-center rounded-full py-2 px-3 text-base min-w-[150px] xl:min-w-[180px] h-[40px] transition ";
    }

    return(
        <Link 
        href={href}
        className={`${buttonClass[type]} ${className} ${commonClass}`}
        style={styles}
        >
            {children} 
        </Link>

    );
}
export default LinkRoute