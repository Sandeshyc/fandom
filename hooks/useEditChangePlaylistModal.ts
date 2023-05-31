import { create } from 'zustand';

export interface EditChangePlaylistModalInterface {
  currentLayout?: any[];
  playlist?: object;
  updateType?: string;
  index: number;
  isOpen: boolean;
  openModal: (currentLayout: any[], playlist : object, index: number, updateType?: string) => void;
  closeModal: () => void;
}

const useEditChangePlaylistModal = create<EditChangePlaylistModalInterface>((set) => ({
  currentLayout: [],
  updateType: 'playlist',
  index: 0,
  isOpen: false,
  openModal: (currentLayout: any[], playlist : object, index: number, updateType?: string) => set({ isOpen: true, currentLayout, playlist, index, updateType }),
  closeModal: () => set({ isOpen: false, currentLayout: [] }),
}));

export default useEditChangePlaylistModal;
