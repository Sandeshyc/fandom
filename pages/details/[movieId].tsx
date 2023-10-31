import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import {capFirstLetter} from '@/utils/capFirstLetter';
import PlayButton from '@/components/PlayButton';
import WatchTrailerBtn from '@/components/WatchTrailerBtn';
import Buy from '@/components/Buy';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import FavoriteButton from '@/components/FavoriteButton';
import MovieCardSimple from '@/components/MovieCardSimple';
import useMovie from '@/hooks/useMovie';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useMovieList from '@/hooks/useMovieList';


const Details = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [mouseActive, setMouseActive] = React.useState(true);
  
  const { data, error } = useMovie(movieId as string);
  // console.log('movie data: ', data);
  let relMovies = [];
  if( Array.isArray(data?.relatedVideos) && data?.relatedVideos.length > 0 ) {
    relMovies = data?.relatedVideos;
  }
  const { data: movies = [] } = useMovieList('');
  // console.log('movies data: ', movies);
  const videoURL = data?.trailerUrl ? data?.trailerUrl : data?.videoUrls[0]?.url;

  // console.log('movie data: ', data);
  const captionURL = data?.captionsUrl.length > 0 ? data?.captionsUrl : null;
  
  return (
    <div className="h-screen w-screen bg-black text-white" >
      {mouseActive && (<nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700  opacity-100 videoPageNav">
        <ArrowLeftIcon onClick={() => router.back() } className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Back</span>
        </p>
      </nav>)}

      <div className="relative">
        <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player h-[70vh] max-h-[80%]" >
          <VideoPlayer video={videoURL} caption={captionURL}/>
          <div className='preview'/>
        </div>
        <div className="absolute bottom-[0] left-0 w-[100%] bg-gradient-to-t from-black to-transparent py-[30px]">
          <div className="max-w-[1600px] mx-auto px-[15px]">
            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
              {data?.title}
            </p>
            <div className="flex flex-row gap-4 items-center mb-5">
              {(data?.allowed)?(<PlayButton movieId={data?._id} />):(<Buy movieId={data?._id} />)}
              <WatchTrailerBtn movieId={data?._id} />
              <FavoriteButton movieId={data?._id} />
            </div>
            <div className='grid grid-cols-12 gap-3 text-white mb-3'>
              <div className="col-span-12">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-green-400">85% Match</p>
                  <p className="">
                    {data?.duration}
                  </p>
                  <p className="border-gray-500 border px-1 text-xs">HD</p>
                  <p className="border-gray-500 border px-1 text-xs">16+</p>
                </div>

                <div className="flex flex-row items-center mb-4 text-white text-xs text-gray-500">
                  <p className="mb-3">{(Array.isArray(data?.tags) && data?.tags?.lenght > 0)?capFirstLetter(data?.tags?.join(", ")):null}</p>
                  {(data?.contentPrivider)?(<p className="mb-3"><span className="text-gray-300">Content Privider:</span> {data?.contentPrivider}</p>):null}
                </div>  
              </div>              
              <div className="col-span-8 py-8">
                <p className="">
                  {data?.description}
                </p>
              </div>
              <div className="col-span-4 py-8 text-sm flex justify-end">
                  <div>
                    {(Array.isArray(data?.cast) && data?.cast?.length > 0)?(<p className="mb-3">
                      <span className="text-gray-500">Cast:</span>  {capFirstLetter(data?.cast?.join(", "))}
                    </p>):null}
                    {(Array.isArray(data?.genre) && data?.genre?.length > 0)?(<p className="mb-3">
                      <span className="text-gray-500">Genres:</span>  {capFirstLetter(data?.genre?.join(", "))}
                    </p>):null}
                    {(data?.genre?.length)?(<p className="mb-3">
                      <span className="text-gray-500">Author:</span>  {data?.author}
                    </p>):null}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="w-[100%]">
          <div className="max-w-[1600px] mx-auto px-[15px]">
            <div className="text-white bg-zinc-800 shadow-md rounded-b-lg mt-6">
                <div className="flex flex-row items-center justify-between px-6 py-4">
                  <h3 className=" text-xl font-bold mb-2">More like this</h3>
                  <button 
                  onClick={() => router.push(`/`)}
                  className="text-white text-xl font-bold">See all</button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto px-6 pb-6">
                  {
                    (Array.isArray(relMovies) && relMovies.length > 0) ? relMovies.map((item: any) => <MovieCardSimple data={item} />) : (movies[2]?.items?.map((item: any) => <MovieCardSimple data={item} />))
                  }
                </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Details;
