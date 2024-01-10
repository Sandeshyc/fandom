import React from "react";
import { useRouter } from "next/router";
import ReactVideoPlayer from "@/components/ReactPlayer";
import { stableKeys } from "@/utils/stableKeys";
import { capFirstLetter } from "@/utils/capFirstLetter";
import PublishDate from "@/modules/Identities/PublishDate";
import PlayButton from "@/components/PlayButton";
import WatchTrailerBtn from "@/components/WatchTrailerBtn";
import ViewDetailsButton from '@/modules/Identities/ViewDetailsButton';
import Buttons from '@/components/identites/Buttons';
import FavoriteButton from '@/components/FavoriteButton';
import { ShareIcon } from '@heroicons/react/24/solid';

type Props = {
  data: any;
  isComplited: any;
};
const MovieListHeroBanner = ({ data, isComplited }: Props) => {
  const router = useRouter();
  return (
    <div className={`relative billboardSec`}>
      <div
        className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[100vh]`}
      >
        <div className="brightness-[60%] h-full">
          <ReactVideoPlayer
            videoURL={data?.videoUrl}
            poster={data?.thumbnailUrl}
          />
        </div>
        <div className="preview"></div>
      </div>
      <div
        className={`absolute bottom-[160px] sm:bottom-[220px] xl:bottom-[15vw] pl-4 md:pl-16 transition w-full`}
      >
        <p className="text-white text-2xl md:text-5xl h-full w-[85%] lg:w-[50%] lg:text-6xl drop-shadow-xl mb-1">
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
                className="inline-flex items-center text-sm mr-2 last:mr-0 text-white/80">
                {capFirstLetter(itemTxt)}
              </span>
            ))}
          </div>
        ) : null}
        {data?.contentPrivider ? (
          <p className="mb-1">
            <span className="text-gray-300">Content Provider:</span>{" "}
            {data?.contentPrivider}
          </p>
        ) : null}
        <p className="text-white text-[12px] md:text-lg mt-2 mb-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl line-clamp-2">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {data?.allowed === true ? (
            <>
              <PlayButton movieId={data?._id} />
            </>
          ) : (<WatchTrailerBtn movieId={data?._id}/>)}
          <FavoriteButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>
          <div className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition">
              <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieListHeroBanner;
