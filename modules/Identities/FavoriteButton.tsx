import React from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

interface FavoriteButtonProps {
  isInWatchList: boolean;
  onClick: any;
  className?: string;
  style?: any;
  innerClassName?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  isInWatchList,
  onClick,
  className,
  style,
  innerClassName,
 }:FavoriteButtonProps) => {
  const Icon = isInWatchList ? CheckIcon : PlusIcon;
  
  return (<button title="Watchlist" onClick={onClick} className={`cursor-pointer group/item w-8 h-8 ${(isInWatchList)?'border-white':'border-white/60'} border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300 ${className}`} style={style}>
    <Icon className={`text-white group-hover/item:text-neutral-300 w-6 ${innerClassName}`} />
  </button>
  )
}

export default FavoriteButton;
