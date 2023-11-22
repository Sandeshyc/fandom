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
import MobileHeader from './sidebar/MobileHeader';
import { type } from 'os';

const logoSrc = '/images/logonew.png';

const SideBar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
  }, []);

  return (
    <>
    <MobileHeader showMenu={showMenu} setShowMenu={setShowMenu}/>
    <div className={ `fixed left-0 top-0 bg-black bg-opacity-90 w-screen h-screen z-50 p-2 ${(showMenu)?'block':'hidden'} block lg:hidden` }>
      <MobileHeader showMenu={showMenu} setShowMenu={setShowMenu}/>
    </div>
    </>
  );
};
export default SideBar;


