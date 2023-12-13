import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState({} as any);

    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        setUser(JSON.parse(userInfo || '{}'));
    }, [window.localStorage]);

    const gerUser = () => {
        return user;
    }
    const getUserId = () => {
        return user?.sub || 0;
    }
    return {
        gerUser,
        getUserId
    }
}

export default useUser;