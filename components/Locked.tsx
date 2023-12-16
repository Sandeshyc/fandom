import React from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const Locked: React.FC = () => {
  return (
    <div className='bg-black bg-opacity-40 top-[50%] right-[50%] w-[36px] h-[36px] z-40 bg-gray flex justify-center items-center rounded-full lockedIcon translate-x-[18px] translate-y-[-18px]  ' style={{ position: 'absolute' }}>
      <LockClosedIcon className="text-gray-200 w-[16px] h-[16px]">
        <span className="sr-only">Locked</span>
      </LockClosedIcon>
    </div>
  );
}

export default Locked;
