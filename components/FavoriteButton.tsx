import React, { useCallback, useEffect, useMemo } from 'react';
import { PlusIcon, CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import {
  addToMyList,
  removeFromMyList,
  removeFromWatchingLists,
} from '@/services/api';

interface FavoriteButtonProps {
  movieId: string;
  isInWatchList?: boolean;
  classes?: string;
  style?: React.CSSProperties;
  innerClass?: string; 
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  movieId, 
  isInWatchList,
  classes = '',
  style = {},
  innerClass = '',
 }:FavoriteButtonProps) => {
  let tempUserId = '';
  const [userId, setUserId] = React.useState(tempUserId);
  const [isInLish, setIsInLish] = React.useState(isInWatchList);

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
    let result;
    if (isInLish) {
      result = await removeFromMyList(userId, movieId);
      if(result.status === 'success'){
        setIsInLish(false);
      }
    }else{
      result = await addToMyList(userId, movieId);
      if(result.status === 'success'){
        setIsInLish(true);
      }   
    }
  }
  
  const Icon = isInLish ? CheckIcon : PlusIcon;
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, [movieId]);
  useEffect(() => {
    setIsInLish(isInWatchList);
  }, [isInWatchList]);
  return (<button title="Watchlist" onClick={toggleFavorites} className={`cursor-pointer group/item w-8 h-8 ${(isInLish)?'border-white':'border-white/60'} border-2 rounded-full flex justify-center items-center transition active:opacity-65 hover:border-neutral-300 ${classes}`} style={style}>
  <Icon className={`text-white group-hover/item:text-neutral-300 w-6 ${innerClass}`} />
</button>
  )
}

export default FavoriteButton;
