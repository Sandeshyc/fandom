import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { MovieInterface } from '@/types';
import EnititlementEndDate from '@/components/Expair';
import { Check, ShoppingBagOutlined } from '@mui/icons-material';
import { getThumbnailLandscape } from '@/utils/getData';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardPurchase: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const thumb = getThumbnailLandscape(data);
  const redirectToWatch = useCallback(() => {
    if(data?.contentType === 'TVShow'){
      router.push(`/tvshow/${data?._id}`);
    }else if(data?.contentType === 'TvChannel'){
      router.push(`/channel/${data?._id}`);
    }else{
      router.push(`/details/${data?._id}`);      
    }
  }, [router, data._id]);
  return (
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white w-full rounded-md sm:mr-4 justify-between h-full">
      <div className="w-[40%] relative bg-gray-600 rounded-md">
        <img onClick={redirectToWatch} src={ thumb } alt={data?.title || ' '} draggable={false} 
          className="cursor-pointer
          object-contain
          rounded-md
          w-full
          h-full
          aspect-[16/9]
          flex
          justify-center
          items-center
          text-white/40
          " />
      </div>
      <div className="w-[58%] py-1">
        {(data?.title)?<p
          onClick={redirectToWatch}
          className="text-white text-base lg:text-xl mb-1 md:mb-2 cursor-pointer">{data.title}</p>:null}

        {(data?.planDescription)?
          <p className="text-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
            <Check className="mr-1"
              sx={{
                color: 'white',
                fontSize: '20px',
              }}/>
            {data?.planDescription}
          </p>:
          null}  

        {(data?.sourcePlatform)?
          <p className="text-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
            <ShoppingBagOutlined className="mr-1"
            sx={{
              color: 'white',
              fontSize: '20px',
            }}/>
            {capFirstLetter(data?.sourcePlatform)}
          </p>:
          null}

        {(data?.endTime)?<>
          <EnititlementEndDate endDate={data?.endTime} short={true} />
        </>:null}
      </div>
    </div>
  )
}

export default MovieCardPurchase;
