import { create } from 'zustand';

export interface EditChangePlaylistModalInterface {
  currentLayout?: any[];
  playlist?: object;
  index: number;
  isOpen: boolean;
  openModal: (currentLayout: any[], playlist : object, index: number) => void;
  closeModal: () => void;
}

const useEditChangePlaylistModal = create<EditChangePlaylistModalInterface>((set) => ({
  currentLayout: [],
  index: 0,
  isOpen: false,
  openModal: (currentLayout: any[], playlist : object, index: number) => set({ isOpen: true, currentLayout, playlist, index }),
  closeModal: () => set({ isOpen: false, currentLayout: [] }),
}));

export default useEditChangePlaylistModal;
