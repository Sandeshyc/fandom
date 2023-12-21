import React, {useEffect} from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import {capFirstLetter} from '@/utils/capFirstLetter';
import PlayButton from '@/components/PlayButton';
import WatchTrailerBtn from '@/components/WatchTrailerBtn';
import Buy from '@/components/Buy';
import FavoriteButton from '@/components/FavoriteButton';
import { ThumbUp } from '@mui/icons-material';
import { ShareIcon } from '@heroicons/react/24/solid';
import RestartBtn from '@/modules/elements/RestartBtn';
import ResumeBtn from '@/modules/elements/ResumeBtn';
import Buttons from '@/components/identites/Buttons';
import useMovie from '@/hooks/useMovie';
import Footer from '@/components/Footer';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useMovieList from '@/hooks/useMovieList';
import { stableKeys } from '@/utils/stableKeys';
import SkeletonDetails from '@/components/Skeleton/SkeletonDetails';
import ReactVideoPlayer from '@/components/ReactPlayer';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DetailsTab from '@/components/DetailsTab';
import MovieListReel from '@/modules/components/MovieListReel';
import { PlayIcon } from '@heroicons/react/24/solid';

const bgImage = 'url("/images/new-bg.png")';

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
    // console.log('relMovies', relMovies);
  }
  const { data: movies = [], isLoading } = useMovieList(region, product, 'home', userIdToken);
  // console.log('data movie', data);
  const videoURL = data?.trailerUrl ? data?.trailerUrl : '';
  const captionURL = data?.captionsUrl?.length > 0 ? data?.captionsUrl : null;
  let thumb = '';
  if( data?.thumbnailUrl ){
    thumb = data?.thumbnailUrl;
  }

  const backBtn = () => {
    window.history.back();
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
    <div className="text-white" 
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 50 + 'vh',
      }}>
      {mouseActive && (<nav className="absolute w-full p-4 z-10 flex flex-row items-center gap-8 transition-opacity ease-in duration-700  opacity-100 videoPageNav">
        <ArrowLeftIcon onClick={backBtn} className="w-8 md:w-12 text-white cursor-pointer hover:opacity-80 transition border-2 border-blue-500 rounded-full p-1" />
        <p className="text-white/80 text-1xl md:text-3xl font-bold cursor-pointer" onClick={backBtn}>
          <span className="font-light">Back</span>
        </p>
      </nav>)}
      <div className="relative z-0">
        <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[70vh] max-h-[100%]"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          {(videoURL)?(<ReactVideoPlayer videoURL={videoURL} control={false} poster={thumb}/>):null}
        </div>
        <div className="absolute bottom-[0] left-0 w-[100%] bg-gradient-to-t from-black to-transparent py-[10px] lg:py-[30px] pt-[200px]">
          <div className="max-w-[1600px] mx-auto px-[15px]">
            <p className="text-white text-2xl md:text-4xl h-full lg:text-5xl mb-4 lg:mb-8">
              {data?.title}
            </p>
            {(data?.allowed !== true && Array.isArray(data?.messages) && data?.messages.length) ?  (<>
              <div className='border border-yellow-500 p-2 flex flex-wrap mb-2 rounded-md bg-black bg-opacity-40 max-w-[410px]'>
              <div
                className='w-[30px]'>
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
              {(data)?<>{(data?.allowed)?(<>{data?.isPackage ? null : (data?.currentTime)?(<Buttons
                onClick={() => router.push(`/watch/${data?._id}`)} 
              type='white'><PlayIcon className="w-6 text-black mr-2" /> Resume</Buttons>):(<PlayButton movieId={data?._id}/>)}</>):(
                <Buy 
                  movieId={data?._id} 
                  allowedPlans={data?.allowedPlans}
                  messages={data?.messages}
                  allowed={data?.allowed}
                  data={data}
                  />
              )}              
              {data?.isPackage ? null : (data?.allowed && data?.currentTime)?(<Buttons
                onClick={() => router.push(`/watch/${data?._id}?t=restart`)} 
              type='white'>Restart</Buttons>):(<WatchTrailerBtn movieId={data?._id} />)}</>:null}
              <div className='flex flex-row gap-8 items-center mb-0 flex-wrap'>
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
                    {(data?.quality)?(<p className="border-gray-500 border px-1 mr-1 text-xs">{data?.quality}</p>):null}
                    {(data?.contentRating)?(<p className="border-gray-500 border px-1 mr-1 text-xs">{data?.contentRating}</p>):null}
                  </div>
                  <div className="mb-4 text-white text-xs text-gray-500">
                    {(data?.contentPrivider)?(<p className="mb-1"><span className="text-gray-300">Content Provider:</span> {data?.contentPrivider}</p>):null}                    
                  </div>  
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
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
              </div>  
            </div>  
          </div>         
        </div>
      </div>
      {(data?.isPackage)?(<div className='w-full'>
        <div className='max-w-[1600px] mx-auto px-[15px]'>
          {(Array.isArray(relMovies) && relMovies.length > 0)?<MovieListReel title={'Movie Lists'} portrait={true} data={relMovies}/>:null}
        </div>
      </div>):null}
      <div className='mt-6 mb-16'>
        <div className="max-w-[1600px] mx-auto px-[15px]">
          <div
            className='rounded-md bg-black p-4 pb-8 border border-gray-800'>
            <DetailsTab data={data}/>
          </div>
        </div>
      </div>
      {(!data.isPackage)?(<div className='w-full overflow-hidden'>
        <div className='max-w-[1600px] mx-auto px-[15px]'>
          {(Array.isArray(relMovies) && relMovies.length > 0)?<MovieListReel title={'More Like This'} portrait={true} data={relMovies}/>:null}
        </div>
      </div>):null}
      <Footer/>
    </div>:<SkeletonDetails/>}
    </>
  )
}

export default Details;
