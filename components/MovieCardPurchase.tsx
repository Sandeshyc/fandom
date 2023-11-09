import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import { PlayIcon } from '@heroicons/react/24/solid';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import ViewDetailsBtn from '@/components/ViewDetailsBtn';
import Locked from '@/components/Locked';
import { ClockIcon } from '@heroicons/react/24/outline';
import EnititlementEndDate from '@/components/Expair';
import { VolunteerActivism, Check } from '@mui/icons-material';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardUpcoming: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);
  console.log('data', data);
  // const redirectToWatch = useCallback(() => router.push(`/watch/${data._id}`), [router, data._id]);
  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);

  return (
    <div className="group bg-gray-800 relative mb-4 flex justify-between flex-wrap text-white max-w-[780px] w-full rounded-sm sm:mr-4">
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
        <p className="text-[12px] sm:text-sm md:text-base xl:text-lg mb-1 flex items-center"><Check className="w-[16px] h-[16px] text-white mr-1"/>{data?.planDescription}</p>
        <p className="text-[12px] sm:text-sm md:text-base xl:text-lg mb-1 flex items-center"><VolunteerActivism className="w-[16px] h-[16px] text-white mr-1"/>{data?.contentPrivider}</p>
        <EnititlementEndDate endDate={data?.endTime} short={true} />  
      </div>
    </div>
  )
}

export default MovieCardUpcoming;
