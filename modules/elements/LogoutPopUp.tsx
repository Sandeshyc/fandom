import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import {
    getFingerPrintId,
    setEventRecord
} from "@/services/api";
import * as oidcApi from 'pages/api/auth/oidcApi';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from "firebase/auth";
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
type Props = {
    setIsLogoutPopUp : any;
}
const LogoutPopUp = ({
    setIsLogoutPopUp
}:Props) => {
    const router = useRouter();
    const [fingerPrintId, setFingerPrintId] = useState('');
    const [userId, setUserId] = useState('');
    const logoutFnc = () => {
        const provider = localStorage.getItem('provider');
        const oneLogInAccessToken = localStorage.getItem('oneLogInAccessToken');
        const googleIndentityAccessToken = localStorage.getItem('googleIndentityAccessToken');
        const eventData = {
            "eventType": "Logout",
            "data": {
                "deviveId": fingerPrintId,
                "sessionId": (provider === 'firebase') ? googleIndentityAccessToken : oneLogInAccessToken,
                "userId": userId,
                "time": new Date().toISOString(),
            }
        };
        const _testxxx = async () => {
            const response = await setEventRecord(eventData);
            console.log('response', response);
        }
        _testxxx();
        localStorage.removeItem('userInfo');        
        localStorage.removeItem('provider');
        if(provider === 'oneLogin'){
            localStorage.removeItem('oneLogInAccessToken');
            if(oneLogInAccessToken){
                oidcApi.logoutAuthToken({id_token_hint: oneLogInAccessToken});      
            }else{
                oidcApi.logoutAuth();
            }            
        }else{
            localStorage.removeItem('googleIndentityAccessToken');
            const _signOut = async () => {
                await signOut(getAuth()).then(() => {
                    console.log('signout');
                    localStorage.removeItem('googleIndentityAccessToken');
                    router.push('/login');
                    // window.location.replace(window.location.href);
                }
                ).catch((error) => {
                    console.log('signout error', error);
                    localStorage.removeItem('googleIndentityAccessToken');
                    router.push('/login');
                });
            }
            _signOut();
        }    
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
                <Title tag='h3' size='xl' className='mb-2'>Are you sure?</Title>
                <Text size='md'>Are you sure you want to log out?</Text>
                <div className='flex justify-end mt-4'>
                    <button 
                    onClick={() => {
                            logoutFnc();
                        }}
                    className='bg-red-500 text-white text-sm px-3 py-1 rounded-lg mr-2'>Yes</button>
                    <button 
                    onClick={() => setIsLogoutPopUp(false)}
                    className='bg-gray-500 text-white text-sm px-3 py-1 rounded-lg'>No</button>
                </div>
            </div>
        </div>
    )
}
export default LogoutPopUp;