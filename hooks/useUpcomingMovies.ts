import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useUpcomingMovies = (region?: string, product?: string, sectionName?: string) => {
  const { data, error, isLoading } = 
    useSwr(`/api/upcomingmovies?region=${region}&product=${product}&sectionName=${sectionName}&userId=151937500`, 
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

export default useUpcomingMovies;
