import axios from 'axios';
import React, { useCallback, useEffect, useMemo } from 'react';
import { PlusIcon, CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
  isInWatchList?: boolean;
  classes?: string;
  style?: React.CSSProperties;
  innerClass?: string; 
  handelWatchListItem: any;
  setIsInWatchListTemp: any;
  isInWatchListTemp: any;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  movieId, 
  isInWatchList,
  classes = '',
  style = {},
  innerClass = '',
  handelWatchListItem,
  setIsInWatchListTemp,
  isInWatchListTemp
 }:FavoriteButtonProps) => {
  let tempUserId = '';
  const [userId, setUserId] = React.useState(tempUserId);
  const [isInLish, setIsInLish] = React.useState(isInWatchListTemp);
  
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
  }, [movieId]);

  // const isFavorite = useMemo(() => {
  //   const list = currentUser?.favoriteIds || [];

  //   return list.includes(movieId);
  // }, [currentUser, movieId]);

  const toggleFavorites = async () => {
    const checkUserID = async () => {
      if(!userId) {
        const userInfo = window.localStorage.getItem('userInfo');
        if(userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserId(userInfoObj.sub);
          }
        }
      }
    }
    await checkUserID();
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
      // Need to Update API URL
      axios.delete(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userId}/watchlist`, { headers, data })
        .then(response => {
          // console.log('response: ', response);
          if(response.status === 200) {
            setIsInLish(false);
            handelWatchListItem(false);
            setIsInWatchListTemp(false);
            // console.log('response.data: ', response.data);
            result = response.data;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }else{
      // console.log('add to list');
      const headers = {
        'Content-Type': 'application/json',
      };      
      const data = {
        watchList: [movieId],
      };
      let result;
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/watchlist`, data, { headers })
        .then(response => {
          // console.log('response: ', response);
          if(response.status === 200) {
            setIsInLish(true);
            handelWatchListItem(true);
            setIsInWatchListTemp(true);
            // console.log('response.data: ', response.data);
            result = response.data;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });      
    }
  }
  
  const Icon = isInLish ? CheckIcon : PlusIcon;

  return (<button title="Watchlist" onClick={toggleFavorites} className={`cursor-pointer group/item w-8 h-8 ${(isInLish)?'border-white':'border-white/60'} border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300 ${classes}`} style={style}>
  <Icon className={`text-white group-hover/item:text-neutral-300 w-6 ${innerClass}`} />
</button>
  )
}

export default FavoriteButton;