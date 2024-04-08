import { create } from 'zustand';
interface UserState {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}
export const useUserStore = create<UserState>((set) => ({
    isLogin: false,
    setIsLogin: (isLogin:boolean) => set({isLogin})
}));