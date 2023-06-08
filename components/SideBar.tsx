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
      marginBottom: '45px',
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

const SideBar: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string>('Home');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: '30px',
        paddingRight: '20px',
        position: 'fixed',
        zIndex: 999999999,
        top: '0',
        paddingTop: "17%",
        transition: 'background-color 0.2s ease-in-out',
        width: "auto",
        height:"100%",
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FlexContainer
        isActive={activeIcon === 'Home'}
        isHovered={isHovered}
        icon={Home}
        label="Home"
        handleClick={() => handleIconClick('Home')}
      />
      <FlexContainer
        isActive={activeIcon === 'Search'}
        isHovered={isHovered}
        icon={Search}
        label="Search"
        handleClick={() => handleIconClick('Search')}
      />
      <FlexContainer
        isActive={activeIcon === 'Public'}
        isHovered={isHovered}
        icon={Public}
        label="My Space"
        handleClick={() => handleIconClick('Public')}
      />
      <FlexContainer
        isActive={activeIcon === 'TV'}
        isHovered={isHovered}
        icon={Tv}
        label="TV"
        handleClick={() => handleIconClick('TV')}
      />
      <FlexContainer
        isActive={activeIcon === 'Radio'}
        isHovered={isHovered}
        icon={Radio}
        label="Movies"
        handleClick={() => handleIconClick('Radio')}
      />
      <FlexContainer
        isActive={activeIcon === 'Sports'}
        isHovered={isHovered}
        icon={SportsBaseball}
        label="Sports"
        handleClick={() => handleIconClick('Sports')}
      />
    </Box>
  );
};

export default SideBar;
