import React, {use, useEffect, useRef, useState} from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import useMovie from '@/hooks/useMovie';
import useProfile from '@/hooks/useProfile';
import SkeletonWatch from '@/components/Skeleton/SkeletonWatch';
import ReactMainVideoPlayer from '@/components/ReactMainPlayer';
import { getThumbnailLandscape } from '@/utils/getData';
import PinVerify from '@/modules/Identities/PinVerify';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
import LinkRoute from '@/modules/Identities/LinkRoute';

const Watch = () => {
  const router = useRouter();
  const [userId, setUserId] = React.useState('');
  const {movieId, trailer } = router.query;
  const [mouseActive, setMouseActive] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [isTrailer, setIsTrailer] = React.useState(true);
  const [trailerUrl, setTrailerUrl] = React.useState('');
  const [videoReady, setVideoReady] = React.useState(false);
  const [backBtnActive, setBackBtnActive] = React.useState(false);
  const [movieContentRating, setMovieContentRating] = React.useState('');

  const [pcEnable, setPcEnable] = useState(false); 
  const [pcPinEnable, setPcPinEnable] = useState(false);
  const [pcPin, setPcPin] = useState('');
  const [pcRoles, setPcRoles] = useState([]);
  const [pinMode, setPinMode] = useState(false);
  
  const { data, error, isLoading } = useMovie(movieId as string, userId as string); 
  console.log('data: ', data);

  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading
  } = useProfile(userId);
  // console.log('profileData: ', profileData);
  const [videoURL, setVideoURL] = React.useState(
    {
      'HLS': data?.hlsVideo,
      'DASH': data?.dashVideo,
    }
  );

  const thumb = getThumbnailLandscape(data);
  // console.log('data?.videoUrls: ', data?.videoUrls);

  const {t} = router.query;
  const isRestart = t === 'restart' ? true : false;
  useEffect(() => {
    if(data?._id){
      setVideoReady(true);
    }

    // console.log('data: ', data?.allowed);
    if(data?.allowed){
      setIsTrailer(false);
      const VideoURLs = {
        'HLS': data?.hlsVideo,
        'DASH': data?.dashVideo,
      }
      if(Array.isArray(data?.videoUrls) && data?.videoUrls.length > 0){
        data?.videoUrls.map((item:any) => {
          if(!VideoURLs.HLS && item?.label?.toString().toUpperCase() === 'HLS'){
            VideoURLs.HLS = item?.url;
          }
          if(!VideoURLs.DASH && item?.label?.toString().toUpperCase() === 'DASH'){
            VideoURLs.DASH = item?.url;
          }
        });
      }
      setVideoURL(VideoURLs);
      // console.log('VideoURLs: ', VideoURLs);
    }else{
      setTrailerUrl(data?.trailerUrl ? data?.trailerUrl : '');
    }

    if(trailer === 'true'){
      setIsTrailer(true);
      let trailerURL = data?.trailerVideo ? data?.trailerVideo : data?.trailerUrl;
      if(!trailerURL && Array.isArray(data?.videoUrls) && data?.videoUrls.length > 0){
        data?.videoUrls?.map((item:any) => {
          if(item?.label === 'Trailer'){
            trailerURL = item?.url;
          }
        });
      }
      setTrailerUrl(trailerURL ? trailerURL : '');
    }
  }, [data]);

  // const captionURL = data?.closedCaptionUrl  ? data?.closedCaptionUrl : null;
  const captionURL = Array.isArray(data?.closedCaptionUrl) && data.closedCaptionUrl.length > 0 ? data?.closedCaptionUrl : null;

  let timeout: NodeJS.Timeout;
  const onMouseMove = () => {
    clearTimeout(timeout);
    
      setMouseActive(true);
      timeout = setTimeout(() => {
        setMouseActive(false);
      }, 3000);
  }

  useEffect(() => {
    // console.log('History: ', window.history.state);
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
        // router.push('/');
      }else{
        // router.push('/auth');
      }
    }else{
      // router.push('/auth');
    }
    setIsReady(true);
    setBackBtnActive(false);
    // console.log('history: ', window.history.state);
  }, []);

  const handleBack = () => {
    if(!backBtnActive){
      // console.log('backBtnActive: ', backBtnActive);
      router.back();
      setBackBtnActive(true);
    }
  }

  useEffect(() => {
    setBackBtnActive(false);
  }, [router.query]);

  useEffect(() => {
    setPcEnable(profileData?.parentalControl?.isEnable);
    setPcPinEnable(profileData?.parentalControl?.pinRequire);
    setPcPin(profileData?.parentalControl?.pin);
    setPcRoles(profileData?.parentalControl?.role); 
    setMovieContentRating(data?.contentRating);
  }, [profileData, data]);

  useEffect(() => {
    if(!isTrailer && pcEnable && pcPinEnable && pcPin && Array.isArray(pcRoles) && pcRoles.length > 0 && movieContentRating && pcRoles.includes(movieContentRating as never)){
      setPinMode(true);
    }else{
      setPinMode(false);
    }
  }, [pcEnable, pcPinEnable, pcPin, pcRoles, movieContentRating]);
  return (
    <>
    {(pinMode)?(
      <div className="h-screen w-screen bg-black flex items-center relative" 
      style={{
        backgroundImage: `url(${thumb})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",        
      }}
      >
        <nav className={`fixed w-full p-4 z-50 top-1 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700 ${(backBtnActive)?'opacity-50':'opacity-100'} videoPageNav`}>
          <ArrowLeftIcon 
            onClick={handleBack} 
            className={`w-8 md:w-12 text-white ${(backBtnActive)?'cursor-wait':'cursor-pointer'} hover:opacity-80 transition border-2 border-blue-500 rounded-full p-1`} 
            />
          <p className="text-white text-1xl md:text-3xl font-bold">
            <span className="font-light">Watching:</span> {data?.title}
          </p>
        </nav>
        <div className='absolute top-0 left-0 w-full h-full bg-black/80 z-10 py-[150px] px-8 flex justify-center items-center'>
          <div className='py-2 px-4 bg-black/90 w-[280px] sm:w-[420px] max-w-full flex justify-center flex-col'>
            <Title tag='h3' size='xl' className='text-white text-center'>Parental Control</Title>
            <Text size='base' className='text-white text-center'>Enter your PIN</Text>
            <PinVerify 
              myPin={pcPin}
              isReset={false}
              setPinMode={setPinMode}
            />
            <div className='mt-4 justify-center flex'>
              <LinkRoute 
                type='unset'
                href='/myprofile'
                className='text-[#fff]/90 text-[14px] py-1'>Forgot PIN?</LinkRoute>
            </div>
          </div>
        </div>
      </div>
    )
    :
    <>
      {(isReady && !isLoading)?(<><div className="h-screen w-screen bg-black flex items-center" onMouseMove={onMouseMove}>
        {mouseActive && (<nav className={`fixed w-full p-4 z-50 top-1 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700 ${(backBtnActive)?'opacity-50':'opacity-100'} videoPageNav`}>
          <ArrowLeftIcon 
            onClick={handleBack} 
            className={`w-8 md:w-12 text-white ${(backBtnActive)?'cursor-wait':'cursor-pointer'} hover:opacity-80 transition border-2 border-blue-500 rounded-full p-1`} 
            />
          <p className="text-white text-1xl md:text-3xl font-bold">
            <span className="font-light">Watching:</span> {data?.title}
          </p>
        </nav>)}
        <div className="jk_jwp_full"  style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${thumb})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          }}>
          {(videoReady)?
            ((isTrailer)?
              ((trailerUrl)?
                (<ReactMainVideoPlayer 
                videoURL={trailerUrl}
                poster={thumb}
                control={true}/>)   
                :
                (<NotFount/>))
              :
              ((videoURL)?
                (<VideoPlayer 
                image={thumb}
                video={videoURL} 
                caption={captionURL}
                control={true}
                autoplay={true}
                isComplited={() => {}}
                data={data}
                isRestart={isRestart}
                pictureInPicture={true}/>)
              :
              (<NotFount/>)))
            :null}
        </div>
      </div></>):(<SkeletonWatch/>)}
      </>
    }
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