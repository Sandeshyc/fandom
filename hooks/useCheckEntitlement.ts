import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useCheckEntitlement = (userId:string, voucher?:boolean) => {
    const { data, error, isLoading } = 
    useSwr(`/api/entitlement?&userId=${userId}&voucher=${voucher}`, 
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