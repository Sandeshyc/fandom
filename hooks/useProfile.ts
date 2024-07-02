import useSwr, { mutate } from 'swr'
import fetcher from '@/libs/fetcher';

const useProfile = (userid?: string) => {
  const { data, error, isLoading } = useSwr(`/api/profile/?userid=${userid}`, fetcher, {
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

export default useProfile;
