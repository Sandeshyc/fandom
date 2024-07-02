import React, {use, useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import {
    CloseOutlined, 
    Sync,
    WarningAmberOutlined
} from '@mui/icons-material';
import {generateQRcode} from '@/services/api';

type Props = {
    open: boolean;
    setOpen: any;
    email: string;
};
const GenerateQRcode = ({open, setOpen, email}:Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qrCode, setQrCode] = useState('');
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const _generateQRcode = async () => {
            const response = await generateQRcode(email);
            // console.log('response::::::::', response);
            if((response.status?.toLowerCase()) === 'success') {
                setQrCode(response.data);
            }
            setIsLoading(false);
        };
        if(email) {
            _generateQRcode();
        }
    }, [email]);
    return (        
        <Modal
        open={open}
        aria-labelledby="Generate QR Code Modal"
        aria-describedby="Generate QR Code Modal"
        onClose={handleClose}
        className='flex justify-center items-center'>
          <div className='rounded-md w-[90%] max-w-[540px] bg-[#11355E] text-white relative min-h-[420px] flex justify-center items-center'>            
            <button
            onClick={handleClose}
            className='absolute top-0 right-0 first-letter:text-4xl font-semibold'>
              <CloseOutlined 
                sx={{
                    fontSize: '28px',
                    color: '#fff',
                }}
              />
            </button>
            <div className="text-center p-2 pt-8">
                {(isLoading) ? (
                    <div className="flex flex-col items-center justify-center">
                        <Sync
                        sx={{
                            fontSize: '45px',
                            color: '#fff',
                            marginBottom: '5px',
                        }}
                        className='animate-spin'
                        />
                        <p className='text-base'>Loading...</p>
                    </div>
                ) : (
                    <>
                        {(qrCode) ? (
                            <img src={qrCode} alt="QR Code" className="w-full max-h-[420px] object-contain mx-auto"/>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <WarningAmberOutlined
                                sx={{
                                    fontSize: '45px',
                                    color: '#F4CF04',
                                    marginBottom: '5px',
                                }}/>
                                <p className='text-base'>
                                    Something went wrong. Please try again later.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
      </Modal>
    );
};
export default GenerateQRcode;