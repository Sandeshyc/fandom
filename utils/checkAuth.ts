import {
    auth
} from '@/utils/firebase';
import { onAuthStateChanged } from "firebase/auth";
const checkAuthentication = async () => {
    const getStatus = () => {
        let isAuthenticated = false;
        const provider = localStorage.getItem('provider');
        if(provider === 'firebase') {
            const _getAuthStatus = async () => {
                await onAuthStateChanged(auth, (user) => {
                    if (user) {          
                        isAuthenticated = true;
                    }else{
                        localStorage.removeItem('userInfo');
                        isAuthenticated = false;
                    }
                });
                return isAuthenticated;
            }
            return _getAuthStatus();
        }else{
            isAuthenticated = false;
        }
        return isAuthenticated;
    };
    return getStatus();
}
export default checkAuthentication;