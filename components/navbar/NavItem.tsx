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
        {/* <Link href={route} className={`relative text-sm xl:text-base cursor-pointer text-contentColor ${(activeRoute === router.pathname)?'font-semibold':''}`}>
            <span className="block">{label}</span>            
            {(activeRoute === router.pathname)?<span className={`w-full h-[3px] rounded-full bg-primaryLight inline-block absolute bottom-[-6px] left-[50%] transform translate-x-[-50%]`}></span>:null}
        </Link> */}
        <a href={route} className={`relative text-sm xl:text-base cursor-pointer text-contentColor ${(activeRoute === router.pathname)?'font-semibold':''}`}>
            <span className="block">{label}</span>            
            {(activeRoute === router.pathname)?<span className={`w-full h-[3px] rounded-full bg-primaryLight inline-block absolute bottom-[-6px] left-[50%] transform translate-x-[-50%]`}></span>:null}
        </a>
        </>
    );
}

export default NavItem;