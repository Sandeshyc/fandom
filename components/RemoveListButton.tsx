import React from 'react';
import {Close} from '@mui/icons-material';

interface PlayButtonProps {
  movieId: string;
}

const RemoveListBtn: React.FC<PlayButtonProps> = ({ movieId }) => {

  return (
    <button 
      className="flex p-0">
        <Close className="text-white mr-1" />
        Remove
    </button>
  );
}

export default RemoveListBtn;
