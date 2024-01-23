import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
    label: string;
    route: string;
    activeRoute: string;
};

const NavItem: React.FC<Props> = ({ label, route, activeRoute }) => {
    const router = useRouter();
    return (
        <>
        {/* <button
            className={`relative text-[16px] cursor-pointer text-white ${(activeRoute === router.pathname)?'font-semibold':''}`}
            onClick={() => router.push(route)}>
            <span className="block">{label}</span>
            
            {(activeRoute === router.pathname)?<span className={`w-full h-[3px] rounded-full bg-blue-500 inline-block absolute bottom-[-6px] left-[50%] transform translate-x-[-50%]`}></span>:null}
        </button> */}
        <Link href={route} className={`relative text-[16px] cursor-pointer text-white ${(activeRoute === router.pathname)?'font-semibold':''}`}>
            <span className="block">{label}</span>            
            {(activeRoute === router.pathname)?<span className={`w-full h-[3px] rounded-full bg-blue-500 inline-block absolute bottom-[-6px] left-[50%] transform translate-x-[-50%]`}></span>:null}
        </Link>
        </>
    );
}

export default NavItem;