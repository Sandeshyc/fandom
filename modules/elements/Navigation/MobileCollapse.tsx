import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import useProfile from '@/hooks/useProfile';
import * as oidcApi from 'pages/api/auth/oidcApi';
import {
    Search,
    Home,
    Insights,
    Movie,
    Category,
    PlaylistPlay,
    ShoppingCart,
    HelpOutline,
    Logout,  
    Close,
    CreditCard
} from '@mui/icons-material';

type Props = {
    isCollapseOpen: boolean;
    setIsCollapseOpen: (value: boolean) => void;
}
const MobileCollapse = ({isCollapseOpen, setIsCollapseOpen}:Props) => {    
    const router = useRouter();
    const [userid, setUserid] = React.useState('');
    const [displayName, setDisplayName] = React.useState('');

    const { data: profile, isLoading } = useProfile(userid);
    useEffect(() => {
        if(!isLoading) {
            if( profile?.hasOwnProperty('firstName') || profile?.hasOwnProperty('lastName')) {
                if(profile?.hasOwnProperty('firstName')){
                    setDisplayName(profile?.firstName);
                }
                if(profile?.hasOwnProperty('lastName')){
                    setDisplayName(profile?.firstName+' '+profile?.lastName);    
                }
            }else if(profile?.hasOwnProperty('email')) {
                const email = profile?.email;
                // before @
                const emailName = email?.split('@')[0];
                setDisplayName(emailName);
            }else{
                setDisplayName('Your Name');
            }            
        }
    }, [profile]);

    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj?.sub) {
            setUserid(userInfoObj?.sub);
          }
        }
    }, []);
    
    const logoutFnc = () => {
        const oneLogInAccessToken = localStorage.getItem('oneLogInAccessToken');
        const googleIndentityAccessToken = localStorage.getItem('googleIndentityAccessToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('oneLogInAccessToken');
        if(googleIndentityAccessToken){
          localStorage.removeItem('googleIndentityAccessToken');
          router.push('/auth');
        }else{
          if(oneLogInAccessToken){
            oidcApi.logoutAuthToken({id_token_hint: oneLogInAccessToken});      
          }else{
            oidcApi.logoutAuth();
          }
        }    
    };

    return (<>
        <div className='fixed left-0 top-0 w-screen h-screen text-white bg-gradient-to-t from-black to-black/80 py-12 px-8 z-50'>
            <div className='flex justify-between items-center mb-8'>
                <div className='flex items-center w-[150px] grow'>
                    <div className='transition w-[64px] h-[64px] mr-[10px] rounded-full p-[3px] bg-gradient-to-tl from-[#3600FF] to-[#72AAFF]'>
                        <img src="/images/pp.jpeg" alt="Name" className='w-full h-full rounded-full'/>
                    </div>
                    <div>
                        <h3
                        className='font-semibold text-xl m-0'>{( displayName )??(displayName)}</h3>
                        <p className='text-base text-white'>
                            <span
                            className='cursor-pointer hover:underline' onClick={
                                () => router.push('/myprofile')
                            }>Edit Profile</span>
                        </p>
                    </div>
                </div> 
                <div className='w-[40px]'>
                    <button className='flex items-center' 
                        onClick={() => {
                            setIsCollapseOpen(false);
                        }}>
                        <Close 
                            sx={{
                                color: 'white',
                                fontSize: '40px',
                            }}
                        />
                    </button>
                </div>    
            </div> 
            <div className="overflow-y-auto overflow-x-hidden h-full">
                <NavItem
                icon={<Search />}
                label={'Search'}
                handleClick={() => {
                    router.push('');
                }}
                activeRoute=''/>
                <NavItem
                icon={<Home />}
                label={'Home'}
                handleClick={() => {
                    router.push('/');
                }}
                activeRoute='/'
                />
                <NavItem
                icon={<Insights />}
                label={'Comming Soon'}
                handleClick={() => {
                    router.push('');
                }}
                activeRoute=''/>
                <NavItem
                icon={<Movie />}
                label={'Movies'}
                handleClick={() => {
                    router.push('');
                }}
                activeRoute=''/>
                <NavItem
                icon={<Category />}
                label={'Categories'}
                handleClick={() => {
                    router.push('');
                }}
                activeRoute=''/>
                <NavItem
                icon={<PlaylistPlay />}
                label={'My List'}
                handleClick={() => {
                    router.push('/list');
                }}
                activeRoute='/list'/>
                <NavItem
                icon={<ShoppingCart />}
                label={'My Tickets'}
                handleClick={() => {
                    router.push('/mytickets');
                }}
                activeRoute='/mytickets'/>
                <NavItem
                icon={<CreditCard />}
                label={'My Card'}
                handleClick={() => {
                    router.push('/mycard');
                }}
                activeRoute='/mycard'/>
                <br />
                <NavItem
                icon={<HelpOutline />}
                label={'Get Help'}
                handleClick={() => {
                    window.open('https://tickets.iwanttfc.com/support', '_blank');
                }}
                activeRoute=''/>
                <NavItem
                icon={<Logout />}
                label={'Logout'}
                handleClick={() => {
                    logoutFnc();
                }}  
                activeRoute=''/>
            </div>
        </div>
    </>);
};
export default MobileCollapse;

type NavItemProps = {
    icon: any;
    label: string;
    handleClick: () => void;
    activeRoute: string;
};
const NavItem = ({ icon, label, handleClick, activeRoute }:NavItemProps) => {
    const router = useRouter();
    return(
        <div className='mb-4'>
            <button className="flex items-center" onClick={handleClick}>
                <span className={`mr-2 border-b-4 ${(router.asPath === activeRoute)?'border-red-600 text-white':'border-transparent text-white/80'} `}>{icon}</span>
                <p className={`text-lg ${(router.asPath === activeRoute)?'font-semibold text-white':'font-normal text-white/80'}`}>{label}</p>
            </button>
        </div>
    );
}   
