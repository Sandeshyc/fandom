import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useAllMovie = (categories?: string, userId?:string, product?:string, region?:string) => {
  const { data, error, isLoading } = useSwr(categories ? `/api/allmovies/?itemcode=${categories}${(userId)?'&userId='+userId:''}&product=${product}&region=${region}` : null, fetcher, {
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
