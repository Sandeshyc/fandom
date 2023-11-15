import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { type } from 'os';

type SearchMoviesProps = {
  product?: string;
  title?: string;
  author?: string;
}

const useSearchMovies = (
  product: string = 'web',
  queryString: string = '',
) => {
  const { data, error, isLoading } = 
    useSwr(`/api/searchmovies?product=${product}&queryString=${queryString}`, 
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

export default useSearchMovies;
