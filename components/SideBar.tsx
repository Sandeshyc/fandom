import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
  Public,
  Search,
  Home,
  Radio,
  Tv,
  SportsBaseball,
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
      marginBottom: '4vh',
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
        }}
      >
        {label}
      </Box>
    )}
  </Box>
);

const Logo = ({ src}: { src: string}) => (
  <img src={src} className="fixed left-0 top-2 h-20 mt-3 cursor-pointer group-hover:left-5 transition-all duration-200" alt="Logo" onClick={() => navigate('/') } />
);

const SideBar: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string>('Home');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleIconClick = (icon: string) => {
    // setActiveIcon(icon);
    window.location.href = `/${icon}`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
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
        height:"100%",
        backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0) 100%)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group pl-1 pr-1 hover:pl-7 hover:pr-4"
    >
      <Logo src="https://d348f57gkrlrz4.cloudfront.net/c/4/images/qTu5vfhisol9Lt3n8WyoMw.png" />
      <Box>
        <FlexContainer
          isActive={activeIcon === 'Home'}
          isHovered={isHovered}
          icon={Home}
          label="Home"
          handleClick={() => handleIconClick('home')}
        />

        <FlexContainer
          isActive={activeIcon === 'Public'}
          isHovered={isHovered}
          icon={Public}
          label="Web Series"
          handleClick={() => handleIconClick('series')}
        />
        <FlexContainer
          isActive={activeIcon === 'TV'}
          isHovered={isHovered}
          icon={Tv}
          label="Live"
          handleClick={() => handleIconClick('Live')}
        />

        <FlexContainer
          isActive={activeIcon === 'Sports'}
          isHovered={isHovered}
          icon={SportsBaseball}
          label="Sports"
          handleClick={() => handleIconClick('Sports')}
        />

        <FlexContainer
          isActive={activeIcon === 'Search'}
          isHovered={isHovered}
          icon={Search}
          label="Search"
          handleClick={() => handleIconClick('Search')}
        />
      </Box>
      <Box></Box>
    </Box>
  );
};

export default SideBar;
