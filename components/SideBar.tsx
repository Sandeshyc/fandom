import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import * as oidcApi from 'pages/api/auth/oidcApi';
import {
  Search,
  Home,
  Insights,
  NotificationsNone,
  Movie,
  Category,
  PlaylistPlay,
  ShoppingCart,
  HelpOutline,
  Logout,  
  Close,
  Menu,
  AccountCircle
} from '@mui/icons-material';

interface FlexContainerProps {
  isActive: boolean;
  isHovered: boolean;
  icon: React.ElementType;
  label: string;
  handleClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  isActive,
  isHovered,
  icon: Icon,
  label,
  handleClick,
  handleMouseEnter,
  handleMouseLeave
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginBottom: '1vh',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        color: 'white',
        fontSize: '20px',
      },
    }}
    onClick={handleClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <Icon
      sx={{
        fontSize: '15px',
        width: '30px',
        height: '40px',
        color: isActive || isHovered ? 'white' : 'gray',
        filter: isActive ? 'drop-shadow(5px 5px 20px rgba(255, 255, 255, 0.9))' : 'none',
        transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out, font-size 0.2s ease-in-out',
      }}
    />
    {isHovered && (
      <Box
        sx={{
          color: 'white',
          fontWeight: 'bold',
          marginLeft: '10px',
          filter: isActive ? 'drop-shadow(5px 5px 20px rgba(255, 255, 255, 0.9))' : 'none',
          transition: 'transform 0.2s ease-in-out, font-size 0.2s ease-in-out',
          '&:hover': {
            fontSize: '20px',
          },
        }}>
        {label}
      </Box>
    )}
  </Box>
);

const FlexContainerMobile: React.FC<FlexContainerProps> = ({
  isActive,
  isHovered,
  icon: Icon,
  label,
  handleClick,
  handleMouseEnter,
  handleMouseLeave
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginBottom: '2vh',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        color: 'white',
        fontSize: '20px',
      },
    }}
    onClick={handleClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <Icon
      sx={{
        fontSize: '15px',
        width: '30px',
        height: '40px',
        color: 'white',
        filter: isActive ? 'drop-shadow(5px 5px 20px rgba(255, 255, 255, 0.9))' : 'none',
        transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out, font-size 0.2s ease-in-out',
      }}
    />
    <Box
        sx={{
          color: 'white',
          fontWeight: 'bold',
          marginLeft: '10px',
          filter: isActive ? 'drop-shadow(5px 5px 20px rgba(255, 255, 255, 0.9))' : 'none',
          transition: 'transform 0.2s ease-in-out, font-size 0.2s ease-in-out',
          '&:hover': {
            fontSize: '20px',
          },
        }}>
        {label}
      </Box>
  </Box>
);

const Logo = ({ src}: { src: string}) => {
  const router = useRouter();
  return(
    <img 
    src={src} 
    className="fixed left-0 top-2 h-20 mt-3 cursor-pointer group-hover:left-5 transition-all duration-200" 
    alt="Logo" 
    onClick={() => router.push('/')} />
  );
}

const SideBar: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string>('Home');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    window.location.href = `/${icon}`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
  } 

  const router = useRouter();
  return (
    <>
    <Box
      className="
      lg:hidden
      fixed
      left-0
      top-0
      w-screen
    text-white 
      bg-opacity-80 
      bg-gradient-to-b
      from-black
      to-transparent
      p-2
      px-4
      flex
      justify-between
      items-center
      z-40">
        <Box
          className="
          flex 
          items-center
          justify-start
          w-full">
          <img 
          src="https://d348f57gkrlrz4.cloudfront.net/c/4/images/qTu5vfhisol9Lt3n8WyoMw.png" 
          className="w-[50px]" 
          alt="Logo" onClick={() => router.push('/')} />
          <p
            className="text-1xl font-bold"
          >Tickets</p>
        </Box>
        <Box className="">
          <Menu 
            className="cursor-pointer text-white text-2xl"
            onClick={() => setIsMobileMenu(true)}
          >Menu</Menu>
        </Box>
    </Box>
    <Box
      className={ `fixed left-0 top-0 bg-black bg-opacity-90 w-screen h-screen z-50 p-2 pt-2 px-4 ${(isMobileMenu)?'block':'hidden'} block lg:hidden` }>
      <Box
        className="
        w-full
      text-white 
        bg-opacity-80 
        bg-gradient-to-b
        from-black
        to-transparent
        flex
        mb-10
        justify-between
        items-center">
          <Box
            className="
            flex 
            items-center
            justify-start
            w-full">
            <img 
            src="https://d348f57gkrlrz4.cloudfront.net/c/4/images/qTu5vfhisol9Lt3n8WyoMw.png" 
            className="w-[50px]" 
            alt="Logo" onClick={() => router.push('/')} />
            <p
              className="text-1xl font-bold"
            >Tickets</p>
          </Box>
          <Box className="">
            <Close 
              className="cursor-pointer text-white text-3xl"
              onClick={() => setIsMobileMenu(false)}
            >Close</Close>
          </Box>
      </Box>
      <Box className="overflow-y-auto h-full">
        <FlexContainerMobile
          isActive={activeIcon === 'Search'}
          isHovered={isHovered}
          icon={Search}
          label="Search"
          // handleClick={() => handleIconClick('Search')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'Home'}
          isHovered={isHovered}
          icon={Home}
          label="Home"
          handleClick={() => router.push('/')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'Upcoming'}
          isHovered={isHovered}
          icon={Insights}
          label="Coming Soon"
          handleClick={() => handleIconClick('upcoming')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'Public'}
          isHovered={isHovered}
          icon={Movie}
          label="Movies"
          // handleClick={() => handleIconClick('series')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'Public'}
          isHovered={isHovered}
          icon={Category}
          label="Categories"
          // handleClick={() => handleIconClick('series')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'Public'}
          isHovered={isHovered}
          icon={PlaylistPlay}
          label="My List"
          handleClick={() => handleIconClick('list')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={ShoppingCart}
          label="My Purchase"
          handleClick={() => router.push('/purchase')}
        />
        <br />
        <FlexContainerMobile
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={NotificationsNone}
          label="Notifications"
          // handleClick={() => handleIconClick('Live')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={HelpOutline}
          label="Get Help"
          // handleClick={() => handleIconClick('Live')}
          />
        <FlexContainerMobile
          isActive={activeIcon === 'Sports'}
          isHovered={isHovered}
          icon={AccountCircle}
          label="My Profile"
          handleClick={() => handleIconClick('myprofile')}
        />
        <FlexContainerMobile
          isActive={activeIcon === 'Sports'}
          isHovered={isHovered}
          icon={Logout}
          label="Logout"
          handleClick={() => logoutFnc()}
        />
      </Box>
    </Box>
    <Box
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // paddingLeft: '30px',
        // paddingRight: '20px',
        position: 'fixed',
        zIndex: 999999999,
        top: '0',
        // paddingTop: "10%",
        paddingTop: '100px',
        transition: 'all 0.2s ease-in-out',
        width: "auto",
        backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0) 100%)',
      }}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={ `group pl-1 pr-1 fixed bg-opacity-90 w-auto h-screen hover:pl-7 hover:pr-4 z-40 hidden lg:block bg-opacity-50 
      bg-gradient-to
      from-black
      to-transparent` }>
      <Logo src="https://d348f57gkrlrz4.cloudfront.net/c/4/images/qTu5vfhisol9Lt3n8WyoMw.png" />
      <Box>
        <FlexContainer
          isActive={activeIcon === 'Search'}
          isHovered={isHovered}
          icon={Search}
          label="Search"
          // handleClick={() => handleIconClick('Search')}
        />
        <FlexContainer
          isActive={activeIcon === 'Home'}
          isHovered={isHovered}
          icon={Home}
          label="Home"
          handleClick={() => router.push('/')}
        />
        <FlexContainer
          isActive={activeIcon === 'Upcoming'}
          isHovered={isHovered}
          icon={Insights}
          label="Coming Soon"
          handleClick={() => handleIconClick('upcoming')}
        />
        <FlexContainer
          isActive={activeIcon === 'Public'}
          isHovered={isHovered}
          icon={Movie}
          label="Movies"
          // handleClick={() => handleIconClick('series')}
        />
        <FlexContainer
          isActive={activeIcon === 'Public'}
          isHovered={isHovered}
          icon={Category}
          label="Categories"
          // handleClick={() => handleIconClick('series')}
        />
        <FlexContainer
          isActive={activeIcon === 'list'}
          isHovered={isHovered}
          icon={PlaylistPlay}
          label="My List"
          handleClick={() => handleIconClick('list')}
        />
        <FlexContainer
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={ShoppingCart}
          label="My Purchase"
          handleClick={() => router.push('/purchase')}
        />
        <br />
        <FlexContainer
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={NotificationsNone}
          label="Notifications"
          // handleClick={() => handleIconClick('Live')}
        />
        <FlexContainer
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={HelpOutline}
          label="Get Help"
          // handleClick={() => handleIconClick('Live')}
        />
        <FlexContainer
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={AccountCircle}
          label="My Profile"
          handleClick={() => handleIconClick('myprofile')}
        />
        <FlexContainer
          isActive={activeIcon === 'Sports'}
          isHovered={isHovered}
          icon={Logout}
          label="Logout"
          handleClick={() => logoutFnc()}
        />
      </Box>
    </Box>
    </>
  );
};

export default SideBar;
