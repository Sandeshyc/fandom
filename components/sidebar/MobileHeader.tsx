import React from 'react';
import { useRouter } from 'next/router';
import {
    Close,
    Menu,
} from '@mui/icons-material';
const logoSrc = '/images/logoofbini.png';
type  MobileHeaderProps = {
    showMenu: boolean,
    setShowMenu: (showMenu: boolean) => void,
}
const MobileHeader = ({
      showMenu,
      setShowMenu,
    }: MobileHeaderProps) => {
    const router = useRouter();
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    }
    return (
      <div className="lg:hidden fixed left-0 top-0 w-full text-white  bg-gradient-to-b from-black from-45% to-transparent to-95% p-2 flex justify-between items-center z-40">
        <div className="flex items-center justify-start w-full">
          <img src={logoSrc} className="h-[40px] sm:h-[55px] mr-1 cursor-pointer" alt="Logo" onClick={() => router.push('/')} />
          <p className="text-1xl font-bold">iWantTFC Tickets</p>
        </div>
        <div className="ml-1">
            {(showMenu)?(<Close 
            onClick={toggleMenu}
            sx={{
              fontSize: '25px',
              width: '30px',
              height: '30px',
              color: '#f00',
              cursor: 'pointer',
            }}/>):(<Menu 
            onClick={toggleMenu}
            sx={{
              fontSize: '25px',
              width: '30px',
              height: '30px',
              color: '#fff',
              cursor: 'pointer',
            }}/>)}
        </div>
    </div>
    );
};
export default MobileHeader;