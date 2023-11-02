import React from 'react';
import { useRouter } from 'next/router';
import { BanknotesIcon } from '@heroicons/react/24/outline';
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
        text-base lg:text-xl 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        ">
          <BanknotesIcon className="w-5 md:w-9 text-black mr-2" />
        Buy / Rent
    </button>
  );
}

export default Buy;
