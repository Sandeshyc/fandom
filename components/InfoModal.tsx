import React, { useCallback, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import {capFirstLetter} from '@/utils/capFirstLetter';
import PlayButton from '@/components/PlayButton';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovie from '@/hooks/useMovie';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { data } = useInfoModalStore();
  // const { data = {} } = useMovie(movieId);

  // console.log('movieId', movieId);
  // console.log('data', data);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto w-full max-w-4xl rounded-md overflow-hidden">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

          <div className="relative">
            <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player " >
              <VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false} autoplay={true} />
              <div className='preview'/>
            </div>
            
            <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?._id} />
                <FavoriteButton movieId={data?._id} />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-3 px-6 text-white'>
            <div className="col-span-8 px-6 py-8">
              <div className="flex flex-row items-center gap-2 mb-6 ">
                <p className="text-green-400">85% Match</p>
                <p className="">
                  {data?.duration}
                </p>
                <p className="border-gray-500 border px-1 text-xs">HD</p>
                <p className="border-gray-500 border px-1 text-xs">16+</p>
              </div>
              <p className="">
                {data?.description}
              </p>
            </div>
            <div className="col-span-4 px-6 py-8">
                <p className="">
                  <span className="text-gray-500">Cast:</span> {capFirstLetter(data?.genre?.join(", "))}
                </p> 
                <p className="">
                <span className="text-gray-500">Genres:</span>  {capFirstLetter(data?.genre?.join(", "))}
                </p> 
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InfoModal;
