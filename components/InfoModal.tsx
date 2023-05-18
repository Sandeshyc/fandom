import React, { useCallback, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import {capFirstLetter} from '@/utils/capFirstLetter';
import PlayButton from '@/components/PlayButton';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import FavoriteButton from '@/components/FavoriteButton';
import MovieCardSimple from '@/components/MovieCardSimple';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovieList from '@/hooks/useMovieList';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, region }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { data } = useInfoModalStore();
  // const { data: demoMore = {} } = useMovie(data?._id);
  const { data: movies = [] } = useMovieList(region);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback((e) => {
    if(e.target.dataset?.button !== 'close') return;

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div onClick={handleClose} className="InfoModal z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0" data-button="close">
      <div className="relative m-auto py-4 w-full max-w-5xl ">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} rounded-md  overflow-hidden transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

          <div className="relative">
            <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player " >
              <VideoPlayer image={data?.thumbnailUrl} video={data?.videoUrl} control={false} autoplay={true} />
              <div className='preview'/>
            </div>
            
            <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" >
              <XMarkIcon className="text-white w-6" data-button="close"/>
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
              <div className="flex flex-row items-center gap-2 mb-3 ">
                <p className="text-green-400">85% Match</p>
                <p className="">
                  {data?.duration}
                </p>
                <p className="border-gray-500 border px-1 text-xs">HD</p>
                <p className="border-gray-500 border px-1 text-xs">16+</p>
              </div>

              <div className="flex flex-row items-center gap-2 mb-4 text-white text-xs text-gray-500">
                <p>language, violence, suicide</p>
              </div>

              <p className="">
                {data?.description}
              </p>
            </div>
            <div className="col-span-4 px-6 py-8 text-sm">
                <p className="mb-3">
                  <span className="text-gray-500">Cast:</span> {capFirstLetter(data?.genre?.join(", "))}
                </p> 
                <p className="mb-3">
                  <span className="text-gray-500">Genres:</span>  {capFirstLetter(data?.genre?.join(", "))}
                </p>
                <p>
                <span className="text-gray-500">This movie is:</span> Dark
                </p> 
            </div>
          </div>

          <div className="text-white bg-zinc-800 shadow-md rounded-b-lg mt-6">
              <div className="flex flex-row items-center justify-between px-6 py-4">
                <h3 className=" text-xl font-bold mb-2">More like this</h3>
                <p className="text-white text-xl font-bold">See all</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto px-6 pb-6">
                {movies[2]?.items?.map((item: any) => <MovieCardSimple data={item} />)
                }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
