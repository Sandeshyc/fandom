import { create } from 'zustand';
import { MovieInterface } from '@/types';

export interface ModalStoreInterface {
  data?: MovieInterface;
  movieId?: string;
  isOpen: boolean;
  openModal: (data : MovieInterface, movieId?: string) => void;
  closeModal: () => void;
  updateModal: (data : any) => void;
}

const useMoviePopupStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (data : MovieInterface, movieId?: string) => set({ isOpen: true, movieId, data }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
  updateModal: (data : any) => set({ data}),
}));

export default useMoviePopupStore;
