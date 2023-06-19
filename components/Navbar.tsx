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

  const toggleRegion = () => {
    setShowRegion(!showRegion)
  }

  const toggleDevice = () => {
    setShowDevice(!showDevice)
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
    <>
      <nav className="w-full fixed z-40">
        <div className={`px-4 md:px-16 py-3 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : 'mainNav'}`}>
          <img src="https://d348f57gkrlrz4.cloudfront.net/c/4/images/qTu5vfhisol9Lt3n8WyoMw.png" className="h-20 lg:h-18 cursor-pointer" alt="Logo" onClick={() => router.push('/') } />
          <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem label="Home" active={router.pathname === '/'} onClick={() => router.push('/') }/>
            <NavbarItem label="Series" />
            <NavbarItem label="Films" />
            <NavbarItem label="New & Popular" active={router.pathname === '/popular'} onClick={() => router.push('/popular/') } />
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

            <div onClick={() => toggleRegion()} className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Public style={{width:"40px", height:"40px", color:"white"}}/>
              </div>
              <ChevronDownIcon className={`w-4 text-white fill-white transition ${showRegion ? 'rotate-180' : 'rotate-0'}`} />
              {/* <AccountMenu visible={showAccountMenu} /> */}
             {showRegion && (
              <div className="bg-black w-56 absolute top-14 right-0 py-2 flex-col border-2 border-gray-800 flex">
              <div style={{color:"white",display:"flex", justifyContent:"center",}}>United States</div>
              <hr className="bg-gray-600 border-0 h-px my-2" />
              <div style={{color:"white",display:"flex", justifyContent:"center", }}>Filipino</div>
              <hr className="bg-gray-600 border-0 h-px my-2" />
              <div style={{color:"white",display:"flex", justifyContent:"center"}}>Others</div>
            </div>
             )}
            </div>
            <div onClick={() => toggleDevice()} className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Phone style={{width:"40px", height:"40px", color:"white"}}/>
              </div>
              <ChevronDownIcon className={`w-4 text-white fill-white transition ${showDevice ? 'rotate-180' : 'rotate-0'}`} />
              {/* <AccountMenu visible={showAccountMenu} /> */}
             {showDevice && (
              <div className="bg-black w-56 absolute top-14 right-0 py-2 flex-col border-2 border-gray-800 flex">
              <div style={{color:"white",display:"flex", justifyContent:"center",}}>Mobile</div>
              <hr className="bg-gray-600 border-0 h-px my-2" />
              <div style={{color:"white",display:"flex", justifyContent:"center", }}>Desktop</div>
              <hr className="bg-gray-600 border-0 h-px my-2" />
              <div style={{color:"white",display:"flex", justifyContent:"center"}}>CTV</div>
            </div>
             )}
            </div>
            <div className='editPlaylist flex flex-nowrap gap-4'>
              {!isEditScreen ? (
                <>
                  <Tooltip message="Edit" >
                    <button className='editPlaylistButton text-white w-11 text-bold-700 bg-blue-400 px-2 py-1.5 rounded-md hover:bg-blue-500' onClick={() => router.push('/edit/' + currentPath) } >
                    <PencilSquareIcon/>
                    </button>
                  </Tooltip>
                </>
              ):(
                <>
                  <Tooltip message="Reorder layout" >
                    <button className='editPlaylistButton text-white  bg-blue-500 px-2 py-1.5 rounded-md hover:bg-blue-400' onClick={openModal} >
                    <FaExchangeAlt className='w-7 transform rotate-90'/>
                    </button>
                  </Tooltip>
                  <Tooltip message="Save" >
                    <button className='editPlaylistButton text-white text-2xl text-bold-700 bg-blue-400 px-2 py-1.5 rounded-md hover:bg-blue-500' onClick={handleLayoutSave}  >
                    <BsFillSaveFill/>
                    </button>
                  </Tooltip>
                  <Tooltip message="Publish" >
                    <button className='editPlaylistButton text-white  bg-teal-500 px-2 py-1.5 rounded-md hover:bg-teal-600' onClick={handleLayoutPublish}>
                    <ArrowUpTrayIcon className='w-7 '/>
                    </button>
                  </Tooltip>
                  
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Toast visible={toastIsOpen} onClose={toastCloseModal} />
    </>
  )
}

export default Navbar;
