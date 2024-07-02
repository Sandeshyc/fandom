import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import {layoutType} from '@/hooks/useCurrentPageStore';


interface PageStoreInterface {
  savedPages: any[];
  setSavedPages: (currentLayout: layoutType) => void;
  reset: () => void;
}

const useSavedPagesStore = create<PageStoreInterface>((set) => ({
  savedPages: [],
  setSavedPages: (currentLayout: layoutType) => set(state => (
    {
      // check if page already exists
      savedPages: state.savedPages.some((page: any) => page.pageName === currentLayout.pageName)
        ? state.savedPages.map((page: any) => page.pageName === currentLayout.pageName ? currentLayout : page)
        : [...state.savedPages, currentLayout]

    }
  )),
  reset: () => set({ savedPages: [] }),
}));

export default useSavedPagesStore;

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('pageStore', useSavedPagesStore);
}
