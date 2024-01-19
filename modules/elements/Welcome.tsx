import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import {
    CloseOutlined, 
    FacebookOutlined,
    Twitter,
    MailOutlined,
    Reddit,
} from '@mui/icons-material';
const Welcome = () => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
        <Modal
        open={open}
        aria-labelledby="Social Share Modal"
        aria-describedby="Socail Share Modal"
        onClose={handleClose}
        className='flex justify-center items-center'>
          <div className='rounded-md w-[90%] max-w-[720px] bg-[#262626] relative text-white'>
            <button
            onClick={handleClose}
            className='absolute top-0 right-2 text-white text-4xl font-semibold'>
              <CloseOutlined/>
            </button>
            <div className="text-center p-4 pt-8">
                <h3 className="text-white text-2xl font-semibold">
                    Welcome to the iWantTFC Tickets.
                </h3>
            </div>
        </div>
      </Modal>
        </>
    );
};
export default Welcome;