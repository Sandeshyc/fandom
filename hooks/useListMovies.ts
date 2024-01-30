import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useListMovies = (region?: string, product?: string, userId?: string, ranNum?:string) => {
  const { data, error, isLoading } = 
    useSwr(`/api/listmovies?region=${region}&product=${product}&userId=${userId}&ranNum=${ranNum}`, 
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

export default useListMovies;
