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
import { VolunteerActivism } from '@mui/icons-material';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardUpcoming: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [autoplay, setAutoplay] = React.useState(false);

  // const redirectToWatch = useCallback(() => router.push(`/watch/${data._id}`), [router, data._id]);
  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);

  return (
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white w-full rounded-sm">
      <div className="w-full relative">
        <img onClick={redirectToWatch} src={data.thumbnailUrl } alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          rounded-md
          w-full
          aspect-[16/9]" />
        {(!data?.allowed)?<Locked/>:null}
        <div className="absolute top-2 right-2 p-1 flex flex-wrap bg-black bg-opacity-50 rounded-md">
          <EnititlementEndDate endDate={data?.endTime} short={true} />  
        </div>
      </div>
      
    </div>
  )
}

export default MovieCardUpcoming;
