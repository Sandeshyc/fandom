import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Waypoint } from "react-waypoint";
import ReactVideoPlayer from "@/components/ReactPlayer";
import { stableKeys } from "@/utils/stableKeys";
import { capFirstLetter } from "@/utils/capFirstLetter";
import PlayButton from "@/components/PlayButton";
import WatchTrailerBtn from "@/components/WatchTrailerBtn";
import FavoriteButton from '@/components/FavoriteButton';
import { ShareIcon } from '@heroicons/react/24/solid';
import SocialShare from '@/modules/elements/SocialShare';
import checkAuthentication from '@/utils/checkAuth';
import Title from '@/modules/Identities/Title';
import { yearFromDate } from '@/utils/yearFromDate';
import { getThumbnailLandscape, getThumbnailPortrait } from "@/utils/getData";
type Props = {
  data: any;
  isComplited: any;
};
const MovieListHeroBanner = ({ data, isComplited }: Props) => {
  const router = useRouter();
  // console.log('data Package Movie', data);
  const [open, setOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inView, setInView] = React.useState(false);
  const postar = getThumbnailPortrait(data);
  const bannerThumb = getThumbnailLandscape(data);
  let publishYear = data?.publishSchedule;
  let trailerUrl = '';
  if(data?.trailerUrl){
    trailerUrl = data?.trailerUrl;    
  }
  // get year from date
  if(publishYear){
    publishYear = yearFromDate(publishYear);
  }

  const handleToggle = () => {
    setOpen(!open);
  }

  const handleWaypointEnter = () => {
      console.log('enter mobile list');
      setInView(true);
  }

  const handleWaypointLeave = () => {
      console.log('leave mobile list');
      setInView(false);
  }

  useEffect(() => {
    const _checkAuthentication = async () => {
      const isAuthenticated = await checkAuthentication();
      setIsAuthenticated(isAuthenticated);
    }
    _checkAuthentication();
  }, []);
  return (
    <div className={`relative billboardSec`}>
      <div
        className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[100vh] bg-zinc-800`}
      >
        <Waypoint 
        scrollableAncestor={window}
        onEnter={handleWaypointEnter} 
        onLeave={handleWaypointLeave}
        topOffset= {300}
        bottomOffset={300}
        >
          <div className="brightness-[60%] h-full">
            <ReactVideoPlayer
              videoURL={trailerUrl}
              poster={bannerThumb}
              play={inView}
            />
          </div>
        </Waypoint>
        <div className="preview"></div>
      </div>
      <div className={`absolute bottom-[160px] sm:bottom-[220px] xl:bottom-[15vw] pl-4 md:pl-16 transition w-full`}>
        <div className='flex flex-wrap items-end lg:pb-2'>
          <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
            <div className="flex flex-wrap items-end w-full">
              <div className='w-[100px] sm:w-[120px] mr-3 bg-zinc-700 aspect-[6/9] rounded-md overflow-hidden'>
                {(postar)?
                  <img src={postar} alt={data?.title} className='w-full text-zinc-500 object-cover h-full flex justify-center items-center' />
                :
                  <div className='w-full h-full bg-gray-800 text-zinc-500 flex justify-center items-center'>{data?.title}</div>
                }
              </div>
              <div className='grow w-[100px] '>
                <div className=' h-full mb-2 lg:mb-3'>
                  <Title tag='h1' size='4xl'>{data?.title}</Title>
                </div>
                <p className='mb-1 flex items-center flex-wrap my-2 text-white/70 text-xs'>
                  {(data?.quality)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.quality}</span>):null}
                  {(data?.contentRating)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.contentRating}</span>):null}
                  {(data?.duration)?(<span className='mb-1'>{data?.duration}</span>):null}
                </p>
                {(Array.isArray(data?.genre) && data?.genre?.length > 0)&&
                  <div className='popUpGenre flex items-center text-contentColor/70'>
                    {data?.genre?.map((itemTxt:string, index:number) => 
                    <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0">{capFirstLetter(itemTxt)}
                    </span>)}
                    {(publishYear)&&<span className="inline-flex items-center text-sm mr-2 last:mr-0">{publishYear}
                    </span>}
                  </div>}
              </div>
            </div>                
          </div>
        </div>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {data?.allowed === true ? (
            <>
              <PlayButton movieId={data?._id} />
            </>
          ) : (<WatchTrailerBtn movieId={data?._id}/>)}
          {(isAuthenticated)&&<FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>}
          {(data?._id)?<>
              <button 
                  onClick={handleToggle}
                  className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition">
                  <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
              </button>
              <SocialShare 
                  open={open}
                  setOpen={setOpen}
                  url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${data?._id}`}
                  title={data?.title}
              />
          </>:null}
        </div>
      </div>
    </div>
  );
};
export default MovieListHeroBanner;
