import React from "react";
import { getThumbnailPortrait } from "@/utils/getData";
import { capFirstLetter } from "@/utils/capFirstLetter";
import { stableKeys } from "@/utils/stableKeys";
type Props = {
  data: any;
};
const ItemDetails = ({ data }: Props) => {
  const thumbURl = getThumbnailPortrait(data);
  return (
    <div className="bg-[#0F0F0F] text-white p-4 border-[3px] border-[#262626] rounded-md mb-6 flex flex-wrap items-center">
      {(thumbURl) ? (
        <div className="mr-2 w-[80px]">
          <img
            src={thumbURl}
            alt={data?.title}
            className="w-[72px] rounded-md aspect-[6/9] object-cover"
          />
        </div>
      ) : null}
      <div className="flex-grow flex flex-wrap w-[170px]">
        <div className="w-full flex flex-wrap">
          <div className="lg:mr-6 mb-2 lg:mb-0 w-full lg:w-auto">
            <p className="font-medium text-md lg:text-xl 2xl:text-2xl leading-5">{data?.title || ""}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mr-6">
            {data?.contentRating ? (
              <p className="leading-normal py-1 px-2 text-xs font-medium text-white/80 rounded-md border border-white/80">
                {data?.contentRating}
              </p>
            ) : null}
            {data?.duration ? (
              <p className="text-sm font-medium text-white/80">
                {data?.duration}
              </p>
            ) : null}
          </div>
          {Array.isArray(data?.genre) && data?.genre?.length > 0 ? (
            <div className="popUpGenre flex flex-wrap items-center">
              {data?.genre?.map((itemTxt: any, index: number) => (
                <span
                  key={stableKeys[index]}
                  className="inline-flex items-center text-sm font-medium mr-2 last:mr-0 text-white/80"
                >
                  {capFirstLetter(itemTxt)}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="w-full mt-2">
          {data?.description && (
            <p className="font-normal	text-sm mb-2 text-white/80 line-clamp-2">
              {data?.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemDetails;