import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMediaItems = () => {
  const { data, error, isLoading } = useSwr(`/api/clientLocation`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  console.log('data', data, 'error', error, 'isLoading', isLoading);
  return {
    data,
    error,
    isLoading
  }
};

export default useMediaItems;
