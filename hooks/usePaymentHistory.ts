import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const usePaymentHistory = (userId?: string) => {
  const { data, error, isLoading } = useSwr(userId ? `/api/paymenthistory/?userId=${userId}` : null, fetcher, {
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

export default usePaymentHistory;
