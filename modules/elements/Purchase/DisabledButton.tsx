import React  from 'react';
type Props = {
    children: React.ReactNode,
    stage?: 'rent' | 'play',
    size?: 'sm' | 'md' | 'lg'
}
const buttonClass = {
    'rent' : "text-white/80 bg-gray-400",
    'play' : "bg-gray-400/90 text-black/80"
};
const buttonSize = {
    'sm' : "min-w-[75px] xl:min-w-[100px] h-[34px] lg:h-[40px]",
    'md' : "min-w-[80px] xl:min-w-[120px] h-[34px] lg:h-[40px] text-sm",
    'lg' : "min-w-[150px] xl:min-w-[180px] h-[34px] lg:h-[40px]"
};
const DisabledButton = ({
    children,
    stage = 'rent',
    size = 'lg'
}:Props) => {
    return (
        <button 
            type='button'
            className={`${buttonClass[stage]} ${buttonSize[size]} flex flex-row justify-center items-center w-fit text-center rounded-full p-2 cursor-not-allowed`}
            disabled
            >
            {children}
        </button>
    );
}
export default DisabledButton