import { create } from 'zustand';

export interface ToastStoreInterface {
  data?: any;
  isOpen: boolean;
  openModal: (data : any) => void;
  closeModal: () => void;
}

export const useToast = create<ToastStoreInterface>((set) => ({
  isOpen: false,
  openModal: (data : any) => set({ isOpen: true,  data }),
  closeModal: () => set({ isOpen: false}),
}));


