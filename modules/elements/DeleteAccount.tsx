import React, {use, useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import {
    CloseOutlined, 
    DeleteOutlineOutlined,
    WarningAmberOutlined
} from '@mui/icons-material';
type Props = {
    open: boolean;
    setOpen: any;
};
const DeleteAccount = ({open, setOpen}:Props) => {
    const [userId, setUserId] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteAccount = (tempUserId:string) => {  
        setIsDeleting(true);      
        const deleteAccountAllData = async (tempUserId:string) => {
            const headers = {
                'Content-Type': 'application/json',
            };      
            const dataBody = {
                "userId": tempUserId,
            };
            // console.log('dataBody', dataBody);
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/info`, { headers, data: dataBody })
            .then(response => {
                // console.log('Delete response: ', response);
                if(response.status === 200) {
                    window.localStorage.removeItem('userInfo');
                    window.localStorage.removeItem('oneLogInAccessToken');
                    window.localStorage.removeItem('googleIndentityAccessToken');
                    window.localStorage.removeItem('provider');
                    window.location.replace('/auth');
                    handleClose();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        if(!tempUserId){
            const userInfo = window.localStorage.getItem('userInfo');
            if(userInfo) {
                const userInfoObj = JSON.parse(userInfo);
                if(userInfoObj.sub) {
                    deleteAccountAllData(userInfoObj.sub);
                }
            }
        }else{
            deleteAccountAllData(tempUserId);
        }
    }

    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        if(userInfo) {
            const userInfoObj = JSON.parse(userInfo);
            const tempUserId = userInfoObj?.sub;
            // console.log('tempUserId', tempUserId);
            if(tempUserId) {
                // console.log('tempUserId if', tempUserId);
                setUserId(tempUserId);
                // console.log('userId', userId);
            }
        }
        // console.log('userId', userId);
    }, []);

    return (        
        <Modal
        open={open}
        aria-labelledby="Delete Account Modal"
        aria-describedby="Delete Account Modal"
        onClose={handleClose}
        className='flex justify-center items-center'>
          <div className='rounded-md w-[90%] max-w-[720px] bg-[#262626] relative text-white'>            
            <button
            onClick={handleClose}
            className='absolute top-0 right-2 text-white text-4xl font-semibold'>
              <CloseOutlined/>
            </button>
            <div className="text-center p-4 pt-8">
                <WarningAmberOutlined
                sx={{
                    fontSize: '64px',
                    color: '#F4CF04',
                    marginBottom: '5px',
                }}/>
                <h3 
                className='font-semibold text-3xl mb-4'>Delete Account</h3>
                <p>Are you sure you want to delete your account?</p>
                <p>This action cannot be undone.</p>
                <p>You will loss all your Purchases and other data.</p>
                <button
                disabled={isDeleting}
                className='bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md px-4 py-2 mt-4'
                onClick={() => handleDeleteAccount(userId)}
                >
                    <DeleteOutlineOutlined
                    className='mr-2'
                    />
                    {isDeleting?'Deleting...':'Delete Account'}
                </button>
                <button
                onClick={handleClose}
                className='bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md px-4 py-2 mt-4 ml-4'
                >
                    Cancel
                </button>
            </div>
        </div>
      </Modal>
    );
};
export default DeleteAccount;