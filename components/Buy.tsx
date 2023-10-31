import React from 'react';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const Buy: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      className="
        bg-yellow-500 
        text-black
        rounded-md 
        py-1 md:py-1 
        px-3 md:px-6
        w-auto 
        text-lg lg:text-xl 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        ">
        Buy
    </button>
  );
}

export default Buy;
