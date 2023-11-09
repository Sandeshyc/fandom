import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import PlayButtonSmall from '@/components/PlayButtonSmall';
import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import Locked from '@/components/Locked';

interface MovieCardSimpleProps {
  data: MovieInterface;
}

const MovieCardSimple: React.FC<MovieCardSimpleProps> = ({ data }) => {
  const router = useRouter();
  if (!data) return null;
  const redirectToWatch = useCallback(() => router.push(`/details/${data?._id}`), [router, data?._id]);

  return (
    <div className="bg-zinc-700 rounded-md shadow-md moreLike min-w-[230px] min-w-[290px] mr-[10px] lg:mr-0">
      <div className="relative aspect-video cursor-pointer" onClick={redirectToWatch}>
        <img src={data?.thumbnailUrl} className="w-full h-full object-cover rounded-md" />
        {(!data?.allowed)?<Locked/>:null}
        <div className="absolute top-0 right-0 w-full h-full flex justify-center items-center overlay">
          <div className=''><PlayButtonSmall movieId={data?._id} /></div>
        </div>
      </div>
      <div className="flex flex-row justify-between p-3">
        <div className="flex flex-row flex-wrap items-center gap-2 mr-2">
          {/* <p className="text-green-400 text-sm lg:text-base">85% Match</p> */}
          <p className="text-green-400 text-sm lg:text-base">
            {data?.duration}
          </p>
          <p className="border-gray-500 border px-1 text-xs">HD</p>
          <p className="border-gray-500 border px-1 text-xs">16+</p>
        </div>
        <div>
          <FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>
        </div>
      </div>
      <div className='p-3 pt-0 lg:pt-3 text-sm lg:text-lg text-gray-200'>
        <p>{data?.description?.substring(0, 170)}</p>
      </div>
    </div>
  )
}

export default MovieCardSimple;
