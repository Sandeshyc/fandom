import React, {use, useEffect} from 'react';
import axios from 'axios';
import {Close} from '@mui/icons-material';

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
  
  const removeList = () => {    
    
    const headers = {
      'Content-Type': 'application/json',
    };
    const data = {
      watchList: [movieId],
    };
    let result;
    // Need to Update API URL
    axios.delete(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userIdToken}/watchlist`, { headers, data })
      .then(response => {
        console.log('response: ', response);
        if(response.status === 200) {
          setIsRemove(true);
          isRemoveHandler(true);
          console.log('response.data: ', response.data);
          result = response.data;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (!isRemove?<button 
      onClick={ removeList }
      className="flex p-0 items-center text-[12px] sm:text-sm  xl:text-base active:opacity-85">
        <Close className="text-white  mr-1 w-[16px] h-[16px]" />
        Remove
    </button>:null);
}

export default RemoveListBtn;
