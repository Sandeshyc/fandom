import { create } from 'zustand';
import useListMovies from './useListMovies';

export interface WishListStoreInterface {
}

// This code creates a store called useInfoModalStore that contains the movieId and isOpen state values. It also contains two methods, openModal and closeModal, that can be used to set the isOpen state value to true or false. The store is created using the create method from the zustand library.

const userInfo = localStorage.getItem('userInfo');
let userIdToken = '';
if(userInfo) {
  const userInfoObj = JSON.parse(userInfo);
  userIdToken = userInfoObj.sub;
}

const useWishListStore = create((set) => ({
  list: [],
  add: (movieId: string) => {
    console.log('add', movieId);
  },
  remove: (movieId: string) => {
    console.log('remove', movieId);
  },
  clear: () => {
    list = null;
  },
  get_list: () => set({ state.list: useListMovies('', 'web', userIdToken)})
}));

export default useWishListStore;
