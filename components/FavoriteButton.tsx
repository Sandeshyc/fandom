import axios from 'axios';
import React, { useCallback, useEffect, useMemo } from 'react';
import { PlusIcon, CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  let tempUserId = '';
  const userInfo = ""; // window.localStorage.getItem('userInfo');
  if(userInfo) {
    const userInfoObj = JSON.parse(userInfo);
    if(userInfoObj.sub) {
      tempUserId = userInfoObj.sub;
    }
  }
  const [userId, setUserId] = React.useState(tempUserId);
  const [isInLish, setIsInLish] = React.useState(false);
  
  // const { mutate: mutateFavorites } = useFavorites();

  // const { data: currentUser, mutate } = useCurrentUser();

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);

  // const isFavorite = useMemo(() => {
  //   const list = currentUser?.favoriteIds || [];

  //   return list.includes(movieId);
  // }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isInLish) {
      console.log('remove from list');
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = {
        watchList: [movieId],
      };
      let result;
      axios.delete(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userId}/watchlist`, { headers, data })
        .then(response => {
          console.log('response: ', response);
          if(response.status === 200) {
            setIsInLish(false);
            console.log('response.data: ', response.data);
            result = response.data;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }else{
      console.log('add to list');
      const headers = {
        'Content-Type': 'application/json',
      };      
      const data = {
        watchList: [movieId],
      };
      let result;
      axios.post(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userId}/watchlist`, data, { headers })
        .then(response => {
          console.log('response: ', response);
          if(response.status === 200) {
            setIsInLish(true);
            console.log('response.data: ', response.data);
            result = response.data;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });      
    }


    const updatedFavoriteIds = response?.data?.favoriteIds;

    // mutate({ 
    //   ...currentUser, 
    //   favoriteIds: updatedFavoriteIds,
    // });
    // mutateFavorites();
  }, [movieId, isInLish]);
  
  const Icon = isInLish ? CheckIcon : PlusIcon;

  return (<div onClick={toggleFavorites} className="cursor-pointer group/item w-8 h-8 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
  <Icon className="text-white group-hover/item:text-neutral-300 w-6" />
</div>
  )
}

export default FavoriteButton;
