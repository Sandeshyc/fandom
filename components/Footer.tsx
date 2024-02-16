import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useMoviePopupStore from '@/hooks/useMoviePopupStore';
import MovieSmallModal from '@/components/MovieSmallModal';
import useIsMobile from "@/hooks/useIsMobile";
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
    const {isOpen, closeModal} = useMoviePopupStore();
    const isMobile = useIsMobile();

    // get footer's current top position
    const footerRef = useRef(null);
    const [footerTop, setFooterTop] = useState(0);
    useEffect(() => {
        console.log('footerTop: ', footerTop);
        console.log('footerRef.current: ', footerRef.current);
        if(footerRef.current){
            const windowHight = window.innerHeight;
            const footerTopCurrent = footerRef.current.offsetTop;
            const footerHight = footerRef.current.offsetHeight;
            console.log('footerTop: ', footerTop);
            if(footerTopCurrent < windowHight - footerHight){
                setFooterTop(windowHight - footerHight - footerTopCurrent);
            }else{
                setFooterTop(1);
            }
        }
        console.log('footerTop:1 ', footerTop);
        console.log('window.innerHeight: ', window.innerHeight);
    }, [footerRef.current]);


    return(<>
        {(!isMobile)?<>
        <div className="py-8 bg-black"
        ref={footerRef}
        style={{
            backgroundImage: bgImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right bottom',
            position: 'relative',
            top: footerTop + 'px',
            visibility: (footerTop > 0)?'visible':'hidden'
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
                <div className="my-8 flex flex-wrap asFooterMenuWrap">
                    <NavItem label="Partner With Us" route="/" activeRoute={''} />
                    <NavItem label="Privacy Policy" route="/" activeRoute={''} />
                    <NavItem label="Help and Support" route="/" activeRoute={''} />
                    <NavItem label="Cookie Policy" route="/" activeRoute={''} />
                    <NavItem label="Terms and Conditions" route="/" activeRoute={''} />
                    <NavItem label="Copyright © 2023, iWantTFC Tickets | All Right Reserved" route="" activeRoute={''} />
                </div>
            </div>
        </div>
        <MovieSmallModal visible={isOpen} onClose={closeModal} />
        </>:
        null}
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
        className={`flex items-center font-medium text-base mr-4 cursor-pointer whitespace-nowrap ${router.pathname === activeRoute ? 'text-blue-500' : 'text-white'}`}
        onClick={() => router.push(route)}>
            {label}
        </div>:<div 
        className={`flex items-center font-medium text-base mr-4 text-white`}>
            {label}
        </div>}
    </>);
}