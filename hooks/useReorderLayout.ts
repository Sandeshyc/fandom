import { create } from 'zustand';

export interface ReorderLayoutModalInterface {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useReorderLayout = create<ReorderLayoutModalInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: () => set(state => ({ isOpen: !state.isOpen})),
  closeModal: () => set({ isOpen: false}),
}));

export default useReorderLayout;
