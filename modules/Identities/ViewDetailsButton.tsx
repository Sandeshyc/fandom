import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface PlayButtonProps {
  movieId: string;
}

const ViewDetailsButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/details/${movieId}`)}
      className="text-white py-1 text-base flex flex-row items-center justify-center transition min-w-[160px] h-[44px]rounded-full">
        Know More <ChevronRightIcon className="w-5 h-5 ml-2 text-white/80"/>
    </button>
  );
}

export default ViewDetailsButton;
