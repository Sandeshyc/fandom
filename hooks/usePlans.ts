import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const usePlans = (region?: string, contentId?:string) => {
  const { data, error, isLoading } = 
    useSwr(`/api/planLists?region=${region}&contentId=${contentId}`, 
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
