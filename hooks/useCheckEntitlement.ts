import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useCheckEntitlement = (userId:string) => {
    const { data, error, isLoading } = 
    useSwr(`/api/entitlement?&userId=${userId}`, 
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
export default useCheckEntitlement;