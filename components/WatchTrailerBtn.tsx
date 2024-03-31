import React from 'react';
import {
  TrailerIcon
} from '@/utils/CustomSVGs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const WatchTrailerBtn: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/watch/${movieId}?trailer=true`)}
      className="
        bg-white 
        text-black
        rounded-full
        py-1
        px-3
        w-[48%]
        lg:w-[220px]
        text-base 
        flex
        flex-row
        justify-center
        items-center
        h-[44px]
        transition-opacity
        hover:opacity-90
        active:opacity-65">
        <TrailerIcon/>
        <span className='ml-2'>Trailer</span>
    </button>
  );
}

export default WatchTrailerBtn;
