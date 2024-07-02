import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useUpdateProfile = (
  userid?: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  phone?: string,
  gender?: string,
  birthdate?: string,
  ) => {
    console.log('useUpdateProfile'
    , userid
    , firstname, birthdate, gender, phone, email, lastname);
  const { 
    data, 
    error, 
    isLoading,
  } = useSwr(`/api/updateprofile/?userid=${userid}&firstname=${firstname}&lastname=${lastname}&email=${email}&phone=${phone}&gender=${gender}&birthdate=${birthdate}`, fetcher, {
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

export default useUpdateProfile;
