import React from 'react';
import { useRouter } from 'next/router';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface PlayButtonProps {
  movieId: string;
}

const ViewDetailsButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/details/${movieId}`)}
      className="
      bg-white
      text-white
        bg-opacity-30 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-opacity-20
        transition
        "
      >
        <InformationCircleIcon className="w-4 md:w-7 mr-1" />
        More Info
    </button>
  );
}

export default ViewDetailsButton;
