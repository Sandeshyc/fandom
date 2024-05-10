import { useState, useEffect } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useCheckAuthentication = () => {
    let tempAuth = false;
    if(typeof window !== 'undefined'){
        tempAuth = window?.sessionStorage?.getItem('isUserLoggin') === 'true' ? true : false;
    }    
    const [isAuthenticated, setIsAuthenticated] = useState(tempAuth as boolean);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            tempAuth = window?.sessionStorage?.getItem('isUserLoggin') === 'true' ? true : false;
            setIsAuthenticated(tempAuth as boolean);
        } 
        const provider = localStorage.getItem('provider');
        if (provider === 'firebase') {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userInfo = localStorage.getItem('userInfo');
                    setIsAuthenticated(!!userInfo);
                } else {
                    localStorage.removeItem('userInfo');
                    setIsAuthenticated(false);
                }
                setIsLoading(false);
            });
            return () => unsubscribe();
        } else {
            const userInfo = localStorage.getItem('userInfo');
            setIsAuthenticated(!!userInfo);
            setIsLoading(false);
        }
        window?.sessionStorage?.setItem('isUserLoggin', isAuthenticated ? 'true' : 'false');
    }, []);
    return isAuthenticated;
};

export default useCheckAuthentication;
