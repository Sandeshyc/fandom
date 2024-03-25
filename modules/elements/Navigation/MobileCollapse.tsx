import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import useProfile from '@/hooks/useProfile';
import * as oidcApi from 'pages/api/auth/oidcApi';
import checkAuthentication from '@/utils/checkAuth';
import {
    Search,
    CloseOutlined,
    Home,
    Insights,
    Movie,
    Category,
    PlaylistPlay,
    ShoppingCart,
    HelpOutline,
    Logout,  
    Close,
    CreditCard, 
    NotificationsOutlined,
    PersonOutlineOutlined,
    LiveTvOutlined,
    PaymentsOutlined
} from '@mui/icons-material';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

type Props = {
    isCollapseOpen: boolean;
    setIsCollapseOpen: (value: boolean) => void;
}
const MobileCollapse = ({isCollapseOpen, setIsCollapseOpen}:Props) => {    
    const router = useRouter();
    const [userid, setUserid] = React.useState('');
    const [displayName, setDisplayName] = React.useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        const _checkAuthentication = async () => {
            const isAuthenticated = await checkAuthentication();
            setIsAuthenticated(isAuthenticated);
          }
          _checkAuthentication();
    }, []);
    
    const logoutFnc = () => {
        const provider = localStorage.getItem('provider');
        const oneLogInAccessToken = localStorage.getItem('oneLogInAccessToken');
        const googleIndentityAccessToken = localStorage.getItem('googleIndentityAccessToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('oneLogInAccessToken');
        if(provider === 'oneLogin'){
            if(oneLogInAccessToken){
                oidcApi.logoutAuthToken({id_token_hint: oneLogInAccessToken});      
            }else{
                oidcApi.logoutAuth();
            }            
        }else{
            const _signOut = async () => {
                await signOut(getAuth()).then(() => {
                    console.log('signout');
                    localStorage.removeItem('googleIndentityAccessToken');
                    // router.push('/');
                    window.location.replace(window.location.href);
                }
                ).catch((error) => {
                    console.log('signout error', error);
                    localStorage.removeItem('googleIndentityAccessToken');
                    router.push('/auth');
                });
            }
            _signOut();
        }   
    };

    return (<>
        <div className='fixed left-0 top-0 w-screen h-screen text-white bg-gradient-to-t from-black to-black/80 pt-6 pb-12 px-8 z-50'>
            <div className='flex justify-end items-center mb-6'>
                {(isAuthenticated)&&
                    <div className='flex items-center w-[150px] grow'>
                        <div className='transition w-[64px] h-[64px] mr-[10px] rounded-full p-[3px] bg-gradient-to-tl from-[#3600FF] to-[#72AAFF]'>
                            <img src="/images/pp.jpeg" alt="Name" className='w-full h-full rounded-full'/>
                        </div>
                        <div>
                            <h3
                            className='font-semibold text-md md:text-xl m-0'>{( displayName )??(displayName)}</h3>
                            <p className='text-sm md:text-base text-white'>
                                <span
                                className='cursor-pointer hover:underline' onClick={
                                    () => router.push('/myprofile')
                                }>Edit Profile</span>
                            </p>
                        </div>
                    </div> 
                }
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
            <div className="overflow-y-auto overflow-x-hidden h-full pb-8">
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
                label={'Upcoming'}
                handleClick={() => {
                    router.push('/upcoming');
                }}
                activeRoute='/upcoming'/>
                <NavItem
                icon={<Movie />}
                label={'Movies'}
                handleClick={() => {
                    router.push('/movies');
                }}
                activeRoute='/movies'/>
                <NavItem
                icon={<LiveTvOutlined />}
                label={'TV Shows'}
                handleClick={() => {
                    router.push('/season');
                }}
                activeRoute='/season'/>
                <NavItem
                icon={<LiveTvOutlined />}
                label={'Channel'}
                handleClick={() => {
                    router.push('');
                }}
                activeRoute=''/>
                <NavItem
                icon={<LiveTvOutlined />}
                label={'Events'}
                handleClick={() => {
                    router.push('');
                }}
                activeRoute=''/>
                {(isAuthenticated)&&
                    <>
                    <NavItem
                    icon={<ShoppingCart />}
                    label={'My Tickets'}
                    handleClick={() => {
                        router.push('/mytickets');
                    }}
                    activeRoute='/mytickets'/>
                    <NavItem
                    icon={<PaymentsOutlined />}
                    label={'Billing Details'}
                    handleClick={() => {
                        router.push('/billing-details');
                    }}
                    activeRoute='/billing-details'/> 
                    <NavItem
                    icon={<PlaylistPlay />}
                    label={'My List'}
                    handleClick={() => {
                        router.push('/list');
                    }}
                    activeRoute='/list'/>
                    <NavItem
                    icon={<PersonOutlineOutlined />}
                    label={'Manage Account'}
                    handleClick={() => {
                        router.push('/myprofile');
                    }}
                    activeRoute='/myprofile'/>               
                    <NavItem
                    icon={<CreditCard />}
                    label={'Manage Card'}
                    handleClick={() => {
                        router.push('/mycard');
                    }}
                    activeRoute='/mycard'/>
                    </>
                }
                
                <br />
                <NavItem
                icon={<HelpOutline />}
                label={'Get Help'}
                handleClick={() => {
                    window.open('https://iconnconvergence-support.freshdesk.com/support/home', '_blank');
                }}
                activeRoute=''/>
                {(isAuthenticated)&&
                    <NavItem
                    icon={<Logout />}
                    label={'Logout'}
                    handleClick={() => {
                        logoutFnc();
                    }}  
                    activeRoute=''/>
                }
                
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
                <p className={`text-lg ${(router.asPath === activeRoute)?'font-medium text-white':'font-normal text-white/80'}`}>{label}</p>
            </button>
        </div>
    );
}   
