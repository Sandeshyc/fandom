import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import {
    getFingerPrintId,
    setEventRecord
} from "@/services/api";
import {
    signOut
} from '@/utils/cognitoAuth'
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
type Props = {
    setIsLogoutPopUp : any;
}
const LogoutPopUp = ({
    setIsLogoutPopUp
}:Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [fingerPrintId, setFingerPrintId] = useState('');
    const [userId, setUserId] = useState('');
    const logoutFnc = async () => {
        setIsLoading(true);
        const provider = localStorage.getItem('provider');
        const accessToken = localStorage.getItem('accessToken');
        const eventData = {
            "eventType": "Logout",
            "data": {
                "deviveId": fingerPrintId,
                "sessionId": accessToken,
                "userId": userId,
                "time": new Date().toISOString(),
            }
        };
        const response = await setEventRecord(eventData);
        console.log('response', response);
        localStorage.removeItem('userInfo');        
        localStorage.removeItem('provider');
        localStorage.removeItem('accessToken');
        signOut();
        router.push('/login');
        // setIsLoading(false);
    }
    useEffect(() => {
        const _getFingerPrintId = async () => {
            const response = await getFingerPrintId();
            if(response.status === 'success'){
                setFingerPrintId(response.fingerPrintId);
            }
        }
        _getFingerPrintId();

        const userInfo = window.localStorage.getItem('userInfo');
        if(userInfo) {
            const userInfoObj = JSON.parse(userInfo);
            if(userInfoObj.sub) {
                setUserId(userInfoObj.sub);
            }            
        }
    }, [])
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex justify-center items-center'>
            <div className='bg-gray-300 w-[380px] max-w-[90%] relative text-black/80 border border-white/70 rounded-lg p-4'>
                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center rounded-lg z-10 cursor-wait"/>
                )}
                <Title tag='h3' size='xl' className='mb-2'>Are you sure?</Title>
                <Text size='md'>Are you sure you want to log out?</Text>
                <div className='flex justify-end mt-4'>
                    <button 
                    onClick={() => {
                            logoutFnc();
                        }}
                    className='bg-red-500 text-white text-sm px-3 py-1 rounded-lg mr-2'>
                        {(isLoading)?'Loading...':'Yes'}</button>
                    <button 
                    onClick={() => setIsLogoutPopUp(false)}
                    className='bg-gray-500 text-white text-sm px-3 py-1 rounded-lg'>No</button>
                </div>
            </div>
        </div>
    )
}
export default LogoutPopUp;