import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { MovieInterface } from "@/types";
import RemoveListBtn from "@/components/RemoveListButton";
import { VolunteerActivismOutlined } from "@mui/icons-material";
import CardHeader from "@/modules/elements/CardHeader";
import { getThumbnailLandscape, getThumbnailPortrait } from "@/utils/getData";
import RentPlayButtonLink from "@/modules/elements/Purchase/RentPlayButtonLink";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import CardFooterMobile from "@/modules/elements/CardFooterMobile";

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardList: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const [isRemove, setIsRemove] = React.useState(false);

  
  const redirectToDetails = useCallback(() => {
    if(data?.contentType === 'TVShow'){
      router.push(`/tvshow/${data?._id}`);
    }else if(data?.contentType === 'TvChannel'){
      router.push(`/channel/${data?._id}`);
    }else{
      router.push(`/details/${data?._id}`);      
    }
  }, [router, data._id]);
  const isRemoveHandler = (isRemove: boolean) => {
    setIsRemove(isRemove);
  };
  const thumb = getThumbnailPortrait(data);
  return !isRemove ? (
    <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 sm:px-[7px] xl:px-[14px] mb-[14px] xl:mb-[28px]">
      <div className="group bg-gray-800 relative flex flex-wrap text-white rounded-md justify-between w-full">
        <div className="w-[110px] sm:w-[130px] 2xl:w-[160px] bg-gray-600 rounded-md aspect-[6/9] relative">
          {thumb ? (
            <img
              onClick={redirectToDetails}
              src={thumb}
              alt={data?.title || " "}
              draggable={false}
              className="
          cursor-pointer
          object-cover
          rounded-md
          w-full
          h-full
          flex
          justify-center
          items-center
          text-white/40"
            />
          ) : (
            <div
              onClick={redirectToDetails}
              className="w-full h-full text-white text-center flex justify-center items-center cursor-pointer p-1">
              {data?.title}
            </div>
          )}
          <CardHeader header={data?.header} />
          <div className="absolute z-10 bottom-0 left-0 w-full">
            <CardFooterMobile footer={data?.footer} />
          </div>
        </div>
        <div className="w-[150px] pr-2 pl-4 py-1 grow">
          <p
            onClick={redirectToDetails}
            className="text-white text-base xl:text-lg mb-2 cursor-pointer line-clamp-2 leading-7">
            {data.title}
          </p>
          {data?.contentPrivider ? (
            <p className="text-xs sm:text-sm mb-0 md:mb-1 flex items-center">
              <VolunteerActivismOutlined className="w-[16px] h-[16px] text-white mr-1 pl-[3px]" />
              {data?.contentPrivider}
            </p>
          ) : null}
          <RemoveListBtn
            movieId={data?._id}
            isRemoveHandler={isRemoveHandler}
          />
          {data?._id && (
            <div className="mb-2 mt-4">
              <RentPlayButtonLink
                itemId={data?._id}
                data={data}
                allowedData={data?.allowed}
                size="sm"
              />
            </div>
          )}
          {/* <RentPlayNotice data={data?.allowed} /> */}
        </div>
      </div>
    </div>
  ) : null;
};

export default MovieCardList;
