import React, { useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import PlayButton from '@/components/PlayButton';
import ViewDetailsButton from '@/components/ViewDetailsButton';
import useBillboard from '@/hooks/useBillboard';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import Locked from '@/components/Locked';
import Buy from '@/components/Buy';
import ReactVideoPlayer from '@/components/ReactPlayer';

const Billboard: React.FC = ({data, extended, isComplited}) => {
  const { openModal } = useInfoModalStore();

  // console.log('dataxd', data);
  // const { data } = useBillboard();

  const handleOpenModal = useCallback(() => {
    openModal(data?._id, data);
  }, [openModal, data?._id, data]);
  return (
    <div className={`relative`}>    
      {(!data?.allowed)?<Locked/>:null}
      <div className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] ${extended ? 'h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[100vh] ' : 'h-[250px] sm:h-[300px] md:h-[85vh] max-h-[85vh]'}`}>
        <div className='brightness-[60%] h-full'>
          {/* <VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false} isComplited={isComplited} pictureInPicture={false} /> */}
          <ReactVideoPlayer videoURL={data?.videoUrl} />
        </div>
        <div className='preview'></div>
      </div>
      <div className={`absolute ${extended ? 'bottom-[160px] sm:bottom-auto sm:top-[20%] xl:top-[40%] xxl:top-[60%]' : 'bottom-[0%] pb-6 sm:pb-10 lg:pb-16 xl:pb-25'} ml-4 md:ml-16 lg:ml-24 xl:ml-36 transition`}>
        <p className="text-white text-2xl md:text-5xl h-full w-[85%] md:w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[12px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description?.substring(0, 260)}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {(data?.allowed)?(<PlayButton movieId={data?._id} />):(<GoBuy movieId={data?._id}/>)}
          <ViewDetailsButton movieId={data?._id} />
        </div>
      </div>
    </div>
  )
}
export default Billboard;

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
          router.push(`/details/${movieId}/?viewPlan=true`)
        
        }}
        className="
        bg-yellow-500 
        text-black
        rounded-md 
        py-1 md:py-1 
        px-3 md:px-6
        w-auto 
        text-base lg:text-xl 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        ">
            <BanknotesIcon className="w-5 md:w-9 text-black mr-2" />
          Buy / Rent
        </button>
  )
}