import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovieDetails = (id?: string, userId?: string, product?:string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/moviesdetails/?userId=${userId}&movieId=${id}&product=${product}` : null, fetcher, {
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

export default useMovieDetails;
