import React, { useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import PlayButton from '@/components/PlayButton';
import ViewDetailsButton from '@/components/ViewDetailsButton';
import useBillboard from '@/hooks/useBillboard';
import useInfoModalStore from '@/hooks/useInfoModalStore';

const Billboard: React.FC = ({data, extended, isComplited}) => {
  const { openModal } = useInfoModalStore();

  console.log('dataxd', data);
  // const { data } = useBillboard();

  const handleOpenModal = useCallback(() => {
    openModal(data?._id, data);
  }, [openModal, data?._id, data]);


  return (
    <div /*className={`relative   ${extended ? 'mb-[1vw]' : 'mb-[-2vw]'}`}*/>
    
      <div className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[500px] ${extended ? 'h-[100vh] max-h-[100vh] ' : 'h-[85vh]  max-h-[85vh]'}`}>
        <div className='brightness-[60%] h-full'>
          <VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false} isComplited={isComplited} />
        </div>
        <div className='preview'></div>
      </div>

      <div style={{marginLeft: "8rem"}} className={`absolute ${extended ? 'top-[40%] md:top-[30%]' : 'top-[30%] md:top-[40%]'}  ml-4 md:ml-16 transition`}>
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description?.substring(0, 260)}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?._id} />
          <ViewDetailsButton movieId={data?._id} />
        </div>
      </div>
    </div>
  )
}
export default Billboard;
