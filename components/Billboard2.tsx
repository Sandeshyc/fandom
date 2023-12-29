import React, { useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import PlayButton from '@/components/PlayButton';
import ViewDetailsButton from '@/modules/Identities/ViewDetailsButton';
import useBillboard from '@/hooks/useBillboard';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import Locked from '@/components/Locked';
import Buy from '@/components/Buy';
import ReactVideoPlayer from '@/components/ReactPlayer';
import { stableKeys } from '@/utils/stableKeys';
import {capFirstLetter} from '@/utils/capFirstLetter';

const Billboard2: React.FC = ({data, extended, isComplited}) => {
  const { openModal } = useInfoModalStore();

  // console.log('dataxd', data);
  // const { data } = useBillboard();

  const handleOpenModal = useCallback(() => {
    openModal(data?._id, data);
  }, [openModal, data?._id, data]);
  return (
    <div className={`relative billboardSec`}>    
      {(!data?.allowed)?<Locked/>:null}
      <div className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] ${extended ? 'h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[100vh] ' : 'h-[250px] sm:h-[300px] md:h-[85vh] max-h-[85vh]'}`}>
        <div className='brightness-[60%] h-full'>
          {/* <VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false} isComplited={isComplited} pictureInPicture={false} /> */}
          <ReactVideoPlayer videoURL={data?.videoUrl} poster={data?.thumbnailUrl} />
        </div>
        <div className='preview'></div>
      </div>
      <div className={`absolute ${extended ? 'bottom-[160px] sm:bottom-[220px] xl:bottom-[15vw]' : 'bottom-[0%] pb-6 sm:pb-10 lg:pb-16 xl:pb-25 '} pl-4 md:pl-16 transition`}>
        <p className="text-white text-2xl md:text-5xl h-full w-[85%] md:w-[50%] lg:text-6xl drop-shadow-xl">
          {data?.title}
        </p>
        {(data?.publishSchedule)?(<p className="mb-1 flex items-center"><PublishDate publishDate={data?.publishSchedule} short={true} /></p>):null}
        <div className="flex flex-row items-center mb-1">
          {(data?.duration)?(<p className="pr-1 text-green-400">{data?.duration}</p>):null}
        </div>      
        {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0 text-white/80">
                {capFirstLetter(itemTxt)}
              </span>)}</div>:null}
        {(data?.contentPrivider)?(<p className="mb-1"><span className="text-gray-300">Content Provider:</span> {data?.contentPrivider}</p>):null}
        <p className="text-white text-[12px] md:text-lg mt-2 mb-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl line-clamp-4">
          {data?.description}
        </p>
      </div>
    </div>
  )
}
export default Billboard2;

interface GoBuyProps {
  movieId: string;
}
const GoBuy = (
  {movieId}:GoBuyProps
) => {
  const router = useRouter();
  return (
    <button 
      onClick={() => {
        router.push(`/details/${movieId}/?viewPlan=true`);
      }}
      className="text-white rounded-full py-2 px-3 text-base min-w-[180px] h-[44px] transition bg-gradient-to-l from-blue-500 to-blue-600 hover:bg-gradient-to-r">Rent</button>
  )
}