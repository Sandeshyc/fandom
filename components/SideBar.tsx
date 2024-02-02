import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
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

const logoSrc = '/images/logonew.png';
interface FlexContainerProps {
  isActive: boolean;
  isHovered: boolean;
  icon: React.ElementType;
  label: string;
  handleClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}
const SearchBox = (
  {isShow}: {isShow: boolean}
  ) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(24);
  const [pageSize, setPageSize] = React.useState(24);
  const [offset, setOffset] = React.useState(0);  
  const submitSearch = (e) => {
    e.preventDefault();
    if(title === '' || title === undefined || title === null) {
      setIsInvalid(true);    
    }else{
      setIsInvalid(false);
      router.push(`/search?title=${title}&page=${page}&limit=${limit}&pageSize=${pageSize}&offset=${offset}`);
    }
  }
  return(<>
    {(isShow)?
    <div className="mb-6 mt-[-15px]">
      <div
        className='w-[250px]'>
        <form 
          className={`w-full bg-gray-600 text-white rounded-md focus:outline-none flex ${(isInvalid && !title)?'border-red-800 border shadow  shadow-orange-700':''}`}>
          <input 
            type="text" 
            className="w-full bg-transparent text-white rounded-md px-4 py-2 focus:outline-none focus:border-transparent pr-[55px]" 
            placeholder="Search title here" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          <button
            type='submit'
            className="h-[50px] active:opacity-65"
            onClick={submitSearch}>
              <SearchIcon className="text-gray-400 w-6 h-6" />
          </button>
        </form>
      </div>
    </div>:null
    }
    </>
  );
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
      marginBottom: '2vh',
      transition: 'transform 0.2s ease-in-out',
      color: isActive || isHovered ? 'white' : '#ddd',
      '&:hover': {
        transform: 'translateY(-3px)',
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
        color: 'inherit',
        filter: isActive ? 'drop-shadow(5px 5px 20px rgba(255, 255, 255, 0.9))' : 'none',
        transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out, font-size 0.2s ease-in-out',
      }}
    />
    {isHovered && (
      <Box
        sx={{
          color: isActive? 'white' : '#ddd',
          fontWeight: 'bold',
          marginLeft: '10px',
          fontSize: '2vh',
          filter: isActive ? 'drop-shadow(5px 5px 20px rgba(255, 255, 255, 0.9))' : 'none',
          transition: 'transform 0.2s ease-in-out, font-size 0.2s ease-in-out',
          '&:hover': {
            color: '#fff',
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
        color: isActive ?'white':'#bbb',
        filter: isActive ? 'drop-shadow(5px 5px 20px rgba(255, 255, 255, 0.9))' : 'none',
        transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out, font-size 0.2s ease-in-out',
      }}
    />
    <Box
        sx={{
          color: isActive ?'white':'#bbb',
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
  const router = useRouter();
  const [activeIcon, setActiveIcon] = useState<string>('Home');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
  const [isSearchBox, setIsSearchBox] = useState<boolean>(false);
  // console.log('activeIcon', activeIcon)
  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    window.location.href = `/${icon}`;
  };

  const handleSearchExpand = () => {
    const currentPath = router.pathname;
    if(currentPath === '/search'){
      setIsSearchBox(false);
    }else{
      setIsSearchBox(true);
    }
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

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setActiveIcon('Home');
    } else if (path === '/upcoming') {
      setActiveIcon('Upcoming');
    } else if (path === '/list') {
      setActiveIcon('list');
    } else if (path === '/myprofile') {
      setActiveIcon('myprofile');
    } else if (path === '/purchase') {
      setActiveIcon('purchase');
    } else if (path === '/search') {
      setActiveIcon('search');
    } else {
      setActiveIcon('Home');
    }
  }, []);

  return (
    <>
    {/* <SearchBox/> */}
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
          src="/images/logonew.png" 
          className="h-[50px]" 
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
            src="/images/logonew.png" 
            className="h-[50px]" 
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
          isActive={activeIcon === 'search'}
          isHovered={isHovered}
          icon={Search}
          label={'Search'}
          handleClick={() => handleSearchExpand()}
        />
        <SearchBox isShow={isSearchBox}/>
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
          isActive={activeIcon === 'list'}
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
        // paddingTop: '100px',
        transition: 'all 0.2s ease-in-out',
        width: "auto",
        // backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0) 100%)',
      }}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
      group pl-1 pr-4 fixed w-auto h-screen hover:pl-7 hover:pr-7 z-40 hidden lg:block
      bg-gradient-to-r from-black from-80% to-transparent to-95% pt-[80px] hover:pt-[110px] transition-all`}
      >
      {/* <Logo src={"/images/logonew.png"} /> */}
      <img 
      src={"/images/logonew.png"} 
      className="fixed left-0 top-2 h-[50px] group-hover:h-[90px] mt-3 cursor-pointer group-hover:left-5 transition-all duration-200" 
      alt="Logo" 
      onClick={() => router.push('/')} />
      <Box className="h-full mt-4">
        <FlexContainer
          isActive={activeIcon === 'search'}
          isHovered={isHovered}
          icon={Search}
          label={'Search'}
          handleClick={() => handleSearchExpand()}
        />
        <SearchBox isShow={isSearchBox}/>
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
          label={"My List"}
          handleClick={() => handleIconClick('list')}
        />
        <FlexContainer
          isActive={activeIcon === 'purchase'}
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
          isActive={activeIcon === 'myprofile'}
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
