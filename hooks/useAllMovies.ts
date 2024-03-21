import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useAllMovie = (categories?: string) => {
  const { data, error, isLoading } = useSwr(categories ? `/api/allmovies/?itemcode=${categories}` : null, fetcher, {
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

export default useAllMovie;
