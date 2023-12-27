import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovieDetails = (id?: string, userId?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/moviesdetails/?userId=${userId}&movieId=${id}` : null, fetcher, {
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
