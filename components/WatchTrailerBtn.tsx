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
        rounded-md 
        py-1 md:py-1 
        px-3 md:px-6
        w-auto 
        text-base lg:text-xl 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        h-[36px]
        xl:h-[42px]
        xxl:h-[48px]
        ">
        <PlayIcon className="w-5 md:w-9 text-black mr-2" />
        Watch Trailer
    </button>
  );
}

export default WatchTrailerBtn;
