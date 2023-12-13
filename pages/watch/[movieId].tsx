import React, {useEffect} from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import useMovie from '@/hooks/useMovie';
import SkeletonWatch from '@/components/Skeleton/SkeletonWatch';
import { set } from 'lodash';
import ReactMainVideoPlayer from '@/components/ReactMainPlayer';

const Watch = () => {
  const router = useRouter();
  const [userId, setUserId] = React.useState('');
  const {movieId, trailer } = router.query;
  const [mouseActive, setMouseActive] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [isTrailer, setIsTrailer] = React.useState(true);
  const [trailerUrl, setTrailerUrl] = React.useState('');
  const [videoURL, setVideoURL] = React.useState('');
  const [videoReady, setVideoReady] = React.useState(false);
  
  const { data, error, isLoading } = useMovie(movieId as string, userId as string); 
  // console.log('Watch data: ', data, isLoading, isReady);

  useEffect(() => {
    if(data?._id){
      setVideoReady(true);
    }
    if(data?.allowed){
      setIsTrailer(false);
      if(Array.isArray(data?.videoUrls) && data?.videoUrls.length > 0){
        setVideoURL(data?.videoUrls[0]?.url);
      }
    }else{
      setTrailerUrl(data?.trailerUrl ? data?.trailerUrl : '');
    }
    // console.log('videoURL: ', videoURL);
    if(trailer === 'true'){
      setIsTrailer(true);
      setTrailerUrl(data?.trailerUrl ? data?.trailerUrl : '');
    }
  }, [data]);

  const captionURL = data?.captionsUrl?.length > 0 ? data?.captionsUrl : null;

  let timeout: NodeJS.Timeout;
  const onMouseMove = () => {
    clearTimeout(timeout);
    
      setMouseActive(true);
      timeout = setTimeout(() => {
        setMouseActive(false);
      }, 3000);
  }

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
        // router.push('/');
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
    setIsReady(true);
  }, []);

  
  return (
    <>
    {(isReady && !isLoading)?(<><div className="h-screen w-screen bg-black flex items-center" onMouseMove={onMouseMove}>
      {mouseActive && (<nav className="fixed w-full p-4 z-10 top-1 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700  opacity-100 videoPageNav">
        <ArrowLeftIcon onClick={() => router.push('/') } className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>)}
      <div className="jk_jwp_full"  style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${data?.thumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        }}>

        {(videoReady)?((isTrailer)?((trailerUrl)?(<ReactMainVideoPlayer 
        videoURL={trailerUrl}
        poster={data?.thumbnailUrl}
        control={true}/>):(<NotFount/>)):((videoURL)?(<VideoPlayer 
          image={data?.thumbnailUrl}
          video={videoURL} 
          caption={captionURL}
          control={true}
          autoplay={true}
          isComplited={() => {}}
          pictureInPicture={true}/>):(<NotFount/>))):null}
      </div>
    </div></>):(<SkeletonWatch/>)}
    </>
  )
}

export default Watch;

const NotFount = () => {
  return (
    <div className="flex items-center justify-center h-full w-full absolute bg-black/80">
      <p className='text-white text-4xl'>No video found!</p>
    </div>
  )
}
