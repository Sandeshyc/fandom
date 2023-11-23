import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useProfile = (userid?: string) => {
  const { data, error, isLoading } = useSwr(`/api/profile/?userid=${userid}`, fetcher, {
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

export default useProfile;
