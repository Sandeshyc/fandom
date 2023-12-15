import React from 'react';

const btnClass ={
  'white' : "bg-white text-black rounded-full py-2 px-3 w-auto text-base flex flex-row justify-center items-center hover:bg-neutral-300 transition h-[40px] min-w-[150px] cursor-pointer",
  'blue' : "text-white text-center rounded-full py-2 px-3 text-base min-w-[150px] h-[40px] transition bg-gradient-to-l from-blue-500 to-blue-600 hover:bg-gradient-to-r cursor-pointer"
} ;

interface ButtonsProps {
    children: React.ReactNode
    onClick : () => void
    type?: 'white' | 'blue'
}

const Buttons = ({children, onClick, type='blue'} : ButtonsProps) => {
  return (
    <div onClick={onClick} className={btnClass[type]}>{children}</div>
  )
}

export default Buttons