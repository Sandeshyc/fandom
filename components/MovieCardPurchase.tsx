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
  // console.log('data', data);
  // const redirectToWatch = useCallback(() => router.push(`/watch/${data._id}`), [router, data._id]);
  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);

  return (
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
        {(data?.title)?<p
          onClick={redirectToWatch}
          className="text-white text-sm sm:text-base md:text-xl xl:text-2xl mb-1 md:mb-2 cursor-pointer"
        >{data.title}</p>:null}
        {(data?.planDescription)?<p className="text-[12px] sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center"><Check className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-white mr-1"/>{data?.planDescription}</p>:null}          
        {(data?.contentPrivider)?<p className="text-[12px] sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center"><VolunteerActivism className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-white mr-1"/>{data?.contentPrivider}</p>:null}
        {(data?.endTime)?<EnititlementEndDate endDate={data?.endTime} short={true} />:null}
      </div>
    </div>
  )
}

export default MovieCardUpcoming;
