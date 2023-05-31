import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type layoutType = {
  pageName: string;
  items: any[];
}

interface CurrentPageInterface {
  currentLayout?: layoutType;
  setCurrentLayout: (currentLayout: layoutType) => void;
  reset: () => void;
}

const useCurrentPageStore = create<CurrentPageInterface>((set) => ({
  currentLayout: {pageName: '', items: []},
  setCurrentLayout: (currentLayout: layoutType) => set({ currentLayout }),

  reset: () => set({ currentLayout: {pageName: '', items: []} }),
}));

export default useCurrentPageStore;

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('currentPageStore', useCurrentPageStore);
}
