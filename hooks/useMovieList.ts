import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovies = (region) => {
  const { data, error, isLoading } = useSwr(`/api/movies?region=${region}`, fetcher, {
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

export default useMovies;
