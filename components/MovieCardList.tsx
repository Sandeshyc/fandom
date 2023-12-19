import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import RemoveListBtn from '@/components/RemoveListButton';
import Locked from '@/components/Locked';
import Buttons from '@/components/identites/Buttons';
import { VolunteerActivism } from '@mui/icons-material';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardList: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);
  const [isRemove, setIsRemove] = React.useState(false);

  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);
  // console.log('data', data);
  const publishDate = data?.publishSchedule;
  const publishDatex = new Date(publishDate).toLocaleDateString('en-US', { 
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
   });
  const isRemoveHandler = (isRemove: boolean) => {
    setIsRemove(isRemove);
  }

  return (!isRemove?
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white max-w-[780px] w-full rounded-sm sm:mr-4 justify-between">
      <div className="w-[40%] relative">
        <img onClick={redirectToWatch} src={data.thumbnailUrl } alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          rounded-md
          w-full
          aspect-[16/9]" />
        {(!data?.allowed)?<Locked/>:null}
      </div>
      <div className="w-[58%] pt-1">
        <p
          onClick={redirectToWatch}
          className="text-white text-sm sm:text-base md:text-xl xl:text-2xl mb-1 cursor-pointer"
        >{data.title}</p>    
        {(data?.contentPrivider)?<p className="text-xs sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center"><VolunteerActivism className="w-[16px] h-[16px] text-white mr-1 pl-[3px]"/>{data?.contentPrivider}</p>:null}
        <RemoveListBtn movieId={data?._id} isRemoveHandler={isRemoveHandler} />
        {data?.allowed? (
          <Buttons 
            onClick={redirectToWatch} 
            type='white'
            className="mt-4"           
            styles={{width: 'fit-content'}} >Play Now</Buttons>
        ) : (
          <Buttons 
            onClick={redirectToWatch}
            className="mt-4"           
            styles={{width: 'fit-content'}}>Rent</Buttons>
        )}
      </div>
    </div>:null
  )
}

export default MovieCardList;
