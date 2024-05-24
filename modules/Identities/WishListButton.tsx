import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PlusIcon, CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import {
  addToMyList,
  removeFromMyList,
} from '@/services/api';
import { 
    AddCircleOutlineOutlined,
    RemoveCircleOutlineOutlined,
    RefreshOutlined
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
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(tempUserId);
  const [isInLish, setIsInLish] = useState(isInWatchList);

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, [movieId]);

  const toggleFavorites = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }
  
  const Icon = isInLish ? RemoveCircleOutlineOutlined : AddCircleOutlineOutlined;
  return (
    
    <>
    {(isLoading) ? (
      <button 
      title="Watchlist" 
      className='h-[36px] lg:h-[44px] border border-blue-600 rounded-full w-[150px] mr-4 flex items-center justify-center text-white/80 cursor-wait' style={style}>
        <RefreshOutlined 
          className='animate-spin'
          sx={{fontSize: '24px', marginRight: '5px'}}
        />
        <span>Loading</span>
    </button>
    )
    :
    (<button 
      onClick={toggleFavorites}
      title="Watchlist" 
      className='h-[36px] lg:h-[44px] border border-blue-600 rounded-full w-[150px] mr-4 flex items-center justify-center text-white/80 cursor-pointer hover:text-white' style={style}>
        <Icon 
            sx={{fontSize: '24px', marginRight: '5px'}}
        />
        <span>Add to List</span>
    </button>
    )}
    </>
  );
}

export default WishListButton;
