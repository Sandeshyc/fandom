import React, {
    useEffect,
} from 'react';
import { useRouter } from 'next/router';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import useMovieDetails from '@/hooks/useMovieDetails';
const NewDetails = () => {
    const router = useRouter();
    const [userIdToken, setUserIdToken] = React.useState('');
    const { movieId } = router.query;
    const { data: movieDetails, isLoading} = useMovieDetails(movieId as string, userIdToken);
    // console.log('movieData', isLoading, movieDetails);
    useEffect(() => {    
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserIdToken(userInfoObj.sub);
          }
        }
    }, []);
  return (<>
  <Mapper
    modules={movieDetails}
    getComponent = {getComponent}
    isLoading = {isLoading}/>
  </>);
};
export default NewDetails;