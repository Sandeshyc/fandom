import React, { useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { capFirstLetter } from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import { PlayIcon } from '@heroicons/react/24/solid';
import Buttons from '@/components/identites/Buttons';
import FavoriteButton from '@/components/FavoriteButton';
import ViewDetailsBtn from '@/components/ViewDetailsBtn';
import { stableKeys } from '@/utils/stableKeys';
import ReactVideoPlayer from '@/components/ReactPlayer';
import { MovieInterface } from '@/types';
import AudioMute from '@/modules/elements/AudioMute';


interface MovieCardProps {
  data?: MovieInterface;
  autoplay?: boolean;
  parentRef?: any;
  isMouseActive?: boolean;
  popScale: number;
}
const MovieCardPopOver: React.FC<MovieCardProps> = ({ data, autoplay, parentRef, isMouseActive, popScale }) => {
  const router = useRouter();
  const [isMute, setIsMute] = React.useState(true);
  // console.log('MovieCardPopOver: ', data);
  const [popOverLeft, setPopOverLeft] = React.useState('');
  const [popOverRight, setPopOverRight] = React.useState('');
  const redirectToWatch = useCallback(() => router.push(`/details/${data?._id}`), [router, data?._id]);
  // console.log('Width:', parentRef?.getBoundingClientRect()?.width, 'Left:', parentRef?.getBoundingClientRect()?.left, 'Top:', parentRef?.getBoundingClientRect()?.top, 'left offset:', parentRef?.offsetLeft, 'Top offset:', parentRef?.offsetTop);
  // console.log('MovieCardPopOver: ', parentRef);
  useEffect(() => {
    if(!isMouseActive){
      setIsMute(true);
    }
    // console.log('log ', isMouseActive?.toString());
    let width = parentRef?.getBoundingClientRect()?.width;
    let left = parentRef?.getBoundingClientRect()?.left;
    let right = window.innerWidth - (left + width);
    let popOverHalfWidth = (width * popScale) / 2;

    // console.log('Width:', width, 'Left:', left, 'Right:', right, 'popOverHalfWidth:', popOverHalfWidth);
    if(left <= popOverHalfWidth){
      if(left < 0){
        setPopOverLeft(-left+'px');
        setPopOverRight('auto');
      }else{
        setPopOverLeft('0px');
        setPopOverRight('auto');
      }
      
    }else{
      if(right < 0){
        setPopOverLeft('auto');
        setPopOverRight(-right+'px');
      }else if(right <= popOverHalfWidth){
        setPopOverLeft('auto');
        setPopOverRight('0px');
      }else{
        setPopOverLeft(-(Math.round(popOverHalfWidth))+'px');
        // setPopOverLeft('10px');
        setPopOverRight('auto');
      }
    }
  }, [isMouseActive]);

  

  const toggleMute = () => {
    setIsMute(!isMute);
  }

  return (
    <div 
      className={`asPopOver absolute transition duration-200 delay-300 ease-in-out z-50 invisible sm:visible w-full 
      ${(isMouseActive)?'scale-100 opacity-100':'scale-0 opacity-0'}`}
        style={{
          top: '50%',
          left: popOverLeft,
          right: popOverRight,
          transform: 'translatey(-50%)',
        }}>            
        <div className='relative'>
          {autoplay && (<AudioMute 
          isMute={isMute}
          toggleMute={toggleMute}
          />)} 
          <div className="bg-zinc-800 shadow-md rounded-t-lg jk_player cursor-pointer"
          style={{backgroundImage: `url(${data?.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
          onClick={redirectToWatch}>
            {autoplay && (<ReactVideoPlayer 
            videoURL={data?.videoUrl} 
            control={false} 
            poster={data?.thumbnailUrl}
            isMute={isMute}
            play={autoplay}
            />)}                   
          </div> 
        </div>     
        <div className="z-10
          bg-zinc-800
          p-2
          lg:p-4
          transition
          shadow-md
          rounded-b-lg">
          <div className='mb'>
            <p className="font-medium text-3xl mb-1">{data?.title || "upcoming..."}</p>
            {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm font-medium mr-2 last:mr-0 text-white/80">
                {capFirstLetter(itemTxt)}
              </span>)}</div>:null}
            {(data?.description) && <p className="font-normal	text-sm mt-2 mb-2 text-white/80 line-clamp-2">{data?.description}</p>}
          </div>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='mb-1'>              
              <div className='flex flex-row items-center gap-2'>
                {(data?.contentRating)?(<p className="leading-normal py-1 px-2 text-xs font-medium text-white/80 rounded-md border border-white/80">{data?.contentRating}</p>):null}
                {(data?.duration)?(<p className="text-sm font-medium text-white/80">{data?.duration}</p>):null}
              </div>           
            </div>
            <div className='flex flex-row items-center gap-2 mb-1'>
              <FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>
              
              
              {data?.allowed? (
                <Buttons onClick={redirectToWatch} type='white'>Play Now</Buttons>
              ) : (
                <Buttons onClick={redirectToWatch}>Rent</Buttons>
              )}

            </div>
          </div>
        </div>
      </div>
  )
}

export default MovieCardPopOver;
