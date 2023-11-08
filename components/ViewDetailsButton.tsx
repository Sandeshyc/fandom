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
      className=" bg-gray-200  text-black rounded-md  py-1 md:py-2  px-3 md:px-6 w-auto  text-lg lg:text-xl  font-semibold flex flex-row items-center hover:bg-neutral-300 transition h-[36px]
      xl:h-[42px] xxl:h-[48px]">
        <InformationCircleIcon className="w-4 md:w-7 mr-1" />
        More Info
    </button>
  );
}

export default ViewDetailsButton;
