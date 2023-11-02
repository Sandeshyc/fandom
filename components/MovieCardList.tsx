import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import RemoveListBtn from '@/components/RemoveListButton';
import Locked from '@/components/Locked';
import { VolunteerActivism } from '@mui/icons-material';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardList: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);

  const redirectToWatch = useCallback(() => router.push(`/watch/${data._id}`), [router, data._id]);
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

  return (
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white max-w-[780px] w-full rounded-sm mr-4">
      <div className="w-[140px] sm:w-[260px] md:w-[360px] mr-2 sm:mr-6 relative">
        <img onClick={redirectToWatch} src={data.thumbnailUrl } alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          rounded-md
          aspect-[16/9]" />
        {(true)?<Locked/>:null}
      </div>
      <div className="w-[180px] grow pt-4">
        <p
          className="text-white text-sm sm:text-base md:text-xl xl:text-2xl mb-1 cursor-pointer"
        >{data.title}</p>    
        <p className="text-xs sm:text-sm md:text-base xl:text-lg mb-1 flex items-center"><VolunteerActivism className="w-[16px] h-[16px] text-white mr-1"/>{data?.contentPrivider}</p>
        <RemoveListBtn movieId={data._id} />
      </div>
    </div>
  )
}

export default MovieCardList;
