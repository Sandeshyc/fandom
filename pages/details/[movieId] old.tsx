import React, {useEffect} from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import {capFirstLetter} from '@/utils/capFirstLetter';
import PlayButton from '@/components/PlayButton';
import WatchTrailerBtn from '@/components/WatchTrailerBtn';
import Buy from '@/components/Buy';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import FavoriteButton from '@/components/FavoriteButton';
import { ThumbUp } from '@mui/icons-material';
import { ShareIcon } from '@heroicons/react/24/solid';
import MovieCardSimple from '@/components/MovieCardSimple';
import useMovie from '@/hooks/useMovie';
import Footer from '@/components/Footer';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useMovieList from '@/hooks/useMovieList';
import { stableKeys } from '@/utils/stableKeys';
import SkeletonDetails from '@/components/Skeleton/SkeletonDetails';
import ReactVideoPlayer from '@/components/ReactPlayer';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';



const Details = (props) => {
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');
  const { region, product } =  props;
  const router = useRouter();

  const { movieId } = router.query;
  const [mouseActive, setMouseActive] = React.useState(true);  
  const { data, error } = useMovie(movieId as string, userIdToken);
  let relMovies = [];
  if(Array.isArray(data?.relatedVideos) && data?.relatedVideos?.length > 0 ) {
    // relMovies = data?.relatedVideos;
    // console.log('relMovies', relMovies);
    // is all relMovies Not Null
    relMovies = data?.relatedVideos.filter((item: any) => item !== null);
    // console.log('relMoviesxxx', relMovies);
  }
  const { data: movies = [], isLoading } = useMovieList(region, product, 'home', userIdToken);
  console.log('data movie', data);
  const videoURL = data?.trailerUrl ? data?.trailerUrl : '';
  const captionURL = data?.captionsUrl?.length > 0 ? data?.captionsUrl : null;
  let thumb = '';
  if( data?.thumbnailUrl ){
    thumb = data?.thumbnailUrl;
  }
  

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);

  useEffect(() => {
    setIsReady(true);
  }, []);


  return (
    <>
    {(isReady && !isLoading && data)?
    <div className="h-screen w-screen bg-black text-white" >
      {mouseActive && (<nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700  opacity-100 videoPageNav">
        <ArrowLeftIcon onClick={() => router.push('/') } className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold cursor-pointer" onClick={() => router.push('/') }>
          <span className="font-light">Back</span>
        </p>
      </nav>)}
      <div className="relative z-0">
        <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player h-[350px] md:h-[70vh] max-h-[100%] md:max-h-[80%]"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          {/* {(videoURL)?(<VideoPlayer video={videoURL} caption={captionURL}/>):null} */}
          {(videoURL)?(<ReactVideoPlayer videoURL={videoURL} control={false} poster={thumb}/>):null}
          <div className='preview'/>
        </div>
        <div className="absolute bottom-[0] left-0 w-[100%] bg-gradient-to-t from-black to-transparent py-[10px] lg:py-[30px] pt-[200px]">
          <div className="max-w-[1600px] mx-auto px-[15px]">
            <p className="text-white text-2xl md:text-4xl h-full lg:text-5xl font-bold mb-4 lg:mb-8">
              {data?.title}
            </p>
            {(data?.allowed !== true && Array.isArray(data?.messages) && data?.messages.length) ?  (<>
              <div className='border border-yellow-500 p-2 flex flex-wrap mb-2 rounded-md bg-black bg-opacity-40 max-w-[410px]'>
              <div
                className='w-[30px]'
              >
              <ReportProblemIcon
                sx={{ 
                  color: '#EAB307',
                  fontSize: '24px',
                  marginRight: '10px',                  
                }}
                />
              </div>
              <div className='w-[180px] flex-grow'>
                {data.messages.map((message : string, index : number) => <p key={stableKeys[index]}>{message}</p>)}
                </div>
            </div></>): null}
            <div className="flex flex-row gap-4 items-center lg:mb-5 flex-wrap">
              {(data)?<>{(data?.allowed)?(
              <>
                {data?.isPackage ? null : (<PlayButton movieId={data?._id}/>)}
              </>
              ):(
                <Buy 
                  movieId={data?._id} 
                  allowedPlans={data?.allowedPlans}
                  messages={data?.messages}
                  allowed={data?.allowed}
                  />
              )}              
              {data?.isPackage ? null : (<WatchTrailerBtn movieId={data?._id} />)}</>:null}
              

              <div className='flex flex-row gap-8 items-center mb-0 flex-wrap sm:pl-6'>
                <FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>
                <div className="cursor-pointer group/item w-9 h-9 lg:w-9 lg:h-9 flex justify-center items-center transition">
                  <ThumbUp className="text-white group-hover/item:text-neutral-300 w-6" />
                </div>
                <div className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition">
                  <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
                </div>
              </div>
            </div>
            <div className='hidden lg:block'>
              <div className='text-white mb-0'>
                <div className="col-span-12">
                  <div className="flex flex-row items-center">
                    {/* <p className="text-green-400 pr-1">85% Match</p> */}
                    <p className="pr-1 text-green-400">
                      {data?.duration}
                    </p>
                    <p className="border-gray-500 border px-1 mr-1 text-xs">HD</p>
                    <p className="border-gray-500 border px-1 mr-1 text-xs">16+</p>
                  </div>
                  <div className="mb-4 text-white text-xs text-gray-500">
                    {(data?.contentPrivider)?(<p className="mb-1"><span className="text-gray-300">Content Provider:</span> {data?.contentPrivider}</p>):null}
                    {(Array.isArray(data?.tags) && data?.tags.length > 0)?(<p className="mb-1"><span className="text-gray-300">Tags:</span> {capFirstLetter(data?.tags?.join(", "))}</p>):null}
                  </div>  
                </div>  
                <div className="md:grid md:grid-cols-12 md:gap-4">            
                  <div className="col-span-12 md:col-span-8">
                    <p className="text-sm md:text-base">
                      {data?.description}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4 text-sm flex justify-start md:justify-end mt-4 md:mt-0">
                      <div className='py-15'>
                        {(Array.isArray(data?.cast) && data?.cast?.length > 0)?(<p className="mb-1 md:mb-3">
                          <span className="text-gray-500">Cast:</span>  {capFirstLetter(data?.cast?.join(", "))}
                        </p>):null}
                        {(Array.isArray(data?.genre) && data?.genre?.length > 0)?(<p className="mb-1 md:mb-3">
                          <span className="text-gray-500">Genres:</span>  {capFirstLetter(data?.genre?.join(", "))}
                        </p>):null}
                        {(data?.genre?.length)?(<p>
                          <span className="text-gray-500">Director:</span>  {data?.author}
                        </p>):null}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className="w-[100%] z-10 relative lg:hidden">
        <div className="max-w-[1600px] mx-auto px-[15px]">
          <div className='text-white mb-0'>
            <div className="col-span-12">
              <div className="flex flex-row items-center">
                {/* <p className="text-green-400 pr-1">85% Match</p> */}
                <p className="pr-1 text-green-400">
                  {data?.duration}
                </p>
                <p className="border-gray-500 border px-1 text-xs">HD</p>
                <p className="border-gray-500 border px-1 text-xs">16+</p>
              </div>
              <div className="mb-4 text-white text-xs text-gray-500">
                {(data?.contentPrivider)?(<p className="mb-1"><span className="text-gray-300">Content Provider:</span> {data?.contentPrivider}</p>):null}
                {(Array.isArray(data?.tags) && data?.tags.length > 0)?(<p className="mb-1"><span className="text-gray-300">Tags:</span> {capFirstLetter(data?.tags?.join(", "))}</p>):null}
              </div>  
            </div>  
            <div className="md:grid md:grid-cols-12 md:gap-4">            
              <div className="col-span-12 md:col-span-8">
                <p className="text-sm md:text-base">
                  {data?.description}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 text-sm flex justify-start md:justify-end mt-4 md:mt-0">
                  <div className='py-15'>
                    {(Array.isArray(data?.cast) && data?.cast?.length > 0)?(<p className="mb-1 md:mb-3">
                      <span className="text-gray-500">Cast:</span>  {capFirstLetter(data?.cast?.join(", "))}
                    </p>):null}
                    {(Array.isArray(data?.genre) && data?.genre?.length > 0)?(<p className="mb-1 md:mb-3">
                      <span className="text-gray-500">Genres:</span>  {capFirstLetter(data?.genre?.join(", "))}
                    </p>):null}
                    {(data?.genre?.length)?(<p>
                      <span className="text-gray-500">Director:</span>  {data?.author}
                    </p>):null}
                  </div>
              </div>
            </div>
          </div>         
        </div>
      </div>
      <div className='bg-black w-[100%] z-10 relative'>
        <div className='max-w-[1600px] mx-auto px-[15px] '>
          {(Array.isArray(relMovies) && relMovies.length > 0)?<><div className="text-white bg-zinc-800 shadow-md rounded-b-lg pt-6">
            <div className="flex flex-row items-center justify-between px-2 lg:px-6 py-4">
              <h3 className=" text-xl font-bold mb-2">{data?.isPackage ? 'Movie list' : 'More like this'}</h3>
              
              {data?.isPackage ? null : (<button 
              onClick={() => router.push(`/`)}
              className="text-white text-xl font-bold">See all</button>)}
              
            </div>
            <div className="flex lg:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-5 overflow-x-auto lg:px-6 pb-6">
              {
                (Array.isArray(relMovies) && relMovies.length > 0) ? relMovies.map((item: any, index) => <MovieCardSimple 
                data={item}
                key={stableKeys[index]}
                />) : (movies[2]?.items?.map((item: any, index) => <MovieCardSimple 
                data={item} 
                key={stableKeys[index]}
                />))
              }
            </div>
        </div></>:null}
        </div>
      </div>
    </div>:<SkeletonDetails/>}
    </>
  )
}

export default Details;