// import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { useEffect, useState } from 'react';


const useMediaItems = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientLocation = window?.sessionStorage?.getItem('clientLocation');
        if (clientLocation) {
          setData(JSON.parse(clientLocation));
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const response = await fetcher('/api/clientLocation');
        setData(response);
        window?.sessionStorage?.setItem('clientLocation', JSON.stringify(response));
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    data,
    error,
    isLoading
  }
};

export default useMediaItems;
