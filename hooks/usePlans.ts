import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const usePlans = (region?: string, product?: string, userId?: string, contentId?:string) => {
  const { data, error, isLoading } = 
    useSwr(`/api/planLists?region=${region}&product=${product}&userId=${userId}&contentId=${contentId}`, 
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

export default usePlans;
