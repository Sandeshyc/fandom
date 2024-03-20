import React, { useCallback, useEffect, useMemo } from 'react';
import { PlusIcon, CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import {
  addToMyList,
  removeFromMyList,
  removeFromWatchingLists,
} from '@/services/api';
import { 
    AddCircleOutlineOutlined,
    RemoveCircleOutlineOutlined
} from '@mui/icons-material';

interface FavoriteButtonProps {
  movieId: string;
  isInWatchList?: boolean;
  classes?: string;
  style?: React.CSSProperties;
  innerClass?: string; 
}

const WishListButton: React.FC<FavoriteButtonProps> = ({ 
  movieId, 
  isInWatchList,
  classes = '',
  style = {},
  innerClass = '',
 }:FavoriteButtonProps) => {
  let tempUserId = '';
  const [userId, setUserId] = React.useState(tempUserId);
  const [isInLish, setIsInLish] = React.useState(isInWatchList);
  
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
  return (
    <button 
        onClick={toggleFavorites}
        title="Watchlist" 
        className='h-[44px] border border-blue-600 rounded-full w-[160px] mb-2 mr-4 flex items-center justify-center text-sm text-white/80 cursor-pointer hover:text-white' style={style}>
        {(isInLish)?
            <RemoveCircleOutlineOutlined 
                sx={{fontSize: '20px', marginRight: '5px'}}
            />
            :
            (<AddCircleOutlineOutlined
                sx={{fontSize: '20px', marginRight: '5px'}
            }/>)
        }
        <span>Add to List</span>
    </button>
  );
}

export default WishListButton;
