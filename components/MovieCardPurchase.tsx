import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { MovieInterface } from '@/types';
import EnititlementEndDate from '@/components/Expair';
import { VolunteerActivismOutlined, Check, ShoppingBagOutlined } from '@mui/icons-material';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardUpcoming: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const redirectToWatch = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);
  return (
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white w-full rounded-md sm:mr-4 justify-between h-full">
      <div className="w-[40%] relative bg-gray-600 rounded-md">
        <img onClick={redirectToWatch} src={data.thumbnailUrl } alt="Movie" draggable={false} className="
          cursor-pointer
          object-contain
          rounded-md
          w-full
          h-full
          aspect-[16/9]" />
      </div>
      <div className="w-[58%] py-1">
        {(data?.title)?<p
          onClick={redirectToWatch}
          className="text-white text-base md:text-xl xl:text-2xl mb-1 md:mb-2 cursor-pointer"
        >{data.title}</p>:null}
        {(data?.planDescription)?<p className="text-[12px] sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center"><Check className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-white mr-1"/>{data?.planDescription}</p>:null}          
        {(data?.contentPrivider)?<p className="text-[12px] sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center"><VolunteerActivismOutlined className="w-[10px] h-[10px] md:w-[16px] md:h-[16px] text-white mr-1"/>{data?.contentPrivider}</p>:null}
        {(data?.sourcePlatform)?<p className="text-[12px] sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center"><ShoppingBagOutlined className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-white mr-1"/>{capFirstLetter(data?.sourcePlatform)}</p>:null}
        {(data?.endTime)?<>
          <EnititlementEndDate endDate={data?.endTime} short={true} />
        </>:null}
      </div>
    </div>
  )
}

export default MovieCardUpcoming;
