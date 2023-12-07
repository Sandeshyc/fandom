import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSavedPagesStore from '@/hooks/useSavedPagesStore';
import useCurrentPageStore, {layoutType} from '@/hooks/useCurrentPageStore';
import useReorderLayout from '@/hooks/useReorderLayout';
import {
  Public,
  Devices as Phone,
} from '@mui/icons-material';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon, PencilSquareIcon, ArrowUpTrayIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { BsFillSaveFill } from 'react-icons/bs';
import { FaExchangeAlt } from 'react-icons/fa';
import { Button } from '@mui/material';

import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import Tooltip from '@/components/elements/Tooltip';
import Toast, { useToast } from "@/components/elements/Toast";

const TOP_OFFSET = 66;



const Navbar = () => {
  const router = useRouter();
  const {savedPages = [], setSavedPages} = useSavedPagesStore();
  const {currentLayout =  {} as layoutType, setCurrentLayout} = useCurrentPageStore();
  const {openModal} = useReorderLayout();

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [showDevice, setShowDevice] = useState(false);

  const {isOpen: toastIsOpen, closeModal: toastCloseModal, openModal: toastOpenModal} = useToast();


  useEffect(() => {
    setShowBackground(false)
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
    
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  }

  const toggleRegion = () => {
    setShowRegion(!showRegion)
    setShowDevice(false)
  }

  const toggleDevice = () => {
    setShowDevice(!showDevice)
    setShowRegion(false)
  }


  // get current path name
  const currentPath = router.pathname.split('/')[1];
  let isEditScreen = false;
  if(currentPath === 'edit') {
    isEditScreen = true;
  }

  const handleLayoutSave = useCallback ((e) => {
    e.preventDefault();
    toastOpenModal({
      type: 'info',
      message: 'Layout Saved Successfully!'
    });
    setSavedPages(currentLayout);
  }, [currentLayout, savedPages]);

  const handleLayoutPublish = useCallback ((e) => {
    e.preventDefault();
    toastOpenModal({
      type: 'success',
      message: 'Layout Published Successfully!'
    });
    setSavedPages(currentLayout);
  }, [currentLayout, savedPages]);

  return (
    <div style={{position:"relative", zIndex: 999}}>

<div className="w-full fixed z-40">
    { !isEditScreen ? null :  
        <div style={ isEditScreen ? { justifyContent:"end", height:"60px"}: {}} className={`px-4 md:px-2 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <div style={{ display:"flex", justifyContent:"end" }} className={`px-1 py-10 flex-row transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : 'mainNav'}`}>
        <div style={{ marginRight:"20px"}} className="flex flex-row items-center gap-2 cursor-pointer relative">
        <div onClick={ toggleOptions} className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
        <Phone style={{width:"40px", height:"40px", color:"white"}}/>
        </div>
        <ChevronDownIcon className={`w-4 text-white fill-white transition ${showOptions ? 'rotate-180' : 'rotate-0'}`} />
        {/* <AccountMenu visible={showAccountMenu} /> */}
        {showOptions && (
        <div className="bg-black w-56 absolute top-14 right-0 py-2 flex-col border-2 border-gray-800 flex">
        <div onClick={() => toggleRegion()} className="flex flex-row items-center gap-2 cursor-pointer relative" style={{color:"white",display:"flex", justifyContent:"center",}}>
          Region
        <ChevronDownIcon className={`w-4 text-white fill-white transition ${showRegion ? 'rotate-180' : 'rotate-0'}`} />
        {showRegion && (
          <>
        <div style={{ left: 220}} className="bg-black w-56 absolute top-0 right-0 py-2 flex-col border-2 border-gray-800 flex">
        <div style={{color:"white",display:"flex", justifyContent:"center",}}>United States</div>
        <hr className="bg-gray-600 border-0 h-px my-2" />
        <div style={{color:"white",display:"flex", justifyContent:"center", }}>Filipino</div>
        <hr className="bg-gray-600 border-0 h-px my-2" />
        <div style={{color:"white",display:"flex", justifyContent:"center"}}>Others</div>
        </div>

          
          </>
        )}
        </div>
        <hr className="bg-gray-600 border-0 h-px my-2" />
        <div onClick={() => toggleDevice()} className="flex flex-row items-center gap-2 cursor-pointer relative" style={{color:"white",display:"flex", justifyContent:"center",}}>
          Devices
        <ChevronDownIcon className={`w-4 text-white fill-white transition ${showDevice ? 'rotate-180' : 'rotate-0'}`} />
        {showDevice && (
          <>
        <div style={{ left: 220}} className="bg-black w-56 absolute top-0 right-0 py-2 flex-col border-2 border-gray-800 flex">
        <div style={{color:"white",display:"flex", justifyContent:"center",}}>Mobile</div>
        <hr className="bg-gray-600 border-0 h-px my-2" />
        <div style={{color:"white",display:"flex", justifyContent:"center", }}>Desktop</div>
        <hr className="bg-gray-600 border-0 h-px my-2" />
        <div style={{color:"white",display:"flex", justifyContent:"center"}}>CTV</div>
        </div>

          
          </>
        )}
        </div>
        </div>
        )}
        </div>
            <Tooltip  message="Layout Management" >
            <Button variant="contained" style={{marginRight:"20px", width:"100px"}} onClick={openModal}>Layout</Button>

            </Tooltip>
            <Button variant="contained" style={{marginRight:"20px", width:"100px"}} onClick={handleLayoutSave}>Save</Button>
              
            <Button variant="contained" style={{marginRight:"20px", width:"100px"}} onClick={handleLayoutPublish}>Publish</Button>

            </div>
            </div>

          }
          </div>
      <nav style={{top: !isEditScreen ? "0px" : "60px"}} className="w-full fixed z-39">
        <div style={ isEditScreen ? { justifyContent:"end"}: {}} className={`px-4 md:px-2 py-1 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : 'mainNav'}`}>
         <>
          <img src="https://d348f57gkrlrz4.cloudfront.net/c/4/images/qTu5vfhisol9Lt3n8WyoMw.png" className="h-20 lg:h-18 cursor-pointer" alt="Logo" onClick={() => router.push('/') } />
          <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem label="Home" active={router.pathname === '/'} onClick={() => router.push('/') }/>
            <NavbarItem label="Series" />
            <NavbarItem label="Films" />
            {/* <NavbarItem label="New & Popular" active={router.pathname === '/popular'} onClick={() => router.push('/popular/') } /> */}
            <NavbarItem label="My List" />
            <NavbarItem label="Browse by Languages" />
          </div>
          <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
            <MobileMenu visible={showMobileMenu} />
          </div>
          <div className="flex flex-row ml-auto gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
              <MagnifyingGlassIcon className="w-6" />
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
              <BellIcon className="w-6" />
            </div>
            
            <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-blue.png" alt="" />
              </div>
              <ChevronDownIcon className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
              <AccountMenu visible={showAccountMenu} />
            </div>

          </div>
          </>  
        </div>
        
      </nav>
      
      <Toast visible={toastIsOpen} onClose={toastCloseModal} />
    </div>
  )
}

export default Navbar;
