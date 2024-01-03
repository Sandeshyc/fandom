import React from 'react';
import { Info } from '@mui/icons-material';
export const NoPlanFound = () => {
    return (
        <div 
          className='
          text-white 
          text-xl 
          md:text-2xl 
          lg:text-2xl 
          font-semibold 
          mx-auto 
          lg:pl-6 
          w-[250px] 
          min-h-[200px]
          flex
          justify-center
          items-center
          border border-blue-500
          bg-blue-500
          bg-opacity-10
          rounded-md'>
          No plan found!
        </div>
    );
}

export const NoMovies = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[450px] max-w-full bg-gray-600 p-8 rounded-md">
      <Info className="w-[100px] h-[100px] text-yellow-500 mb-4 text-xl" 
        sx={{
          fontSize: '60px',
        }}
      />
      <p className="text-white text-2xl">No movies found!</p>
    </div>
  )
}