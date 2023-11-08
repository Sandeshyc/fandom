import React from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const Locked: React.FC = () => {
  return (
    <div className='bg-black bg-opacity-40 top-2 right-2 w-[36px] h-[36px] z-10 bg-gray flex justify-center items-center rounded-full lockedIcon' style={{ position: 'absolute' }}>
      <LockClosedIcon className="text-gray-200 w-[16px] h-[16px]">
        <span className="sr-only">Locked</span>
      </LockClosedIcon>
    </div>
  );
}

export default Locked;
