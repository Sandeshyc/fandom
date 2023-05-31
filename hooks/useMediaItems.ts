import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMediaItems = () => {
  const { data, error, isLoading } = useSwr(`/api/mediaItems`, fetcher, {
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

export default useMediaItems;
