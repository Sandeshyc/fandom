import React, {useEffect, useState} from "react";
import ReactVideoPlayer from "@/components/ReactPlayer";
import { stableKeys } from "@/utils/stableKeys";
import { capFirstLetter } from "@/utils/capFirstLetter";
import FavoriteButton from '@/components/FavoriteButton';
import { ShareIcon } from '@heroicons/react/24/solid';
import SocialShare from '@/modules/elements/SocialShare';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import Title from '@/modules/Identities/Title';
import { yearFromDate } from '@/utils/yearFromDate';
import LinkRoute from "@/modules/Identities/LinkRoute";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import TrailerPlayButton from "@/modules/elements/Purchase/TrailerPlayButton";
import { getThumbnailLandscape, getThumbnailPortrait } from "@/utils/getData";
import {
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
type Props = {
  data: any;
  isComplited: any;
};
const MovieListHeroBannerMobile = ({ data, isComplited }: Props) => {
  const [open, setOpen] = React.useState(false);
  const {isLoginUser, isLoadingUserCheck} = useCheckAuthentication();
  const postar = getThumbnailPortrait(data);
  const bannerThumb = getThumbnailLandscape(data);
  let releaseYear = data?.releaseDate;
  const detailUrl = `/details/${data?._id}`;
  let trailerUrl = '';
  if(data?.trailerUrl){
    trailerUrl = data?.trailerUrl;    
  }
  // get year from date
  if(releaseYear){
    releaseYear = yearFromDate(releaseYear);
  }

  const handleToggle = () => {
    setOpen(!open);
  }
  return (
    <>
    <div className={`relative billboardSec`}>
      <div
        className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[100vh]`}
      >
        <div className="brightness-[60%] h-full">
          <ReactVideoPlayer
            videoURL={trailerUrl}
            poster={bannerThumb}
          />
        </div>
        <div className="preview"></div>
      </div>
      <div className={`absolute bottom-0 transition w-full`}>
        <div className='flex flex-wrap items-end lg:pb-2 container mx-auto px-4'>
          <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
            <div className="flex flex-wrap items-end w-full">
              <div className='w-[100px] sm:w-[120px] mr-3 bg-zinc-700 aspect-[6/9] rounded-md overflow-hidden'>
                {(postar)?
                  <img src={postar} alt={data?.title} className='w-full text-zinc-500 object-cover h-full flex justify-center items-center' />
                :
                  <div className='w-full h-full bg-gray-800 text-zinc-500 flex justify-center items-center text-center'>{data?.title}</div>
                }
              </div>
              <div className='grow w-[100px] '>
                <div className=' h-full mb-2 lg:mb-3'>
                  <Title tag='h1' size='xl'>{data?.title}</Title>
                </div>
                <p className='mb-1 flex flex-wrap items-center my-2 text-white/70 text-xs pr-2'>
                  {(data?.quality)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.quality}</span>):null}
                  {(data?.contentRating)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.contentRating}</span>):null}
                  {(data?.duration)?(<span className='mb-1'>{data?.duration}</span>):null}
                </p>
                {(Array.isArray(data?.genre) && data?.genre?.length > 0)&&
                  <div className='popUpGenre flex flex-wrap items-center text-contentColor/70'>
                    {data?.genre?.map((itemTxt:string, index:number) => 
                    <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0">{capFirstLetter(itemTxt)}
                    </span>)}
                    {(releaseYear)&&<span className="inline-flex items-center text-sm mr-2 last:mr-0">{releaseYear}
                    </span>}
                  </div>}
              </div>
            </div>                
          </div>
        </div>
      </div>      
    </div>
    <div className="container mx-auto px-4">
    <RentPlayNotice data={data?.allowed} />
    <div className="flex flex-row items-center lg:mb-5 flex-wrap justify-between mx-[-7px]">
      <div className="w-1/2 px-[7px]">
        <TrailerPlayButton data={data?.allowed} itemId={data?._id} size="full"/>
      </div>
      <div className="w-1/2 px-[7px]">
        <LinkRoute href={`${detailUrl}`} type="outline" size="full">
            Know More
            <ArrowForwardIosOutlined className="w-5 h-5 ml-2 text-contentColor/80" />
        </LinkRoute>
      </div>
    </div> 
  </div>
  <div className="mb-[-32px]">
    <ShareBtnGroup data={data} />
  </div>
  </>
  );
};
export default MovieListHeroBannerMobile;
