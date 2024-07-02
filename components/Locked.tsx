import React from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const Locked: React.FC = () => {
  return (
    <div className='bg-black bg-opacity-60 top-[50%] left-[50%] w-[72px] h-[72px] z-40 bg-gray flex justify-center items-center rounded-full lockedIcon translate-x-[-50%] translate-y-[-50%]  ' style={{ position: 'absolute' }}>
      <LockClosedIcon className="text-gray-200 w-[48px] h-[48px]">
        <span className="sr-only">Locked</span>
      </LockClosedIcon>
    </div>
  );
}

export default Locked;
