import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { MovieInterface } from "@/types";
import RemoveListBtn from "@/components/RemoveListButton";
import { VolunteerActivismOutlined } from "@mui/icons-material";
import CardHeader from "@/modules/elements/CardHeader";
import { getThumbnailLandscape, getThumbnailPortrait } from "@/utils/getData";
import RentPlayButtonLink from "@/modules/elements/Purchase/RentPlayButtonLink";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardList: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const [isRemove, setIsRemove] = React.useState(false);

  const redirectToDetails = useCallback(
    () => router.push(`/details/${data._id}`),
    [router, data._id]
  );
  const isRemoveHandler = (isRemove: boolean) => {
    setIsRemove(isRemove);
  };
  const thumb = getThumbnailPortrait(data);
  return !isRemove ? (
    <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 sm:px-[7px] mb-[14px]">
      <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white rounded-md sm:mr-4 justify-between h-full w-full">
        <div className="w-[100px] sm:w-[120px] 2xl:w-[160px] relative bg-gray-600 rounded-md aspect-[6/9]">
          {thumb ? (
            <img
              onClick={redirectToDetails}
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
              onClick={redirectToDetails}
              className="w-full h-full text-white text-center flex justify-center items-center cursor-pointer p-1"
            >
              {data?.title}
            </div>
          )}
          <CardHeader header={data?.header} />
        </div>
        <div className="w-[150px] px-2 py-1 grow">
          <p
            onClick={redirectToDetails}
            className="text-white text-base xl:text-xl 2xl:text-2xl mb-1 cursor-pointer"
          >
            {data.title}
          </p>
          {data?.contentPrivider ? (
            <p className="text-xs sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center">
              <VolunteerActivismOutlined className="w-[16px] h-[16px] text-white mr-1 pl-[3px]" />
              {data?.contentPrivider}
            </p>
          ) : null}
          <RemoveListBtn
            movieId={data?._id}
            isRemoveHandler={isRemoveHandler}
          />
          {data?._id && (
            <div className="my-2">
              <RentPlayButtonLink
                itemId={data?._id}
                data={data?.allowed}
                size="md"
              />
            </div>
          )}
          <RentPlayNotice data={data?.allowed} />
        </div>
      </div>
    </div>
  ) : null;
};

export default MovieCardList;
