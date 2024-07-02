import { useEffect, useState } from "react";

const useUser = () => {
    const gerUser = () => {
        const userInfo = window.localStorage.getItem('userInfo');
        return JSON.parse(userInfo || '{}');
    }
    const getUserId = () => {
        const userInfo = window.localStorage.getItem('userInfo');
        const user = JSON.parse(userInfo || '{}');
        return user?.sub || 0;
    }
    return {
        gerUser,
        getUserId
    }
}

export default useUser;