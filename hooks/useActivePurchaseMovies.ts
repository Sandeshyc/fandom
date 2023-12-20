import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useActivePurchaseMovies = (region?: string, product?: string, userID?: string, activeonly?:string) => {
  const { data, error, isLoading } = 
    useSwr(`/api/activepurchasemovies?region=${region}&product=${product}&userID=${userID}&activeonly=${activeonly}`, 
    fetcher, {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
  return {
    data,
    error,
    isLoading
  }
};

export default useActivePurchaseMovies;
