import React, {useEffect} from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [mouseActive, setMouseActive] = React.useState(true);
  
  const { data, error } = useMovie(movieId as string);
  const videoURL = data?.trailerUrl ? data?.trailerUrl : data?.videoUrls[0]?.url;

  // console.log('Watch movie data: ', data);
  const captionURL = data?.captionsUrl.length > 0 ? data?.captionsUrl : null;

  // on mouse move, show controls
  // on mouse leave, hide controls
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
        // router.push('/');
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);

  
  return (
    <div className="h-screen w-screen bg-black" >
      {mouseActive && (<nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700  opacity-100 videoPageNav">
        <ArrowLeftIcon onClick={() => router.back() } className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>)}
      <div className="jk_jwp_full" onMouseMove={onMouseMove} style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${data?.thumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        }}>
        <VideoPlayer image={data?.thumbnailUrl} video={videoURL} caption={captionURL}/>
      </div>
    </div>
  )
}

export default Watch;
