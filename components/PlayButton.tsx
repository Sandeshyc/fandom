import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        bg-white 
        text-black
        rounded-full
        py-1 
        px-3
        w-auto 
        text-base
        flex
        flex-row
        justify-center
        items-center
        hover:bg-neutral-300
        transition
        h-[44px]
        min-w-[180px]
        hover:opacity-90
        ">
        <PlayIcon className="w-6 text-black mr-2" />
        Play Now
    </button>
  );
}

export default PlayButton;
