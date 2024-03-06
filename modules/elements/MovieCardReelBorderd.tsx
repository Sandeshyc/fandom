import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
interface MovieCardProps {
  data: MovieInterface;
}
const MovieCardReelBorderd: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const thumbURl = data?.thumbnailPotrait || data?.thumbnailUrl || '';

  const redirectToWatch = useCallback(() => {
    router.push(`/details/${data?._id}`)
  }, [router, data?._id]);

  return (
    <button 
    onClick={redirectToWatch}
    className={`bg-[#101010]/60 group overflow-hidden col-span relative border-blue-700 border p-[1.8vw] pb-1 rounded-xl w-full transition-all duration-500 hover:border-white`}>
      <div className={`img relative h-full w-full bg-zinc-900 rounded-md`}>
        {(data?.allowed)?<PurchaseBadge/>
        :
        <BadgeDesktop
          text="Sale"
          theme="orange"
        />
        }     
        <img  src={thumbURl} alt="Movie" draggable={false} className={`cursor-pointer object-contain shadow-xl rounded-md w-full z-10 aspect-[6/9]`}/>
      </div>
      <div className={`flex justify-between absolute z-20 bottom-0 left-0 w-full px-[2.4vw] pb-[1.8vw] pt-[1.8vw] bg-gradient-to-t from-black from-45% via-black/80 via-75% to-transparent to-98% cursor-pointer`}>
          <p className="text-white text-xl font-medium mr-2">{data?.title}</p>
          <ArrowRightIcon onClick={() => {}} className="w-4 md:w-8 text-white cursor-pointer transition-all duration-500 group-hover:mr-[-20px]" />
      </div>
    </button>
  )
}

export default MovieCardReelBorderd;
