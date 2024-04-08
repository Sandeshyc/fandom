import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useTvShowDetails = (tvshow?: string, userId?: string, product?:string, region?:string) => {
  const { data, error, isLoading } = useSwr(tvshow ? `/api/tvshowdetails?movieId=${tvshow}&region=${region}&product=${product}&userId=${userId}` : null, 
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

export default useTvShowDetails;