import React from 'react';
import MovieListReelPortrait from '@/modules/components/MovieListReelPortrait';
import MovieListReelFive from '@/modules/components/MovieListReelFive';
import MovieListReel from '@/modules/components/MovieListReel';

const Roll= (props:any) => {
  return (
    <MovieListReelFive
        {...props}
      />
  );
}

export default Roll;

