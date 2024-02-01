import React from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface PlayButtonProps {
  movieId: string;
}

const ViewDetailsBtn: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/details/${movieId}`)}
      className="cursor-pointer ml-auto group/item w-8 h-8 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300 active:opacity-65">
        <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </button>
  );
}

export default ViewDetailsBtn;
