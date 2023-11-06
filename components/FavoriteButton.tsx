import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { PlusIcon, CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const [userIdToken, setUserIdToken] = React.useState('');
  const [isInLish, setIsInLish] = React.useState(false);
  
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();


  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }
    }

    if (isInLish) {
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = {
        watchList: [movieId],
      };
      let result;
      axios.delete(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userIdToken}/watchlist`, { headers, data })
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
      const headers = {
        'Content-Type': 'application/json',
      };      
      const data = {
        watchList: [movieId],
      };
      let result;
      axios.post(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userIdToken}/watchlist`, data, { headers })
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

    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
  
  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    isInLish?<div onClick={toggleFavorites} className="cursor-pointer group/item w-8 h-8 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
    <MinusIcon className="text-white group-hover/item:text-neutral-300 w-6" />
  </div>:<div onClick={toggleFavorites} className="cursor-pointer group/item w-8 h-8 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
  <Icon className="text-white group-hover/item:text-neutral-300 w-6" />
</div>
  )
}

export default FavoriteButton;
