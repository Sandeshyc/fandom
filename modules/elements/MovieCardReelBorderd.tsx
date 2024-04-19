import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import CardHeader from '@/modules/elements/CardHeader';
import CardFooter from '@/modules/elements/CardFooter';
import RollImage from '@/modules/Identities/RollImage';
import { get } from 'lodash';
import { getThumbnailPortrait } from '@/utils/getData';
interface MovieCardProps {
  data: MovieInterface;
}
const MovieCardReelBorderd: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const thumbURl = getThumbnailPortrait(data);
  const title = data?.title || '';

  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);

  return (
    <button 
    onClick={redirectToWatch}
    className={`bg-[#101010]/60 group overflow-hidden col-span relative border-blue-700 border p-[1.8vw] pb-1 rounded-xl w-full transition-all duration-500 hover:border-white`}>
      <CardHeader header={data?.header} />
      <div className={`img relative h-full w-full bg-zinc-900 rounded-md overflow-hidden`}>
        {(thumbURl)?
        <img  src={thumbURl} alt={title} draggable={false} className={`flex justify-center items-center text-center text-gray-500 cursor-pointer object-contain shadow-xl rounded-lg w-full z-10 aspect-[6/9]`}/>
      :
        <p className='flex justify-center items-center text-center text-gray-500 cursor-pointer p-2 shadow-xl rounded-lg w-full z-10 aspect-[6/9]'>
          {title}
        </p>
      }
      </div>
      <div className={`absolute z-20 bottom-0 left-0 w-full px-[2.4vw] pb-[1.8vw] pt-[1.8vw] bg-gradient-to-t from-black from-45% via-black/80 via-75% to-transparent to-98% cursor-pointer  group-hover:pr-[1.8vw] group-hover:pl-[1.8vw] transition-all`}>
          <CardFooter footer={data?.footer} />
          <div className='flex justify-between'>
            <p className="text-white text-md xl:text-xl font-medium mr-2 group-hover:pr-[1.2vw] transition-all">{data?.title}</p>
            <ArrowRightIcon onClick={() => {}} className="w-4 md:w-8 text-white cursor-pointer  duration-500" />
          </div>
      </div>
    </button>
  )
}

export default MovieCardReelBorderd;
