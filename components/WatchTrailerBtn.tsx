import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
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
        w-[220px]
        text-base 
        flex
        flex-row
        justify-center
        items-center
        mr-4
        h-[44px]
        transition-opacity
        hover:opacity-90
        ">
        <PlayIcon className="w-6 text-black mr-2" />
        Play Trailer
    </button>
  );
}

export default WatchTrailerBtn;
