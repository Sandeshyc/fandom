import { create } from 'zustand';

export interface ModalStoreInterface {
  data?: object;
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string, data : object) => void;
  closeModal: () => void;
}

// This code creates a store called useInfoModalStore that contains the movieId and isOpen state values. It also contains two methods, openModal and closeModal, that can be used to set the isOpen state value to true or false. The store is created using the create method from the zustand library.

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string, data : object) => set({ isOpen: true, movieId, data }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModalStore;
