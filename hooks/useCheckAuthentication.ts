import { useState, useEffect } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useCheckAuthentication = () => {
    let tempAuth = false;
    if(typeof window !== 'undefined'){
        tempAuth = window?.sessionStorage?.getItem('isUserLoggin') === 'true' ? true : false;
    }    
    const [isLoginUser, setIsLoginUser] = useState(tempAuth as boolean);
    const [isLoadingUserCheck, setIsLoadingUserCheck] = useState(true);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            tempAuth = window?.sessionStorage?.getItem('isUserLoggin') === 'true' ? true : false;
            setIsLoginUser(tempAuth as boolean);
        } 
        const provider = localStorage.getItem('provider');
        if (provider === 'firebase') {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userInfo = localStorage.getItem('userInfo');
                    setIsLoginUser(!!userInfo);
                } else {
                    localStorage.removeItem('userInfo');
                    setIsLoginUser(false);
                }
                setIsLoadingUserCheck(false);
            });
            return () => unsubscribe();
        } else {
            const userInfo = localStorage.getItem('userInfo');
            setIsLoginUser(!!userInfo);
            setIsLoadingUserCheck(false);
        }
        window?.sessionStorage?.setItem('isUserLoggin', isLoginUser ? 'true' : 'false');
    }, []);
    return { isLoginUser, isLoadingUserCheck };
};

export default useCheckAuthentication;
