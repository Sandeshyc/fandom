import React from "react";
import { useRouter } from "next/router";
import ReactVideoPlayer from "@/components/ReactPlayer";
import { stableKeys } from "@/utils/stableKeys";
import { capFirstLetter } from "@/utils/capFirstLetter";
import PublishDate from "@/modules/Identities/PublishDate";
import PlayButton from "@/components/PlayButton";
import WatchTrailerBtn from "@/components/WatchTrailerBtn";
import ViewDetailsButton from '@/modules/Identities/ViewDetailsButton';
import Buttons from '@/modules/Identities/Buttons';
import FavoriteButton from '@/components/FavoriteButton';
import { ShareIcon } from '@heroicons/react/24/solid';
import SocialShare from '@/modules/elements/SocialShare';
type Props = {
  data: any;
  isComplited: any;
};
const MovieListHeroBannerMobile = ({ data, isComplited }: Props) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
  }
  return (
    <div className={`relative billboardSec`}>
      <div
        className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[300px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]`}
      >
        <div className="brightness-[60%] h-full">
          <ReactVideoPlayer
            videoURL={data?.videoUrl}
            poster={data?.thumbnailUrl}
          />
        </div>
        <div className="preview"></div>
      </div>
      <div className={`absolute bottom-0 pl-4 md:pl-16 pt-4 pb-1 bg-gradient-to-t from-black to-transparent w-full`}>
        <p className="text-white text-xl font-semibold md:text-2xl h-full w-[85%] lg:w-[50%] lg:text-6xl drop-shadow-xl">
          {data?.title}
        </p>
        {data?.publishSchedule ? (
          <p className="mb-1 flex items-center">
            <PublishDate publishDate={data?.publishSchedule} short={true} />
          </p>
        ) : null}
        <div className="flex flex-row items-center mb-1">
          {data?.duration ? (
            <p className="pr-1 text-green-400">{data?.duration}</p>
          ) : null}
        </div>
        {Array.isArray(data?.genre) && data?.genre?.length > 0 ? (
          <div className="popUpGenre flex items-center">
            {data?.genre?.map((itemTxt: string, index: number) => (
              <span
                key={stableKeys[index]}
                className="inline-flex items-center text-xs mr-2 last:mr-0 text-white/80">
                {capFirstLetter(itemTxt)}
              </span>
            ))}
          </div>
        ) : null}
        {data?.contentPrivider ? (
          <p className="mb-1 text-xs">{data?.contentPrivider}</p>
        ) : null}
        
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {data?.allowed === true ? (<PlayButton movieId={data?._id}/>) :(<WatchTrailerBtn movieId={data?._id}/>)}
          <FavoriteButton 
              movieId={data?._id}
              classes='mx-2 bg-white/40 hover:bg-white/50'
              style={{
                  borderWidth: 0,
              }}
              isInWatchList={data?.isInWatchList}
              innerClass='text-white'
          />
            {(data?._id)?<>
              <button 
                  onClick={handleToggle}
                  className="cursor-pointer group/item w-8 h-8 flex justify-center items-center transition bg-[#fff]/30 hover:bg-[#fff]/40 rounded-full">
                  <ShareIcon className="text-white group-hover/item:text-neutral-300 w-4" />
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
export default MovieListHeroBannerMobile;
