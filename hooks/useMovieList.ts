import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovies = (region?: string, product?: string, sectionName?: string, userID?: string, ranNum?:string) => {
  const { data, error, isLoading } = useSwr(`/api/movies?region=${region}&product=${product}&sectionName=${sectionName}&userId=${userID}&ranNum=${ranNum}`, 
  fetcher, 
  {
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