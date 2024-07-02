import useSwr, { mutate } from 'swr'
import fetcher from '@/libs/fetcher';

const useVerifyReChaptcha = (token?: string) => {
  const { data, error, isLoading } = useSwr(`/api/verifyReChaptchaToken/?token=${token}`, fetcher, {
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

export default useVerifyReChaptcha;
