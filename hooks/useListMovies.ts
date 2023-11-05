import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useListMovies = (region?: string, product?: string, userID?: string) => {
  const { data, error, isLoading } = 
    useSwr(`/api/listmovies?region=${region}&product=${product}&userID=${userID}`, 
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

export default useListMovies;
