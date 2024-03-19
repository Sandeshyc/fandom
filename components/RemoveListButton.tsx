import React, {use, useEffect} from 'react';
import {Close} from '@mui/icons-material';
import {
  removeFromMyList
} from '@/services/api';

interface PlayButtonProps {
  movieId: string;
  isRemoveHandler?: any;
}

const RemoveListBtn: React.FC<PlayButtonProps> = ({ movieId, isRemoveHandler }) => {
  const [userIdToken, setUserIdToken] = React.useState('');
  const [isRemove, setIsRemove] = React.useState(false);
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }
    }
  }, []);
  
  const removeList = async () => {    
    let result = await removeFromMyList(userIdToken, movieId);
    if(result.status === 'success'){
      setIsRemove(true);
          isRemoveHandler(true);
    }
  }

  return (!isRemove?<button 
      onClick={ removeList }
      className="flex p-0 items-center text-[12px] sm:text-sm  xl:text-base active:opacity-65">
        <Close className="text-white  mr-1 w-[16px] h-[16px]" />
        Remove
    </button>:null);
}

export default RemoveListBtn;
