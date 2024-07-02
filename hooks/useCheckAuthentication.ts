import { useState, useEffect } from 'react';
import { getSession } from "@/utils/cognitoAuth";

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
        if (provider === 'cognito') {
            const _getSession = async () => {
                try {
                  const session = await getSession();
                  if (session) {
                    const userInfo = localStorage.getItem('userInfo');
                    setIsLoginUser(!!userInfo);
                  }else{
                    localStorage.removeItem('userInfo');
                    setIsLoginUser(false);
                  }
                } catch (error) {
                    console.error("Error:", error);
                    localStorage.removeItem('userInfo');
                    setIsLoginUser(false);
                }
                setIsLoadingUserCheck(false);            
            };
            _getSession();
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
