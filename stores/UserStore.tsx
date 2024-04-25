import { create } from 'zustand';
interface UserState {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}
export const useUserStore = create<UserState>((set) => ({
    isLogin: false,
    setIsLogin: (isLogin:boolean) => set({isLogin})
}));


interface MovieListState {
    hasMovieList: boolean;
    setHasMovieList: (x: boolean) => ({hasMovieList: boolean});
    movieListOfset: number;
    setMovieListOfset: (movieListOfset: number) => void;
}
export const usePackageMovielist = create<MovieListState>((set) => ({
    hasMovieList: false,
    movieListOfset: 0,
    setHasMovieList: (hasMovieList:boolean) => set(() => ({ hasMovieList: hasMovieList })),
    setMovieListOfset: (movieListOfset:number) => set(() => ({ movieListOfset: movieListOfset }))
}));