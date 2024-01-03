import React from 'react';
import MovieListReel from '@/modules/components/MovieListReel';
const Gradient = (props:any) => {
  return (
    <MovieListReel
        {...props}
        gradient={true}
      />
  );
}
export default Gradient;