import React, {use, useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import {
    getSession,
    deleteAccount
} from '@/utils/cognitoAuth';
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
    const [cognitoUserId, setCognitoUserId] = useState('');
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
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/info/${tempUserId}`, { headers})
            .then(response => {
                if(response.status === 200) {
                    console.log('Account Deleted Successfully', tempUserId);
                }
            })
            .catch(error => {
                console.error('Error::', error);
            }); 
            try {
                await deleteAccount();
                window.localStorage.removeItem('userInfo');
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('provider');
                window.location.replace('/login');
                handleClose();
            } catch (error) {
                console.error('Error:', error);
            }           
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
            if(tempUserId) {
                setUserId(tempUserId);
            }
        }
        const _getSession = async () => {
            const session = await getSession() as any;
            console.log('session', session);
            if(session?.idToken?.payload?.email) {
                setCognitoUserId(session?.idToken?.payload?.email);
            }
        }
        _getSession();
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