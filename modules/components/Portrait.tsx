import React from 'react';
import MovieListReel from '@/modules/components/MovieListReel';

const Portrait= (props:any) => {
  return (
    <MovieListReel
        {...props}
        portrait={true}
      />
  );
}

export default Portrait;

