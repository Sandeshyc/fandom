import React from "react";
import { useRouter } from "next/router";
import {
    FacebookIcon,
    InstagramIcon,
    TiktokIcon,
    TwitterIcon,
    YoutubeIcon
} from '@/utils/CustomSVGs';
const bgImage = 'url("/images/footer-bg.png")';
const logoSrc = '/images/logonew.png';
const Footer = () => {
    const router = useRouter();
    return(<>
        <div className="py-8 bg-black"
        style={{
            backgroundImage: bgImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right bottom',
          }}>
            <div className="px-4">
                <div className="border-b border-[#0245F2] pb-8">
                    <div className="flex justify-between">
                        <div>
                            <div className='mr-8'>
                                <img 
                                src={logoSrc} 
                                className="h-[92px] cursor-pointer" 
                                alt="Logo" onClick={() => router.push('/')} />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-xl">
                            Follow iWantTFC Tickets on social media
                            </p>
                            <div>
                                <div className="flex space-x-4 mt-4">
                                    <div className="cursor-pointer w-[40px] h-[40px] rounded-full border border-white flex items-center justify-center">
                                        <FacebookIcon/>
                                    </div>
                                    <div className="cursor-pointer w-[40px] h-[40px] rounded-full border border-white flex items-center justify-center">
                                        <InstagramIcon/>
                                    </div>
                                    <div className="cursor-pointer w-[40px] h-[40px] rounded-full border border-white flex items-center justify-center">
                                        <TiktokIcon/>
                                    </div>
                                    <div className="cursor-pointer w-[40px] h-[40px] rounded-full border border-white flex items-center justify-center">
                                        <TwitterIcon/>
                                    </div>
                                    <div className="cursor-pointer w-[40px] h-[40px] rounded-full border border-white flex items-center justify-center">
                                        <YoutubeIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-8 flex asFooterMenuWrap">
                    <NavItem label="Partner With Us" route="/" activeRoute={''} />
                    <NavItem label="Privacy Policy" route="/" activeRoute={''} />
                    <NavItem label="Help and Support" route="/" activeRoute={''} />
                    <NavItem label="Cookie Policy" route="/" activeRoute={''} />
                    <NavItem label="Terms and Conditions" route="/" activeRoute={''} />
                    <NavItem label="Copyright © 2023, iWantTFC Tickets | All Right Reserved" route="" activeRoute={''} />
                </div>
            </div>
        </div>
    </>);
}

export default Footer;

type NavItemProps = {
    label: string;
    route: string;
    activeRoute: string;
}
const NavItem = ({label, route, activeRoute}:NavItemProps) => {
    const router = useRouter();
    return(<>
        
        {(route)?<div 
        className={`flex items-center font-medium text-base mr-4 cursor-pointer ${router.pathname === activeRoute ? 'text-blue-500' : 'text-white'}`}
        onClick={() => router.push(route)}>
            {label}
        </div>:<div 
        className={`flex items-center font-medium text-base mr-4 text-white`}>
            {label}
        </div>}
    </>);
}