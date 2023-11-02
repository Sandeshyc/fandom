import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const usePurchaseMovies = (region?: string, product?: string, userID?: string) => {
  const { data, error, isLoading } = 
    useSwr(`/api/purchasemovies?region=${region}&product=${product}&userID=${userID}`, 
    fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
  return {
    data,
    error,
    isLoading
  }
};

export default usePurchaseMovies;
