import {
    auth
} from '@/utils/firebase';
import { onAuthStateChanged } from "firebase/auth";
const checkAuthentication = async () => {
    const getStatus = () => {
        let isAuthenticated = false;
        let isLoading = true;
        const provider = localStorage.getItem('provider');
        if(provider === 'firebase') {
            const _getAuthStatus = async () => {
                await onAuthStateChanged(auth, (user) => {
                    if (user) {          
                        // isAuthenticated = true;   
                        const userInfo = localStorage.getItem('userInfo');
                        if(userInfo){
                            isAuthenticated = true;
                            isLoading = false;
                        }else{
                            isAuthenticated = false;
                            isLoading = false;
                        }                     
                    }else{
                        localStorage.removeItem('userInfo');
                        isAuthenticated = false;
                        isLoading = false;
                    }
                });
                return isAuthenticated;
            }
            return _getAuthStatus();
        }else{
            const userInfo = localStorage.getItem('userInfo');
            if(userInfo){
                isAuthenticated = true;
                isLoading = false;
            }else{
                isAuthenticated = false;
                isLoading = false;
            }
        }
        return isAuthenticated;
    };
    return getStatus();
}
export default checkAuthentication;