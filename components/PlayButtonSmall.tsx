import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface PlayButtonSmallProps {
  movieId: string;
  classes?: string;
  style?: React.CSSProperties;
  innerClass?: string;  
}

const PlayButtonSmall: React.FC<PlayButtonSmallProps> = ({ 
  movieId,
  classes = '',
  style = {},
  innerClass = '',
 }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/details/${movieId}`)} className={`cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300 playButtonSmall ${classes}`} style={style}>
    <PlayIcon className={`text-black w-4 lg:w-6 ${innerClass}`} />
  </div>
  );
}

export default PlayButtonSmall;
