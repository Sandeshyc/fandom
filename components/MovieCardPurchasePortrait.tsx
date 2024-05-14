import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { capFirstLetter } from "@/utils/capFirstLetter";
import { MovieInterface } from "@/types";
import EnititlementEndDate from "@/components/Expair";
import { Check, ShoppingBagOutlined } from "@mui/icons-material";
import { getThumbnailLandscape, getThumbnailPortrait } from "@/utils/getData";

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardPurchasePortrait: React.FC<MovieCardProps> = ({
  data,
  portrait,
}) => {
  const router = useRouter();
  const thumb = getThumbnailPortrait(data);
  const redirectToWatch = useCallback(() => {
    if(data?.contentType === 'TVShow'){
      router.push(`/tvshow/${data?._id}`);
    }else if(data?.contentType === 'TvChannel'){
      router.push(`/channel/${data?._id}`);
    }else{
      router.push(`/details/${data?._id}`);      
    }
  }, [router, data._id]);
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 sm:px-[7px] mb-[14px]">
      <div className="group bg-gray-800 relative flex flex-wrap text-white rounded-md justify-between w-full">
        <div className="w-[110px] sm:w-[130px] 2xl:w-[160px] bg-gray-600 rounded-md aspect-[6/9] relative">
          {thumb ? (
            <img
              onClick={redirectToWatch}
              src={thumb}
              alt={data?.title || " "}
              draggable={false}
              className="
          cursor-pointer
          object-contain
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
              onClick={redirectToWatch}
              className="w-full h-full text-white text-center flex justify-center items-center cursor-pointer p-1"
            >
              {data?.title}
            </div>
          )}
        </div>
        <div className="w-[150px] px-2 py-1 grow">
          {data?.title ? (
            <p
              onClick={redirectToWatch}
              className="text-white text-base lg:text-xl mb-1 md:mb-2 cursor-pointer"
            >
              {data.title}
            </p>
          ) : null}

          {data?.planDescription ? (
            <p className="text-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
              <Check
                className="mr-1"
                sx={{
                  color: "white",
                  fontSize: "20px",
                }}
              />
              {data?.planDescription}
            </p>
          ) : null}

          {data?.sourcePlatform ? (
            <p className="text-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
              <ShoppingBagOutlined
                className="mr-1"
                sx={{
                  color: "white",
                  fontSize: "20px",
                }}
              />
              {capFirstLetter(data?.sourcePlatform)}
            </p>
          ) : null}

          {data?.endTime ? (
            <>
              <EnititlementEndDate endDate={data?.endTime} short={true} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieCardPurchasePortrait;
